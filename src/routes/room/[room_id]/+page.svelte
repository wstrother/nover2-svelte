<script>
    import { game } from '$lib/stores/game.js';
    import Scoreboard from '$lib/components/room/scoreboard.svelte';
    import Turnboard from '$lib/components/room/turnboard.svelte';
    import RoomHeader from '$lib/components/room/roomHeader.svelte';
    import Choices from '../../../lib/components/room/choices.svelte';
    export let data;

    let selection;
    game.set_room_id(data.room_id);
    game.load_data();

    const submit_move = () => {
        console.log('selected ', selection);
        game.submit_move(selection);
    }
</script>


{#if !$game.viewable}
<p>You cannot view this game</p>

{:else}
    <div class="grid grid-cols-2 gap-4 px-5">
        <RoomHeader goal={$game.goal} name={$game.room_name ?? `Room ${$game.room_id}`} />

        <Scoreboard game={$game} />
    </div>

    <Turnboard game={$game} />

    <Choices bind:value={selection}/>

    <button 
        disabled={selection === 0} 
        class="btn variant-filled-primary w-1/2 self-center my-5"
        on:click={submit_move}
    >Submit</button>
{/if}