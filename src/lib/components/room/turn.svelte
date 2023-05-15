<script>
    export let player_n;
    export let player_name;
</script>

<div class="turn">
{#if !player_n}
    <p>{player_name} is selecting a number...</p>
{:else}
    <p>{player_name} has selected</p>
    <div class="player_move">{player_n}</div>
{/if}
</div>