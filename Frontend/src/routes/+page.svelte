<script lang="ts">
	import "bootstrap/dist/css/bootstrap.css";
	import scriptSrc from "bootstrap/dist/js/bootstrap.bundle.js?url";
	import Lobby from "$lib/components/Lobby.svelte";
	import GameCore from "$lib/components/game/GameWrapper.svelte";
	import { Auction, Game } from "$lib/stores/GameStore.svelte";

	// Game
	let auction = Auction();
	let game = Game();

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
	<GameCore />
{:else}
	<Lobby />
{/if}
