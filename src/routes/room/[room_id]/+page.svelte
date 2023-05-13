<script>
    import { game } from '$lib/stores/game.js';
    export let data;

    let turn_number = 0;

    game.set_room_id(data.room_id);
    game.load_data();
    $: turn_number = $game.turns.length;
</script>

<h1>ROOM { data.room_id }</h1>

{#if !$game.viewable}
<p>You cannot view this game</p>
{/if}

{#if $game.goal}
<h3>First to { $game.goal } wins</h3>
{/if}

{#if $game.host}
    <h2>{ $game.host }</h2>
{/if}

{#if $game.opponent}
    <h2>{ $game.opponent }</h2>
{/if}

<h3>Turn #{turn_number}</h3>
{#each $game.turns as turn}
    <p>Host move: {turn.host_move}</p>
    <p>Opponent move: {turn.opponent_move}</p>
{/each}