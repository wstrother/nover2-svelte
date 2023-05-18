<script>
    import { user } from "$lib/stores/auth.js";
    export let submitCallback;
    export let cancelCallback;

    let email = "";
    let password = "";

    const onSubmit = () => {
        user.login(email, password);
        if (submitCallback) submitCallback(email, password);
    }
</script>

<div class="rounded-md p-5 variant-glass flex-initial">
    <form on:submit|preventDefault={onSubmit}>
        <label for="login-email">Email</label>
        <input type="email" id="login-email" bind:value={email} />

        <label for="login-password">Password</label>
        <input type="password" id="login-password" bind:value={password} />

        <div class="py-5 flex gap-2">
            <input type="submit" class="btn btn-sm variant-filled flex-1"/>
            {#if cancelCallback}
                <input type="button" value="Cancel" class="btn btn-sm variant-filled flex-1" on:click={cancelCallback} />
            {/if}
        </div>
    </form>
</div>
