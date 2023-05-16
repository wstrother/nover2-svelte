<script>
    export let game;
    import Score from "./score.svelte";
</script>

<div class="grid grid-cols-2 h1 variant-ghost-surface rounded">
    <span class="mx-auto self-center col-span-2">Scores</span>
    <Score player_name={game.host_name} player_score={game.host_score} />
    <Score player_name={game.opponent_name} player_score={game.opponent_score} />
</div>