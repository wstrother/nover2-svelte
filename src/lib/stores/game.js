import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";


class Turn {
    constructor(id, host_move, opponent_move) {
        this.id = id;
        this.host_move = host_move;
        this.opponent_move = opponent_move;
    }

    get_from_data(data) {
        return data.map(turn => new Turn(turn.id, turn.host_move, turn.opponent_move));
    }
}


class Game {
    constructor() {
        this.viewable = null;

        this.room_id = null;
        this.public = null;
        this.goal = null;
        
        this.host_name = null;
        this.host = null;

        this.opponent_name = null;
        this.opponent = null;
        
        this.winner = null;
        this.turns = [];
    }

    update_data(data) {
        Object.keys(this).filter(k => Object.keys(data).includes(k))
            .forEach(key => {
                this[key] = data[key];
            });
    }

    reset_data() {
        this.update_data(new Game());
    }

    set_turns(data) {
        this.turns = data.map(turn => new Turn(turn.id, turn.host_move, turn.opponent_move));
    }

    get_current_turn() {
        if (this.turns.length) return turns[this.turns.length-1];

        return {};
    }

    update_turn(data) {
        const turn = this.turns.filter(t => t.id == data.id)[0];
        turn.host_move = data.host_move;
        turn.opponent_move = data.opponent_move;
    }
}

const current_game = new Game();

export const game = new writable(current_game);

game.load_data = async () => {
    if (current_game.room_id) {
        const {data, error} = await supabase
            .from('rooms')
            .select('*')
            .eq('id', current_game.room_id);
        
        if (error) console.log(error);
        if (data && data[0]) {
            console.log(data[0])
            current_game.viewable = true;
            current_game.update_data(data[0]);
            game.load_turns();

        } else {
            current_game.reset_data();
        }
    }
    game.set(current_game);
}

game.load_turns = async () => {
    const {data, error} = await supabase
        .from('turns')
        .select('*')
        .eq('room_id', current_game.room_id)
        .order('created_at');

        if (error) console.log(error);
        if (data) {
            console.log(data)
            current_game.set_turns(data);
        }
    
    game.set(current_game);
}

supabase.auth.onAuthStateChange(() => {
    game.load_data();
});

game.set_room_id = (room_id) => {
    current_game.room_id = room_id;

    supabase
        .channel('any')
        .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${room_id}`}, payload => {
            if (payload.new) {
                current_game.update_data(payload.new);
                game.set(current_game);
            }
        })
        .subscribe();
    
    supabase
        .channel('any')
        .on('postgres_changes', {event: '*', schema: 'public', table: 'turns', filter: `room_id=eq.${room_id}`}, payload => {
            if (payload.new) {
                current_game.update_turn(payload.new);
                game.set(current_game);
            }
        })
        .subscribe();
    
    game.load_data();
}