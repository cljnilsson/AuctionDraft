<script lang="ts">
	import "bootstrap/dist/css/bootstrap.css";
	import scriptSrc from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import GameComponent from "$lib/components/game/Game.svelte";
	import GameMenu from "$lib/components/game/GameMenu.svelte";
	import PlayerMenu from "$lib/components/game/PlayerMenu.svelte";
	import { Auction, Game } from "$lib/stores/GameStore.svelte";

	// Game
	let auction = Auction();
	let game = Game();
	let menuState: "Main" | "ThemeSelector" = "Main"; // Eslint doesn't want to let me use an enum

	auction.list = [
		{
			name: "Bulbasaur",
			notes: "Something 1",
			image: `/imgs/themes/${game.currentTheme}/bulbasaur.png`,
			boughtFor: null
		},
		{
			name: "Squirtle",
			notes: "Something 2",
			image: `/imgs/themes/${game.currentTheme}/squirtle.png`,
			boughtFor: null
		},
		{
			name: "Charmander",
			notes: "Something 3",
			image: `/imgs/themes/${game.currentTheme}/charmander.png`,
			boughtFor: null
		},
		{
			name: "Wooper",
			notes: "Something 4",
			image: `/imgs/themes/${game.currentTheme}/wooper-f.png`,
			boughtFor: null
		},
		{
			name: "Paldean Wooper",
			notes: "Something 5",
			image: `/imgs/themes/${game.currentTheme}/wooper-paldean.png`,
			boughtFor: null
		},
		{
			name: "Quagsire",
			notes: "Something 6",
			image: `/imgs/themes/${game.currentTheme}/quagsire-f.png`,
			boughtFor: null
		},
		{
			name: "Clodsire",
			notes: "Something 7",
			image: `/imgs/themes/${game.currentTheme}/clodsire.png`,
			boughtFor: null
		}
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
			{#if menuState === "ThemeSelector"}
				<div class="mb-3">
					<button class="btn btn-primary" onclick={() => menuState = "Main"}>Back</button>
				</div>
				{#each game.themes as theme}
					<button class="btn btn-primary mx-3" onclick={() => game.currentTheme = theme} disabled={game.currentTheme === theme}>{theme}</button>
				{/each}
			{:else if menuState === "Main"}
				<h5>Current theme: {game.currentTheme ?? "Loading"}</h5>
				<div class="form-check form-switch d-flex justify-content-center my-3">
					<input class="form-check-input" type="checkbox" id="enableTimerCheckbox" checked={game.enableTimer} onclick={() => game.enableTimer = !game.enableTimer} />
					<label class="form-check-label" for="enableTimerCheckbox">Enable Timer</label>
				</div>
				<button class="btn btn-lg btn-primary" onclick={() => (menuState = "ThemeSelector")} disabled={game.themes.length === 0 || !game.currentTheme}>Switch</button>
				<button class="btn btn-lg btn-primary" onclick={game.startNew} disabled={game.themes.length === 0 || !game.currentTheme}>Start</button>
			{/if}
		</div>
	</div>
{/if}
