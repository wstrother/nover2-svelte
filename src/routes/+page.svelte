<script>
    import {lobby} from '$lib/stores/lobby.js';
    import RoomPanel from '$lib/components/lobby/roomPanel.svelte';
    lobby.load_data();

</script>

<div class="table-container">
    {#each $lobby as room}
        <RoomPanel room={room} />
    {/each}
</div>

