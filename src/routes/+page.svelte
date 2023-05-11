<script>
    import { supabase } from "../lib/supabaseClient";
    let user = '';
    let email;
    let password;

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

    supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session)
        if (session) user = session.user.email
        else user = ''
    })

</script>
<h1>N OVER 2</h1>
{#if user }
    <p>Welcome, {user}</p>
{/if}


<form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} />
    <input type="password" bind:value={password} />
    <input type="submit" />
</form>

<p></p>

<button on:click={logout}>Log Out</button>