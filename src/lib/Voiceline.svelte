<script>
  //Just and element access to the store

  import { onDestroy, onMount } from "svelte"
  import { SpeechQueue, addVoiceLine, deleteVoiceLine } from '@lib/speechQueue.js'

  export let txt = "Hello world"
  export let show = false

  onMount( () => {
    if ( !$SpeechQueue.lines.includes(txt) ) {
      addVoiceLine(txt)
    }
  }) 

  onDestroy( () => {
    deleteVoiceLine(txt)
  })

</script>

{#if show}
  <h2>{txt}</h2>
{/if}