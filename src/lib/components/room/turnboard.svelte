<script>
    export let game;
    import Turn from "./turn.svelte";

    // let host_win, opponent_win;
    // $: host_win = game.host_id
    let winner_id = game.current_turn.winner_id;
    let host_win, opponent_win, win_text;

    if (winner_id === game.host_id) {
        host_win = true;
        win_text = `${game.host_name} wins!`
    }

    if (winner_id === game.opponent_id) {
        opponent_win = true;
        win_text = `${game.opponent_name} wins!`
    }

    if (!winner_id) win_text = 'Draw'

</script>

<div class="grid grid-cols-2 h1 my-4 variant-ghost-surface w-4/5 mx-auto">
    <div class="mx-auto self-center col-span-2">Turn { game.turn_number}</div>
    <Turn player_n={game.current_turn.host_move} player_name={game.host_name} winner={host_win}/>
    <Turn player_n={game.current_turn.opponent_move} player_name={game.opponent_name} winner={opponent_win}/>
    <div class="mx-auto self-center col-span-2 h2">{win_text ?? ''}</div>
</div>