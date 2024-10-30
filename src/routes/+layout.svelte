<script>
    import "./global.scss";
    import "bootstrap-icons/font/bootstrap-icons.css";

    let {children} = $props();
</script>
<main class="container">
    {#if children}
        {@render children()}
    {/if}
</main>