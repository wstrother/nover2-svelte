<script>
    import { user } from "$lib/stores/auth.js";

    let email = "";
    let password = "";

</script>

<form on:submit|preventDefault={() => user.login(email, password)}>
    <input type="email" bind:value={email} />
    <input type="password" bind:value={password} />
    <input type="submit" />
</form>
