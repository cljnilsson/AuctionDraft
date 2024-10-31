<script lang="ts">
	import { Game } from "$lib/stores/GameStore.svelte";

	let game = Game();
</script>

{#if game.localPlayer}
	{#each game.allOtherPlayers as op}
		<p class:text-danger={op.name === game.localPlayer.name}>
			{op.name}
			{#if op.waiting === false}<i class="bi bi-check"></i>{:else}<i
					class="bi bi-hourglass"
					onclick={() => {
						op.bid = 3;
						game.lockPlayerBid(op);
					}}
				></i>{/if}
		</p>
		<div class="row">
			<div class="col">
				<small><i class="bi bi-piggy-bank-fill"></i>{op.money}</small>
			</div>
			<div class="col">
				<small><i class="bi bi-cash"></i>{op.bid}</small>
			</div>
		</div>
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
	<div class="row border-top mt-3">
		<div class="col">Tied</div>
	</div>
{/if}

<style>
	img {
		width: 50px;
	}
</style>
