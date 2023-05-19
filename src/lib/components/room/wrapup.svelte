<script>
    export let game;
</script>

<div class="self-center flex flex-col items-center h1">
    <h1>{`${game.winner_name} takes it over ${game.loser_name}!`}</h1>
    <div class="h2 flex flex-col items-center variant-ghost-secondary rounded p-1 my-5 w-1/2">
        Final Score
        <div class="h1">{`${game.winner_score} - ${game.loser_score}`}</div>
    </div>
</div>