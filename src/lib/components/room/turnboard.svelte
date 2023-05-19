<script>
    export let game;
    import Turn from "./turn.svelte";

    let winner_id, host_win, opponent_win, win_text;
    $: winner_id = game.current_turn.winner_id

    $:{
        if (winner_id === game.host_id) {
            host_win = true;
            win_text = `${game.host_name} wins!`
        }
    
        if (winner_id === game.opponent_id) {
            opponent_win = true;
            win_text = `${game.opponent_name} wins!`
        }
    
        if (!winner_id) win_text = 'Draw'
    } 

</script>

<div class="grid grid-cols-2 h1 my-4 variant-ghost-surface w-4/5 mx-auto">
    <div class="mx-auto self-center col-span-2">{game.turn_number ? `Turn ${game.turn_number}` : 'Waiting to Start'}</div>
    <Turn player_n={game.current_turn.host_move} player_name={game.host_name} winner={host_win}/>
    <Turn player_n={game.current_turn.opponent_move} player_name={game.opponent_name} winner={opponent_win}/>
    {#if game.current_turn.host_move && game.current_turn.opponent_move}
        <div class="mx-auto self-center col-span-2 h2">{win_text ?? ''}</div>
    {/if}
</div>