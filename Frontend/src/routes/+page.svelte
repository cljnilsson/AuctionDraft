<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.css';
	import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
    import GameComponent from "$lib/Game.svelte";
    import GameMenu from "$lib/GameMenu.svelte";
    import PlayerMenu from "$lib/PlayerMenu.svelte";
    import { Auction, Game } from '$lib/stores/GameStore.svelte';

	// Game
	let auction = Auction();
	let game = Game();

	auction.list = [
		{
			name: 'Bulbasaur',
			notes: 'Something 1',
			image: '/imgs/bulbasaur.png',
            boughtFor: null
		},
		{
			name: 'Squirtle',
			notes: 'Something 2',
			image: '/imgs/squirtle.png',
            boughtFor: null
		},
		{
			name: 'Charmander',
			notes: 'Something 3',
			image: '/imgs/charmander.png',
            boughtFor: null
		},
		{
			name: 'Wooper',
			notes: 'Something 4',
			image: '/imgs/wooper-f.png',
            boughtFor: null
		},
		{
			name: 'Paldean Wooper',
			notes: 'Something 5',
			image: '/imgs/wooper-paldean.png',
            boughtFor: null
		},
		{
			name: 'Quagsire',
			notes: 'Something 6',
			image: '/imgs/quagsire-f.png',
            boughtFor: null
		},
		{
			name: 'Clodsire',
			notes: 'Something 7',
			image: '/imgs/clodsire.png',
            boughtFor: null
		},
	];
</script>

<svelte:head>
	<script src={scriptSrc}></script>
</svelte:head>

{#if game.started}
	<div>
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
	</div>
{:else}
	<div class="row">
		<div class="col bg-dark text-light text-center py-5">
			<h5>Current theme: {game.currentTheme ?? "Loading"}</h5>
			<button class="btn btn-lg btn-primary">Switch</button>
			<button class="btn btn-lg btn-primary" onclick={game.startNew} disabled={game.themes.length === 0 || !game.currentTheme}>Start</button>
		</div>
	</div>
{/if}
