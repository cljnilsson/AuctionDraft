<script>
    import "./global.scss";
    import "bootstrap-icons/font/bootstrap-icons.css";

    import Footer from "$lib/Footer.svelte";

    let {children} = $props();
</script>
<main class="container">
    {#if children}
        {@render children()}
    {/if}
    <Footer />
</main>