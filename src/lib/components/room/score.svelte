<script>
    export let player_name;
    export let player_score;
    export let winner;

    let cls_str = "flex flex-col items-center my-4 self-center h3 variant-ghost-secondary rounded py-1 px-3 mx-auto w-1/2 min-w-max h-20" 
    $: if (winner) cls_str += "border-2 ring-4 ring-primary-300 border-primary-600";
</script>

<div class={cls_str}>
    <span class='player_name'>{player_name}</span>
    <span class='player_score'>{player_score ?? 0}</span>
</div>