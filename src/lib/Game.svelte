<script lang="ts">
	import { onDestroy } from "svelte";
	import GameState from "$lib/types/GameState";
	import { started, timerProg, Auction, Game } from "$lib/stores/GameStore.svelte";

	let timerProgState = timerProg();
	let auction = Auction();
	let game = Game();

	// Timer
	let timer: number;

	$effect(() => {
		//console.log("Locked in players: ", game.lockedPlayers);
		//$inspect(game.lockedPlayers);
		//$inspect(game.localPlayer);
        const roundState = game.isWaitingForPlayers();
        $inspect(roundState);
        if(!roundState) {
            const winner = game.getHighestBidder();
            if(winner) {
                game.declareWinner(winner);
            } else {
                //declare a tie later
            }
        } else {
            console.log("Waiting for remaining players");
        }
	});

	function onStart() {
		const updateInterval = 100;
		game.gameState = GameState.waitForBids;
		timer = setInterval(() => {
			timerProgState.value += updateInterval;
			if (timerProgState.value >= 30000) {
				clearInterval(timer);
			}
		}, updateInterval);
	}

	onDestroy(() => {
		if (timer) {
			clearInterval(timer);
		}
	});
</script>

<h3>{auction.itemIndex < auction.list.length ? auction.itemIndex + 1 : auction.list.length}/{auction.list.length}</h3>
<div class="border-top">
	{#if auction.itemIndex >= auction.list.length}
		<p>Auction is over!</p>
		{#each game.allOtherPlayers as op}
			{op.name}
			Items won: {op.inventory.length}
			Money left: {op.money}
		{/each}
	{:else}
		<h1>{auction.item?.name}</h1>
		<img src={auction.item?.image} alt="todo" />
		<p>{auction.item?.notes}</p>
		<div class="progress">
			<div
				class="progress-bar progress-bar-striped progress-bar-animated"
				role="progressbar"
				style={"width: " + (timerProgState.value / (1000 * 30)) * 100 + "%;"}
				aria-valuenow={timerProgState.value}
				aria-valuemin="0"
				aria-valuemax={1000 * 30}
			>
				Time left
			</div>
		</div>
	{/if}
</div>
