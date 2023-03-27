<script>
  //Just and element access to the store

  import { onMount } from "svelte"
  import { SpeechQueue, addVoiceLine } from '@lib/speechQueue.js'

  export let txt = "Hello world"

  onMount( () => {
    console.log($SpeechQueue.lines);
    if ( !$SpeechQueue.lines.includes(txt) ) {
      addVoiceLine(txt)
    }
  }) 


</script>

<h2>{txt}</h2>
