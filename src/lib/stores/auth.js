import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";


export const user = new writable();

supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
    if (session) user.set(session.user)
    else user.set(null);
})
