<script>
    import { supabase } from "$lib/supabaseClient";

    let email = "";
    let password = "";

    const login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({email, password});

        // if ( error ) {
        //     console.log('error')
        // } else {
        //     console.log(data)
        // }
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        // if ( error ) {
        //     console.log(error)
        // }
    }
</script>

<form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} />
    <input type="password" bind:value={password} />
    <input type="submit" />
</form>

<p></p>

<button on:click={logout}>Log Out</button>