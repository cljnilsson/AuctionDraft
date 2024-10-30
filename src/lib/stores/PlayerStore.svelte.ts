import AuctionItem from "$lib/types/AuctionItem";

let inventoryState: AuctionItem[] = $state([]);
let bidState = $state(0);
let moneyState = $state(100);
let waitingState = $state(true);

export default function Player() {
	return {
		get inventory() { return inventoryState },
		set inventory(v) { inventoryState = v },
        get bid() { return bidState },
		set bid(v) { bidState = v },
        get money() { return moneyState },
		set money(v) { moneyState = v },
		get waitingForBid() { return waitingState },
		set waitingForBid(v) { waitingState = v },
   };
}