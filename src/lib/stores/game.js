import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";


class Game {
    constructor() {
        this.room_id = null;
        this.host = null;
        this.opponent = null;
        this.public = null;
        this.winner = null;
        this.goal = null;
        this.viewable = null;
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
}

const current_game = new Game();

export const game = new writable(current_game);

game.load_data = async () => {
    if (current_game.room_id) {
        const { data, error} = await supabase
            .from('rooms')
            .select('*')
            .eq('id', current_game.room_id);
        
        if ( error ) console.log(error);
        if ( data && data[0]) {
            current_game.viewable = true;
            current_game.update_data(data[0]);
        } else {
            current_game.reset_data();
        }
    }
    game.set(current_game);
}

supabase.auth.onAuthStateChange(() => {
    game.load_data();
});

game.set_room_id = (room_id) => {
    current_game.room_id = room_id;

    supabase.channel('any')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${room_id}`}, payload => {
            if (payload.new) {
                console.log(payload.new);
                current_game.update_data(payload.new);
                game.set(current_game);
            }
        })
        .subscribe();
    
    game.load_data();
}