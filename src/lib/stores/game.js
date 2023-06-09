import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";


class Turn {
    constructor() {
        this.host_move = null;
        this.opponent_move = null;
        this.winner_id = "";
    }

    update_data(data) {
        Object.keys(this).filter(k => Object.keys(data).includes(k))
            .forEach(key => {
                this[key] = data[key];
            });
    }
}


class Game {
    constructor() {
        this.viewable = null;

        this.room_id = null;
        this.public = null;
        this.goal = null;
        
        this.host_name = null;
        this.host_id = null;
        this.host_score = 0;
        this.host_ready = null;

        this.opponent_name = null;
        this.opponent_id = null;
        this.opponent_score = 0;
        this.opponent_ready = null;
        
        this.winner_id = null;
        this.winner_name = null;
        this.loser_name = null;
        this.winner_score = null;
        this.loser_score = null;

        this.turn_number = 1;
        this.host_move = null;
        this.opponent_move = null;

        this.current_turn = new Turn();
    }

    update_data(data) {
        Object.keys(this).filter(k => Object.keys(data).includes(k))
            .forEach(key => {
                this[key] = data[key];
            });
    }

    update_current_turn(data) {
        this.current_turn.update_data(data);
    }

    reset_data() {
        this.update_data(new Game());
    }
}

const current_game = new Game();

export const game = new writable(current_game);

game.load_data = async () => {
    if (current_game.room_id) {
        const {data, error} = await supabase.rpc('get_game_data', {rid: current_game.room_id});
        
        if (error) console.log(error);
        if (data && data[0]) {
            current_game.viewable = true;
            current_game.update_data(data[0]);
            game.load_turn();

        } else {
            current_game.reset_data();
        }
    }
    game.set(current_game);
    // console.log(current_game);
}

game.load_turn = async () => {
    const {data, error} = await supabase.rpc('get_current_turn', {rid: current_game.room_id});

    if (error) console.log(error);
    if (data && data[0]) {
        current_game.update_current_turn(data[0]);
    }

    // console.log('loaded turn', data[0])
    // console.log(current_game)
    game.set(current_game);
}

supabase.auth.onAuthStateChange(() => {
    game.load_data();
});

game.set_room_id = (room_id) => {
    current_game.room_id = room_id;

    supabase
        .channel('any')
        .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'turns', filter: `room_id=eq.${room_id}`}, payload => {
            console.log("payload received");
            if (payload.new) {
                game.load_data();
            }
        })
        .on('postgres_changes', {event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${room_id}`}, payload => {
            console.log("payload received");
            if (payload.new) {
                game.load_data();
            }
        })
        .subscribe();
    
    game.load_data();
}

game.submit_move = async (move) => {
    const {data, error} = await supabase.rpc('add_new_move', {new_move: move, rid: current_game.room_id});

    // if (data) console.log(data);
    // if (error) console.log(error);
}

game.set_ready = async () => {
    const {data, error} = await supabase.rpc('set_ready', {rid: current_game.room_id});

    // if (data) console.log(data);
    // if (error) console.log(error);
}