<script lang="ts">
	import { Auction, Game } from "$lib/stores/GameStore.svelte";
	import Timer from "$lib/components/timer.svelte";

	let auction = Auction();
	let game = Game();

	$effect(() => {
        const roundState = game.isWaitingForPlayers();
        
        $inspect(roundState);
        if(!roundState) {
            const winner = game.getHighestBidder();
            if(winner) {
                game.declareWinner(winner);
            } else {
                game.declareTie();
            }
        } else {
            console.log("Waiting for remaining players");
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
		<Timer duration={30} currentProgress={game.timerValue} />
	{/if}
</div>
