<script>
    export let player_n;
    export let player_name;
    export let winner;

    let cls_str = "flex flex-col items-center my-4 self-center h3 variant-filled-secondary rounded py-1 px-3 mx-auto w-1/2 min-w-max h-20" 
    $: if (winner) cls_str += "border-2 ring-4 ring-primary-300 border-primary-600";
</script>

<div class={cls_str}>
{#if !player_n}
    <p>Waiting for {player_name}...</p>
{:else}
    <p>{player_name} has selected</p>
    <div class="h1 text-primary-300">{player_n}</div>
{/if}
</div>