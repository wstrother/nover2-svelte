import { supabase } from "$lib/supabaseClient";
import { writable } from "svelte/store";


export const user = new writable();

supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
    if (session) user.set(session.user)
    else user.set(null);
});

user.login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({email, password});

    // if ( error ) {
    //     console.log('error')
    // } else {
    //     console.log(data)
    // }
}

user.logout = async () => {
    const { error } = await supabase.auth.signOut()

    // if ( error ) {
    //     console.log(error)
    // }
}