# Auction Draft Game

## What is it?
The idea is a social game where a certain amount of items are put up for auction. Each player will place bids to get the most items for their money by the end. The goal of this tool is just to make it easy to make the lineups for each player, the actual usage of the picked items are not apart of the tool.

## Modular
* While it is my intention to make a few default options I want to make it easy to add your own.
* I also want to allow for themes similar to Wordpress so you can control how items are displayed

### Current Progress
* Early days, currently it's single player to play around with UI and parts of the game logic.
* Current demo uses pokemon
* Some changes are required in order for clever players to abuse friendly mechanics. For example you can see other players' bids making it so you want to wait until the last second to bid.

### Built with:
* Sveltekit
* Typescript
* Bootstrap + Bootstrap Icons

## Running
```bash
npm i
```
```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
