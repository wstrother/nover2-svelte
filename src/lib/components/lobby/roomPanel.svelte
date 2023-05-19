<script>
    import Score from '$lib/components/room/score.svelte'
    import RoomHeader from '$lib/components/room/roomHeader.svelte'
    export let room;
</script>

<div class="grid grid-cols-5 variant-ghost-surface hover:variant-ghost-primary my-2 p-3 rounded">
    <RoomHeader name={`Room ${room.id}`} goal={room.goal}/>
    <div>
        Round {room.turn_number}
    </div>

    <Score 
        player_name={room.host_name}
        player_score={room.host_score}
        winner={room.host_name == room.winner_name}
    />

    <Score
        player_name={room.opponent_name}
        player_score={room.opponent_score}
        winner={room.opponent_name == room.winner_name}
    />

</div>