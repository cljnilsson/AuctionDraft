import AuctionItem from "$lib/types/AuctionItem";

// The game has started
let startedState = $state(true);

// Auction state / data
let auctionState: AuctionItem | null = $state(null);
let auctionListState: AuctionItem[] = $state([]);
let currentAuctionIndexState: number = $state(0);

// Game state
enum GameState {
    waitToStart,
    waitForBids,
    finished
}

let generalGameState = $state(GameState.waitForBids);
let timerProgState = $state(0);
let lockedPlayers = $state([]);
let allPlayersState = $state([
    {
        name: 'p2',
        waiting: true
    }
]);

export function started() {
	return {
		get value() { return startedState },
		set value(v) { startedState = v },
		toggle: () => {
			console.log("=>", !startedState);
			startedState = !startedState;
		}
   };
}

export function timerProg() {
	return {
		get value() { return timerProgState },
		set value(v) { timerProgState = v },
   };
}

export function Auction() {
	return {
        // The current item
		get item() { return auctionState },
		set item(v) { auctionState = v },
        // The current item index
        get itemIndex() { return currentAuctionIndexState },
		set itemIndex(v) { currentAuctionIndexState = v },
        // All the items
        get list() {return auctionListState},
        set list(v) {
            auctionListState = v;
            currentAuctionIndexState = 0;
            auctionState = auctionListState[currentAuctionIndexState];
        },
        nextItem() {
            currentAuctionIndexState++;
            auctionState = auctionListState[currentAuctionIndexState];
        }
   };
}

export function Game() {
    return {
        get allOtherPlayers() { return allPlayersState },
		set allOtherPlayers(v) { allPlayersState = v },
        get gameState() { return generalGameState },
		set gameState(v) { generalGameState = v },

        lockPlayerBid: (player: any) => {
            lockedPlayers.push(player)
        },
        isWaitingForPlayers: () => {
            // +1 because the local player is not included
            return lockedPlayers.length + 1 < allPlayersState.length;
        },
        newRound: () => {
            lockedPlayers = [];
        }
    }
}