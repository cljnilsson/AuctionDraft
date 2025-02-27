<script lang="ts">
	import { Game } from "$lib/stores/GameStore.svelte";
	import Log from "$lib/components/game/Log.svelte";

	let game = Game();
</script>

{#if game.localPlayer}
	{#each game.allOtherPlayers as op}
		<p class:text-danger={op.name === game.localPlayer.name}>
			{op.name}
			{#if op.waiting === false}<i class="bi bi-check"></i>{:else}
				<button
					type="button"
					aria-label="Bid"
					class="btn p-0 border-0 bg-transparent text-light"
					on:click={() => {
						op.bid = 3;
						game.lockPlayerBid(op);
					}}
				>
					<i class="bi bi-hourglass"></i>
				</button>
			{/if}
		</p>
		{#if op.name !== game.localPlayer.name}
			<div class="row">
				<div class="col">
					<small><i class="bi bi-piggy-bank-fill"></i>{op.money}</small>
				</div>
				<div class="col">
					<small><i class="bi bi-cash"></i>{op.bid}</small>
				</div>
			</div>
		{/if}
		<div class="row">
			<div class="col-auto">
				<div class="row">
					{#each op.inventory as item}
						<div class="col-auto text-center">
							<img src={item.image} alt="todo" />
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
	<div class="row border-top py-2">
		<div class="col">
			Tied
			<div class="row">
				{#each game.tiedAuctionList as item}
					<div class="col-auto text-center">
						<img src={item.image} alt="todo" />
					</div>
				{/each}
			</div>
		</div>
	</div>
	<Log />
{/if}

<style>
	img {
		width: 50px;
	}
</style>
