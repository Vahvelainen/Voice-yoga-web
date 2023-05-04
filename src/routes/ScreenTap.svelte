<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  
  let tapped = false
  const click = () => tapped = true


  onMount(() => {
    window.addEventListener('click', click);
    window.addEventListener('keydown', click);
  });

  onDestroy(() => {
    window.removeEventListener('click', click);
    window.removeEventListener('keydown', click);
  });

</script>
{#if !tapped}
  <div class="scree_tap">
    <h2>Click anywhere to start</h2>
  </div>
{:else}
  <slot/>
{/if}

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    aspect-ratio: 1;
    margin: auto;
    margin-top: 20vh;
    background-color: #3F9C97;
    border-radius: 9999px;
  }
  h2 {
    text-align: center;
    max-width: 80%;
  }
</style>