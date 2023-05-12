// The 1st pose
<script>
    import Pose from '@stores/poseStore' 
    import Voiceline from '@lib/VoiceLine.svelte'
    import PoseCheck from '@lib/PoseCheck.svelte';
    import PoseCheckList from '@lib/PoseCheckList.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()

    let complete = false
    
    function feetTogetherCheck() {
      // Check that feet are together within a margin of 10cm
      let margin = 0.20
      let distance = 0
      //x + z distance
      distance +=  Math.abs($Pose.keypoints[27].x - $Pose.keypoints[28].x)
      distance +=  Math.abs($Pose.keypoints[27].z - $Pose.keypoints[28].z)
      if (distance < margin) {
        return true
      }
      return false
    }
  
    function armsDownCheck() {
      // from left to right + to - 
      // Check that wrists are below waist
      let right_wrist_check = $Pose.keypoints[24].y - $Pose.keypoints[16].y
      let left_wrist_check = $Pose.keypoints[23].y - $Pose.keypoints[15].y
      // Check that palms are aside
      let right_palm_aside_check = Math.abs($Pose.keypoints[16].x - $Pose.keypoints[24].x)
      let left_palm_aside_check = Math.abs($Pose.keypoints[15].x - $Pose.keypoints[23].x)
      if (left_wrist_check < 0.05 && right_wrist_check < 0.05 && right_palm_aside_check > 0.05 && left_palm_aside_check > 0.05) {
        return true
      }
      return false
    }
  
</script>

<section>

  
<!-- PoseCheckList activates elements inside it one by one -->
<!-- PoseCheckList Dispatches "complete" event when all test are passed -->
<Voiceline txt={'Stand at the front of your mat with your feet together and your hands hanging down on your sides'}/>

{#if !complete}
  
  <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >

    <!-- PoseChecks only shows its content when its activated -->
    <PoseCheck test={feetTogetherCheck}>
      <Voiceline txt={'Make sure your feet are together and aligned'}/>
    </PoseCheck>
  
    <PoseCheck test={armsDownCheck}>
      <Voiceline txt={'Relax your arms and let them hang freely on the sides of your body'}/>
    </PoseCheck>
        
  </PoseCheckList>
  
  <!-- Advice for after the pose is done and user is waiting -->
  {:else}
    <Voiceline txt={'You are now in the Mountain Pose. Hold the pose and breathe deeply'}/>
  {/if}

</section>