<script lang="ts">
    import "./global.scss";
    import "bootstrap-icons/font/bootstrap-icons.css";

    import Footer from "$lib/Footer.svelte";
    import { Game } from "$lib/stores/GameStore.svelte";

    import { onMount } from 'svelte';

    let game = Game();
    let folders: string[] = [];

    onMount(async () => {
        const res = await fetch('/api/themes');
        if (res.ok) {
            folders = await res.json();
            console.log(folders);
            
            game.themes = folders;
            if(folders.length > 0) {
                game.themes = folders;
                game.currentTheme = folders[0];
            } else {
                console.error("No themes found");
            }
                
        }
    });

    let {children} = $props();
</script>
<main class="container">
    {#if children}
        {@render children()}
    {/if}
    <Footer />
</main>