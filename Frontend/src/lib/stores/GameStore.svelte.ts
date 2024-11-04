import AuctionItem from "$lib/types/AuctionItem";
import GameState from "$lib/types/GameState";
import Player from "$lib/types/player";

// The game has started
let startedState = $state(false);

// Auction state / data
let auctionState: AuctionItem | null = $state(null);
let auctionListState: AuctionItem[] = $state([]);
let currentAuctionIndexState: number = $state(0);
let tiedItems: AuctionItem[] = $state([]);

// Game state
let generalGameState = $state(GameState.waitForBids);
let timerProgState = $state(0);
let lockedPlayers: Player[] = $state([]);
let gameLogs = $state(["Game has started!"]);
let mainTimer: number | null = $state(null);
let allPlayersState: Player[] = $state([
    {
        name: 'p2',
        money: 100,
        bid: 0,
        waiting: true,
        inventory: []
    },
    {
        name: 'You',
        money: 100,
        bid: 0,
        waiting: true,
        inventory: []
    },
    {
        name: 'p3',
        money: 100,
        bid: 0,
        waiting: true,
        inventory: []
    }
]);

export function Auction() {
    return {
        // The current item
        get item() { return auctionState },
        set item(v) { auctionState = v },
        // The current item index
        get itemIndex() { return currentAuctionIndexState },
        set itemIndex(v) { currentAuctionIndexState = v },
        // All the items
        get list() { return auctionListState },
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
        get started() { return startedState },
        set started(v) { startedState = v },

        get allOtherPlayers() { return allPlayersState },
        set allOtherPlayers(v) { allPlayersState = v },

        get lockedPlayers() { return lockedPlayers },
        set lockedPlayers(v) { lockedPlayers = v },

        get gameState() { return generalGameState },
        set gameState(v) { generalGameState = v },

        get localPlayer() { return allPlayersState.find(v => v.name === "You") },
        get tiedAuctionList() { return tiedItems },

        get logs() { return gameLogs },

        get timerValue() { return timerProgState },
        set timerValue(v) { timerProgState = v },

        addLog(msg: string) {
            gameLogs = [msg, ...gameLogs];
        },

        lockPlayerBid: (player: Player) => {
            // Validate in server later
            lockedPlayers = [...lockedPlayers, player];
            player.waiting = false;
            Game().addLog(`${player.name} bid ${player.bid}`);
        },
        getHighestBidder: (): Player | null => {
            const activePlayers = allPlayersState.filter(player => !player.waiting);

            if (activePlayers.length === 0) {
                return null;
            }

            const highestBidder = activePlayers.reduce((highest, current) => {
                if (current.bid > highest.bid) {
                    return current;
                }
                return highest;
            }, activePlayers[0]);

            // Check for ties
            const isTie = activePlayers.some(player =>
                player !== highestBidder && player.bid === highestBidder.bid
            );

            return isTie ? null : highestBidder;
        },
        declareWinner(winner: Player) {
            if(!auctionState) {
                console.error("Auction is empty");
                return;
            }

            winner.inventory.push(auctionState);
            winner.money -= winner.bid;

            Auction().nextItem();

            Game().newRound();
        },
        declareTie() {
            const a = Auction();
            if(!a.item) {
                console.error("Item does not exist");
                return;
            }

            tiedItems = [...tiedItems, a.item];
            a.nextItem();

            Game().newRound();
        },
        isWaitingForPlayers: () => {
            return lockedPlayers.length < allPlayersState.length;
        },

        newRound: () => {
            lockedPlayers = [];

            for(const ps of allPlayersState) {
                ps.waiting = true;
                ps.bid = 0;
            }

            const interval = 100;
            const duration = 30;

            // Probably not ideal, should reuse existing one but seems safer for now
            if(mainTimer) {
                clearInterval(mainTimer);
            }

            mainTimer = setInterval(() => {
                timerProgState += interval;
                if (timerProgState >= duration * 1000 && mainTimer) {
                    clearInterval(mainTimer);
                    timerProgState = 0;

                    // Maybe far from ideal but it works, I'll look into it later
                    const game = Game();
                    console.log("Timer ended");
                    const winner = game.getHighestBidder();
                    if(winner) {
                        game.declareWinner(winner);
                    } else {
                        game.declareTie();
                    }
                }
            }, interval);
        },
        startNew: () => {
            startedState = true;
            Game().newRound();
            generalGameState = GameState.waitForBids;
        }
    }
}