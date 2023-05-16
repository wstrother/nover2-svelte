<script>
    export let player_n;
    export let player_name;
</script>

<div class="flex flex-col items-center my-4 self-center h3 variant-filled-secondary rounded py-1 px-3 mx-auto w-1/2 min-w-max h-20">
{#if !player_n}
    <p>{player_name} is selecting a number...</p>
{:else}
    <p>{player_name} has selected</p>
    <div class="h1 text-primary-300">{player_n}</div>
{/if}
</div>