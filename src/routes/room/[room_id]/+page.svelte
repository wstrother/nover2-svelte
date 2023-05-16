<script>
    import { game } from '$lib/stores/game.js';
    import Scoreboard from '$lib/components/room/scoreboard.svelte';
    import Turnboard from '$lib/components/room/turnboard.svelte';
    import RoomHeader from '$lib/components/room/roomHeader.svelte';
    export let data;

    game.set_room_id(data.room_id);
    game.load_data();
</script>


{#if !$game.viewable}
<p>You cannot view this game</p>

{:else}
    <div class="grid grid-cols-2 gap-4 px-5">
        <RoomHeader goal={$game.goal} name={$game.room_name ?? `Room ${$game.room_id}`} />

        <Scoreboard game={$game} />
    </div>

    <Turnboard turn={$game.turn_number} game={$game} />
{/if}