<script>
    import { game } from '$lib/stores/game.js';
    import { user } from '$lib/stores/auth.js';
    import Scoreboard from '$lib/components/room/scoreboard.svelte';
    import Turnboard from '$lib/components/room/turnboard.svelte';
    import RoomHeader from '$lib/components/room/roomHeader.svelte';
    import Choices from '../../../lib/components/room/choices.svelte';
    export let data;

    let selection;
    let disabled;

    let ready;
    $: ready = $game.host_ready && $game.opponent_ready

    game.set_room_id(data.room_id);
    game.load_data();

    const submit_move = () => {
        console.log('selected ', selection);
        game.submit_move(selection);
        disabled = true;
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
        >Submit</button>
    {:else}
        <Turnboard game={$game} />
    {/if}

    <p>{ready}</p>
{/if}