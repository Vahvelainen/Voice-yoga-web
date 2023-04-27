<script>
  import Pose from '@stores/poseStore' 
  import Voiceline from '@lib/VoiceLine.svelte'
  import PoseCheck from '@lib/PoseCheck.svelte';
  import PoseCheckList from '@lib/PoseCheckList.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()

  let complete = false
  
  function limbsDownCheck() {
    let heights = [
      // Wrists
      $Pose.keypoints[15].y,
      $Pose.keypoints[16].y, 
      // Foot     
      $Pose.keypoints[31].y,
      $Pose.keypoints[32].y,
    ]
    // Check that height of wrists and foots are max 20cm different from each other 
    if ( Math.max(...heights) - Math.min(...heights) < 0.2 ) {
      return true
    }
    return false
  }

  function buttUpCheck() {
    // Are hips over the shoulders
    let shoullderHeights = [
      $Pose.keypoints[11].y,
      $Pose.keypoints[12].y,
    ]
    let buttHeights = [
      // Hips
      $Pose.keypoints[23].y,
      $Pose.keypoints[24].y, 
    ]
    if (Math.max(...shoullderHeights) > Math.min(...buttHeights)) {
      return true
    } 
    return false
  }

</script>

<section>
  {#if !complete}
    <Voiceline txt={'Next is downwards facing dog'}/>

    <!-- PoseCheckList activates elements inside it one by one -->
    <!-- PoseCheckList Dispatches "complete" event when all test are passed -->
    <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >

      <!-- PoseChecks only shows its content when its activated -->
      <PoseCheck test={limbsDownCheck}>
        <Voiceline txt={'Get to all fours by placing your hands on the floor in front of you, shoulder with apart'}/>
      </PoseCheck>

      <PoseCheck test={buttUpCheck}>
        <Voiceline txt={'Good! Now push through your legs and lift your hips up high'}/>
      </PoseCheck>

    </PoseCheckList>
  {:else}
    <Voiceline txt={'You are now in downwards facing dog. Hold the postion and breath in and out'}/>
  {/if}
</section>
