<script lang="ts">
    // Interval is in miliseconds, duration is in seconds
    const {duration, currentProgress}: {duration: number, currentProgress: number} = $props();
</script>

<div class="progress">
    <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        style={"width: " + (currentProgress / (1000 * duration)) * 100 + "%;"}
        aria-valuenow={currentProgress}
        aria-valuemin="0"
        aria-valuemax={1000 * duration}
    >
        Time left
    </div>
</div>