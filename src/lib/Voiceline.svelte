<script>
  //Just and element access to the store

  import { onMount } from "svelte"
  import { addVoiceLine } from '@lib/speechQueue.js'

  export let txt = "Hello world"

  onMount( () => {
    addVoiceLine(txt)
  }) 


</script>

<h2>{txt}</h2>
