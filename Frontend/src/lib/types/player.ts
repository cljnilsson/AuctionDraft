import AuctionItem from "$lib/types/AuctionItem";

interface Player {
    name: string;
    money: number;
    bid: number;
    waiting: boolean;
    inventory: AuctionItem[]
};

export default Player;