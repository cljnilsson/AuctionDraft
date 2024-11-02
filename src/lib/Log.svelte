<script lang="ts">
    import {Game} from "$lib/stores/GameStore.svelte";
    let game = Game();
</script>

<div class="row border-top pb-2 pt-2">
    <div class="col">
        <div class="logs">
            {#each game.logs as m}
                <p>{m}</p>
            {/each} 
        </div>
    </div>
</div>

<style>
    .logs {
        height: 250px;
        overflow-y: auto;
        background-color: rgb(48, 52, 56);
        color: rgb(248, 249, 250);
        border-radius: 5px;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }
</style>