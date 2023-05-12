<script>
    import { game } from '$lib/stores/game.js';
    export let data;

    game.set_game_id(data.room_id);
    game.load_data();
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