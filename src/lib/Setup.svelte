<script>
  import { onMount } from 'svelte';
  import {addVoiceLine} from './speechQueue'
  import Pose from '@stores/poseStore'

  //A set up process for the yogi to find themselves in front of the camera

  let setup_complete = false

  
  
  // similar test as in yoga part, only start if setup is not complete ( should be a store? )
  // Maybe the structure should have like a test that is run before and test that is ran after? 
  // So it sequential by design 🤔 --> it could be a svelte class and element that could be seen at the screen!!!
  // The logic needs to be thought tho
  
  // First sentence "Place your device against the wall so that it stays upright and you have 2 meters in front of it for moving"

  // 1.
  // wait for person to come to the picture frame
  // ( Person is prettymuch directly in front of the frame by this point)

  // 2.
  // Check that users feet are visible
  // if not, advice to tilt the device more upright

  // 3.
  // Check that shoulders or head is in frame
  // if not advice user to walk further away from the device

  // 4.
  // Check that user is more or less horizontally centered
  // Advice to walk bit to left or bit to right

  // 5. Check that shoulderline points a bit away from the camera but not rearwards
  // addvice to turn if not

  onMount( () => {
    addVoiceLine( 'Please place your device against the wall so that it stays upright and you have 2 meters in front of it for moving around')

  })

</script>

<!-- Only show content is setup is done -->
{#if setup_complete }
  <slot></slot>
{/if}