<script lang="ts">
  export let isPlaying = true;
  export let speed = 1;

  function togglePlay() {
    isPlaying = !isPlaying;
  }

  function changeSpeed(event: Event) {
    speed = parseFloat((event.target as HTMLInputElement).value);
  }
</script>

<div>
  <button on:click={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
  <input type="range" min="0.1" max="2" step="0.1" value={speed} on:input={changeSpeed}>
  <span>Speed: {speed.toFixed(1)}x</span>
</div>