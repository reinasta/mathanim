<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import p5 from 'p5';

  export let sketchName: string;

  let container: HTMLElement;
  let isPlaying = true;
  let speed = 1;
  let tangentLength = 100;
  let sketch: any;
  let p5Instance: p5;

  onMount(async () => {
    const module = await import(`../animations/${sketchName}.ts`);
    sketch = module[sketchName];
    p5Instance = new p5((p: p5) => {
      const s = sketch(p);
      if (s && typeof s === 'object') {
        sketch = s;
      }
    }, container);
  });

  onDestroy(() => {
    if (p5Instance) {
      p5Instance.remove();
    }
  });

  function togglePlay() {
    isPlaying = !isPlaying;
    if (sketch && sketch.setPlaying) {
      sketch.setPlaying(isPlaying);
    }
  }

  function changeSpeed(event: Event) {
    speed = parseFloat((event.target as HTMLInputElement).value);
    if (sketch && sketch.setSpeed) {
      sketch.setSpeed(speed);
    }
  }

  function changeTangentLength(event: Event) {
    tangentLength = parseFloat((event.target as HTMLInputElement).value);
    if (sketch && sketch.setTangentLength) {
      sketch.setTangentLength(tangentLength);
    }
  }
</script>

<div>
  <div bind:this={container} style="width: 100%; height: 400px;"></div>
  <div class="controls">
    <button on:click={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
      {#if isPlaying}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      {/if}
    </button>
    <div>
      <label for="speed">Speed:</label>
      <input id="speed" type="range" min="0.1" max="2" step="0.1" bind:value={speed} on:input={changeSpeed}>
      <span>{speed.toFixed(1)}x</span>
    </div>
    {#if sketchName === 'tangentSketch'}
      <div>
        <label for="tangentLength">Tangent Length:</label>
        <input id="tangentLength" type="range" min="50" max="200" step="10" bind:value={tangentLength} on:input={changeTangentLength}>
        <span>{tangentLength}px</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  input[type="range"] {
    width: 100px;
  }
</style>