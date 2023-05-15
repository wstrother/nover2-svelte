<script>
    import { game } from '$lib/stores/game.js';
    import Scoreboard from '$lib/components/room/scoreboard.svelte';
    import Turnboard from '$lib/components/room/turnboard.svelte';
    export let data;

    game.set_room_id(data.room_id);
    game.load_data();
</script>

<h1>ROOM { data.room_id }</h1>

{#if !$game.viewable}
    <p>You cannot view this game</p>
    
{:else}
    {#if $game.goal}
    <h3>First to { $game.goal } wins</h3>
    {/if}

    <h3>Turn number {$game.turn_number}</h3>

    <Scoreboard game={$game} />

    <Turnboard game={$game} />
{/if}