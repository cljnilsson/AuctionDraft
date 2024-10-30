<script lang="ts">
	import Player from '$lib/stores/PlayerStore.svelte';
    import { Game } from '$lib/stores/GameStore.svelte';

	let player = Player();
    let game = Game();
</script>

<p>You {#if player.waitingForBid === false}<i class="bi bi-check"></i>{:else}<i class="bi bi-hourglass"></i>{/if}</p>
<div class="row">
	<div class="col-auto">
		<div class="row">
			{#each player.inventory as item}
				<div class="col-auto text-center">
					<img src={item.image} alt="todo" />
				</div>
			{/each}
		</div>
	</div>
</div>
{#each game.allOtherPlayers as op}
	{op.name}
	{#if op.waiting === false}<i class="bi bi-check"></i>{:else}<i class="bi bi-hourglass"></i>{/if}
{/each}

<style>
	img {
		width: 50px;
	}
</style>
