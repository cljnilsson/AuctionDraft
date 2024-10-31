<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.css';
	import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
	import { onDestroy } from 'svelte';
    import Game from "$lib/Game.svelte";
    import GameMenu from "$lib/GameMenu.svelte";
    import PlayerMenu from "$lib/PlayerMenu.svelte";
    import { Auction, started } from '$lib/stores/GameStore.svelte';

	// Game
	let auction = Auction();
    let hasStarted = started();

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

    function onStart() {
		const updateInterval = 100;
		/*startedState.value = true;
		timer = setInterval(() => {
			timerProgState.value += updateInterval;
			if (timerProgState.value >= 30000) {
				clearInterval(timer);
			}
		}, updateInterval);*/
	}
</script>

<svelte:head>
	<script src={scriptSrc}></script>
</svelte:head>

{#if hasStarted}
	<div>
		<div class="row">
			<div class="col col-xl-2 bg-dark text-light">
                <PlayerMenu />
            </div>
			<div class="col">
                <div class="row justify-content-center">
                    <div class="col-auto text-center">
                        <Game />
                    </div>
                </div>
                <GameMenu />
			</div>
		</div>
	</div>
{:else}
	<button onclick={onStart}>Start</button>
{/if}
