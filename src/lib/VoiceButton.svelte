<script>
  import { addVoiceCommand } from '@lib/voiceCommand'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  const sendSelectEvent = () => { dispatch( 'select' ) }

  export let phrases
  export let delete_after = false
  export let color = '#0C6863'


  let delete_command = () => {}

  onMount( () => {
    delete_command = addVoiceCommand( phrases, sendSelectEvent, delete_after)
  })

  onDestroy(delete_command)

  
</script>

<button on:click={ sendSelectEvent } style="background-color: {color};">
  <slot></slot>
</button>

<style>
  button {
    display: block;
    width: 100%;
    height: 4em;
    border: none;
    border-top: 3px solid #D9D9D9;
    font-weight: bold;
    font-size: 1.5em;
  }
</style>