<script>
    import { game } from '$lib/stores/game.js';
    import Scoreboard from '$lib/components/room/scoreboard.svelte';
    import Turnboard from '$lib/components/room/turnboard.svelte';
    import RoomHeader from '$lib/components/room/roomHeader.svelte';
    import Choices from '$lib/components/room/choices.svelte';
    import Wrapup from '$lib/components/room/wrapup.svelte';
    export let data;

    let selection;
    let disabled;

    let ready;
    $: ready = $game.host_ready && $game.opponent_ready

    game.set_room_id(data.room_id);
    game.load_data();

    const submit_move = () => {
        game.submit_move(selection);
        disabled = true;
    }

    const ready_next_turn = () => {
        game.set_ready();
        selection = 0;
        disabled = false;
    }
</script>


{#if !$game.viewable}
<p>You cannot view this game</p>

{:else}
    <div class="grid grid-cols-2 gap-4 px-5">
        <RoomHeader goal={$game.goal} name={$game.room_name ?? `Room ${$game.room_id}`} />

        <Scoreboard game={$game} />
    </div>

    
    {#if ready}
    <div class="h2 self-center py-5">Select a number...</div>
    <Choices bind:value={selection} disabled={disabled}/>
    
        <button 
        disabled={selection === 0 || disabled} 
        class="btn variant-filled-primary w-1/2 self-center my-5"
        on:click={submit_move}
        >{disabled ? 'Waiting for opponent...' : 'Submit'}</button>
    {:else}
        <Turnboard game={$game} />

        {#if !$game.winner_id}
            <button 
                class="btn variant-filled-primary w-1/2 self-center my-5"
                on:click={ready_next_turn}
            >{disabled ? 'Ready for next turn?' : 'Waiting for opponent...'}</button>
        {:else}
            <Wrapup game={$game}/>
        {/if}

    {/if}
{/if}