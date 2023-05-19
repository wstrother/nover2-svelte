<script>
    export let game;
</script>

<div>
    <h1>{`${game.winner_name} takes it over ${game.loser_name}!`}</h1>
    <div>Final Score</div>
    <div>{`${game.winner_score} - ${game.loser_score}`}</div>
</div>