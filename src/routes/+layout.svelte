<script>
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    import '../app.postcss';

    import { user } from '$lib/stores/auth.js';
    import Login from '$lib/components/login.svelte';

    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import { Modal, modalStore } from '@skeletonlabs/skeleton';

    const openLogin = () => {
        modalStore.trigger({type: 'component', component: {
            ref: Login, 
            props: { submitCallback: () => modalStore.close(), cancelCallback: () => modalStore.close()}
        }})
    };

</script>

<Modal />

<AppShell>
    <svelte:fragment slot="header">
        <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead">
                <div class="flex gap-4">
                    {#if $user }
                        <h2>Welcome, {$user.name}</h2>
                        <button on:click={user.logout} class="btn btn-sm variant-ghost">Log Out</button>
                    {:else}
                        <button on:click={openLogin} class="btn btn-sm variant-ghost">Log In</button>
                    {/if}
                </div>
            </svelte:fragment>
            
            <span class="h1">
                N Over 2
            </span>
                
            <svelte:fragment slot="trail">
                &nbsp;
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    
    <div class="flex justify-center">
        <div class="flex flex-col variant-glass-surface rounded w-3/5 mt-5 px-5 py-2 min-h-[70vh]">
            <slot />
        </div>
    </div>
</AppShell>


