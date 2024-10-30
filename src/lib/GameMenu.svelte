<script lang="ts">
    import { timerProg, Auction } from '$lib/stores/GameStore.svelte';
    import Player from '$lib/stores/PlayerStore.svelte';

    let timerProgState = timerProg();
    let auction = Auction();
    let player = Player();

	function makeBid(amount: number) {
        if(player.bid + amount <= player.money) {
            player.bid += amount;
        } else {
            console.error("Not enough money to make that bid");
        }
	}

	function resetBid() {
        if(player.waitingForBid) {
            player.bid = 0;
        } else {
            console.error("Trying to reset bid even though its already locked in");
        }
	}

	function confirm() {
        player.waitingForBid = false;

        /*
        player.money -= player.bid;
        auction.list[auction.itemIndex].boughtFor = player.bid;
		player.inventory.push(auction.list[auction.itemIndex]);
        player.bid = 0;
        auction.nextItem(); // Updates index and item*/
        //timerProg = 0;
	}
</script>

<div class="row bg-light">
    <div class="col text-center">
        <h3>Bid: {player.bid}$</h3>
        <button class="btn btn-danger" disabled={player.bid === 0 || player.waitingForBid === false} onclick={resetBid}>Reset</button>
        {#each [1, 5, 10] as size}
            <button class="btn btn-primary mx-1" disabled={player.money === 0 || player.waitingForBid === false} onclick={() => makeBid(size)}>{size}</button>
        {/each}
        <button class="btn btn-success" disabled={player.waitingForBid === false} onclick={confirm}>Bid</button>
        {#if player.money > 0}
            <h3>Your money: <span class:text-muted={player.bid > 0}>{player.money - player.bid}</span> / {player.money}$</h3>
        {:else}
            <h3>Your money: <span class="text-muted">{player.money}</span>$</h3>
        {/if}
    </div>
</div>
<div class="row bg-light">
    <div class="col text-center">
        <div class="row">
            {#each player.inventory as item}
                <div class="col-auto text-center">
                    <p class="mb-0">{item.name} {item.boughtFor ?? 0}$</p>
                    <img src={item.image} alt="todo" />
                </div>
            {/each}
        </div>
    </div>
</div>