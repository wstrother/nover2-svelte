<script>
    export let game;
    import Turn from "./turn.svelte";
</script>

<div class="turnboard">
    <Turn player_n={game.host_move} player_name={game.host_name} />
    <Turn player_n={game.opponent_move} player_name={game.opponent_name} />
</div>