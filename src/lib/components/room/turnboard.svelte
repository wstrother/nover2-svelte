<script>
    export let game;
    import Turn from "./turn.svelte";
</script>

<div class="grid grid-cols-2 h1 my-4 variant-ghost-surface w-4/5 mx-auto">
    <div class="mx-auto self-center col-span-2">Turn { game.turn_number}</div>
    <Turn player_n={game.host_move} player_name={game.host_name} />
    <Turn player_n={game.opponent_move} player_name={game.opponent_name} />
</div>