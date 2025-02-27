<script lang="ts">
	import { Game } from "$lib/stores/GameStore.svelte";
    
	let menuState: "Main" | "ThemeSelector" = "Main"; // Eslint doesn't want to let me use an enum
	let game = Game();
</script>

<div class="row">
	<div class="col bg-dark text-light text-center py-5">
		{#if menuState === "ThemeSelector"}
			<div class="mb-3">
				<button class="btn btn-primary" onclick={() => (menuState = "Main")}>Back</button>
			</div>
			{#each game.themes as theme}
				<button class="btn btn-primary mx-3" onclick={() => (game.currentTheme = theme)} disabled={game.currentTheme === theme}>{theme}</button>
			{/each}
		{:else if menuState === "Main"}
			<h5>Current theme: {game.currentTheme ?? "Loading"}</h5>
			<div class="form-check form-switch d-flex justify-content-center my-3">
				<input class="form-check-input" type="checkbox" id="enableTimerCheckbox" checked={game.enableTimer} onclick={() => (game.enableTimer = !game.enableTimer)} />
				<label class="form-check-label" for="enableTimerCheckbox">Enable Timer</label>
			</div>
			<button class="btn btn-lg btn-primary" onclick={() => (menuState = "ThemeSelector")} disabled={game.themes.length === 0 || !game.currentTheme}>Switch</button>
			<button class="btn btn-lg btn-primary" onclick={game.startNew} disabled={game.themes.length === 0 || !game.currentTheme}>Start</button>
		{/if}
	</div>
</div>
