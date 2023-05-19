import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";

export const lobby = new writable([]);

lobby.load_data = async () => {
    const {data, error} = await supabase.rpc('get_lobby');

    if (data) {
        console.log(data);
        lobby.set(data);
    }
    if (error) console.log(error);
}