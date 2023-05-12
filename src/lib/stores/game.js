import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";

const game_data = { room_id: null };

const reset_data = () => {
    Object.assign(game_data, {
        host: null,
        opponent: null,
        public: null,
        winner: null,
        goal: null,
        viewable: null
    });
}
reset_data();

export const game = new writable(game_data);

game.set_game_id = async (game_id) => {
    game_data.room_id = game_id;
    game.set(game_data);
}

game.load_data = async () => {
    if (game_data.room_id) {
        const { data, error} = await supabase
            .from('rooms')
            .select('*')
            .eq('id', game_data.room_id);
        
        if ( error ) { 
            console.log(error);
            reset_data();
        };
    
        if ( data ) {
            if (data[0]) {
                game_data.viewable = true;
                game_data.host = data[0].host;
                game_data.public = data[0].host;
                game_data.opponent = data[0].opponent;
                game_data.winner = data[0].winner;
                game_data.goal = data[0].goal;
            } else { reset_data(); }
        }
    }

    game.set(game_data);
}

supabase.auth.onAuthStateChange(() => {
    game.load_data();
});