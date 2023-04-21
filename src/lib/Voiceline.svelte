<script>
  //Just and element access to the store

  import { onDestroy, onMount } from "svelte"
  import { SpeechQueue, addVoiceLine, deleteVoiceLine } from '@lib/speechQueue.js'

  export let txt = "Hello world"
  let timeOutID //This is used to prevent adding the line with <50ms appearance

  onMount( () => {
    if ( !$SpeechQueue.lines.includes(txt) ) {
      timeOutID = setTimeout( () => {
        timeOutID = undefined
        addVoiceLine(txt)
      }, 50)
    }
  }) 

  onDestroy( () => {
    if (timeOutID) {
      clearTimeout(timeOutID)
    } else {
      deleteVoiceLine(txt)
    }
  })

</script>

<h2>{txt}</h2>
