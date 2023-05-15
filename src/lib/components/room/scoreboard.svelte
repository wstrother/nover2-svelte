<script>
    export let game;
    import Score from "./score.svelte";
</script>

<div class="scoreboard">
    <h1>SCORES</h1>
    <Score player_name={game.host_name} player_score={game.host_score} />
    <Score player_name={game.opponent_name} player_score={game.opponent_score} />
</div>