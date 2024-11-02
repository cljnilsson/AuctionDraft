<script lang="ts">
	import { timerProg, Auction, Game } from "$lib/stores/GameStore.svelte";

	let timerProgState = timerProg();
	let auction = Auction();
	let game = Game();

	function makeBid(amount: number) {
		if (!game.localPlayer) {
			return;
		}

		if (game.localPlayer.bid + amount <= game.localPlayer.money) {
			game.localPlayer.bid += amount;
		} else {
			console.error("Not enough money to make that bid");
		}
	}

	function resetBid() {
		if (!game.localPlayer) {
			return;
		}

		if (game.localPlayer.waiting) {
			game.localPlayer.bid = 0;
		} else {
			console.error("Trying to reset bid even though its already locked in");
		}
	}

	function confirm() {
		if (game.localPlayer) {
			game.lockPlayerBid(game.localPlayer);
		} else {
			console.error("Player does not exist");
		}

		/*
        player.money -= player.bid;
        auction.list[auction.itemIndex].boughtFor = player.bid;
		player.inventory.push(auction.list[auction.itemIndex]);
        player.bid = 0;
        auction.nextItem(); // Updates index and item*/
		//timerProg = 0;
	}
</script>

{#if game.localPlayer}
	<div class="row">
		<div class="col">
			<div class="row bg-light">
				<div class="col text-center">
					<h3>Bid: {game.localPlayer.bid}$</h3>
					<button class="btn btn-danger" disabled={game.localPlayer.bid === 0 || game.localPlayer.waiting === false} onclick={resetBid}>Reset</button>
					{#each [1, 5, 10] as size}
						<button class="btn btn-primary mx-1" disabled={game.localPlayer.money === 0 || game.localPlayer.waiting === false} onclick={() => makeBid(size)}>{size}</button>
					{/each}
					<button class="btn btn-success" disabled={game.localPlayer.waiting === false} onclick={confirm}>Bid</button>
					{#if game.localPlayer.money > 0}
						<h3>Your money: <span class:text-muted={game.localPlayer.bid > 0}>{game.localPlayer.money - game.localPlayer.bid}</span> / {game.localPlayer.money}$</h3>
					{:else}
						<h3>Your money: <span class="text-muted">{game.localPlayer.money}</span>$</h3>
					{/if}
				</div>
			</div>
			<div class="row bg-light">
				<div class="col text-center">
					<div class="row">
						{#each game.localPlayer.inventory as item}
							<div class="col-auto text-center">
								<p class="mb-0">{item.name} {item.boughtFor ?? 0}$</p>
								<img src={item.image} alt="todo" />
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
