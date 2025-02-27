<script lang="ts">
    import PlayerMenu from "$lib/components/game/PlayerMenu.svelte";
    import GameComponent from "$lib/components/game/Game.svelte";
    import GameMenu from "$lib/components/game/GameMenu.svelte";
</script>

<div class="row">
    <div class="col col-xl-2 bg-dark text-light">
        <PlayerMenu />
    </div>
    <div class="col d-flex flex-column">
        <div class="row justify-content-center flex-grow-1 align-self-stretch">
            <div class="col-auto text-center">
                <GameComponent />
            </div>
        </div>
        <GameMenu />
    </div>
</div>