//The 6th pose
<script>
    import Pose from '@stores/poseStore'
    import Voiceline from '@lib/VoiceLine.svelte'
    import PoseCheck from '@lib/PoseCheck.svelte';
    import PoseCheckList from '@lib/PoseCheckList.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()

    let complete = false    

    function lowerBodyCheck() {
    // Are foot over the knees
    let kneeeHeights = [
      $Pose.keypoints[26].y,
      $Pose.keypoints[25].y,
    ]
    let footHeights = [
      // Hips
      $Pose.keypoints[28].y,
      $Pose.keypoints[27].y, 
    ]
    if (Math.max(...kneeeHeights) > Math.min(...footHeights)) {
      return true
    } 
    return false
  }
    
  </script>

  <section>
    <Voiceline txt={'Take a deep breath and exhale as you lower your body down to the mat'}/>
    
    {#if !complete}
  
      <!-- PoseCheckList activates elements inside it one by one -->
      <!-- PoseCheckList Dispatches "complete" event when all test are passed -->
      <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >
  
        <!-- PoseChecks only shows its content when its activated -->
        <PoseCheck test={lowerBodyCheck}>
          <Voiceline txt={'Keep your elbows close to your sides and lower your body down to the floor, keeping it close to the mat. Hold your breath'}/>
        </PoseCheck>
    
  
      </PoseCheckList>
    {:else}
      <Voiceline txt={'You are now in upwards facing dog. Hold the postion and breath in and out'}/>
    {/if}
  </section>