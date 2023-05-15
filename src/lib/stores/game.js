import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";


class Game {
    constructor() {
        this.viewable = null;

        this.room_id = null;
        this.public = null;
        this.goal = null;
        
        this.host_name = null;
        this.host_id = null;
        this.host_score = 0;

        this.opponent_name = null;
        this.opponent_id = null;
        this.opponent_score = 0;
        
        this.winner_id = null;

        this.turn_number = 1;
        this.host_move = null;
        this.opponent_move = null;
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
    console.log(current_game);
}

game.load_turn = async () => {
    const {data, error} = await supabase.rpc('get_current_turn', {rid: current_game.room_id});

        if (error) console.log(error);
        if (data && data[0]) {
            current_game.update_data(data[0]);
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
                current_game.update_data(payload.new);
                game.set(current_game);
            }
        })
        .subscribe();
    
    game.load_data();
}