<script>
    import { user } from '$lib/stores/auth.js';
    import Login from '$lib/components/login.svelte';
</script>

<h1>N OVER 2</h1>
{#if $user }
    <h2>Welcome, {$user.email}</h2>
    <button on:click={user.logout}>Log Out</button>
{:else}
    <Login />
{/if}

<slot />


