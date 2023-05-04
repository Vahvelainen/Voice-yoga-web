<script>
  import { addVoiceCommand } from '@lib/voiceCommand'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  const sendSelectEvent = () => { dispatch( 'select' ) }

  export let phrases
  export let delete_after = false

  let delete_command = () => {}

  onMount( () => {
    delete_command = addVoiceCommand( phrases, sendSelectEvent, delete_after)
  })

  onDestroy(delete_command)

  
</script>

<button on:click={ sendSelectEvent }>
  <slot></slot>
</button>

<style>
  button {
    display: block;
    width: 100%;
    height: 8em;
    border: none;
    background-color: orange;
  }
</style>