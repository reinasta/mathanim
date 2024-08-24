<script lang="ts">
  import { onMount } from 'svelte';
  import p5 from 'p5';

  export let sketchName: string;

  let container: HTMLElement;

  onMount(async () => {
    const module = await import(`../animations/${sketchName}.ts`);
    const sketch = module[sketchName];
    new p5(sketch, container);
  });
</script>

<div bind:this={container} style="width: 100%; height: 400px;"></div>