//The 5th pose
<script>
  import Pose from '@stores/poseStore' 
  import Voiceline from '@lib/VoiceLine.svelte'
  import PoseCheck from '@lib/PoseCheck.svelte';
  import PoseCheckList from '@lib/PoseCheckList.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()

  let complete = false
  // Function to check if palms are on the mat
  function palmsOnMatCheck() {
    // Check that both palms are on the mat
    let right_hand_check = $Pose.keypoints[16].y - $Pose.keypoints[26].y
    let left_hand_check = $Pose.keypoints[15].y - $Pose.keypoints[25].y
      if (right_hand_check > 0 && left_hand_check > 0) {
      return true
    }
    return false
  }

  // Function to check if body is in a straight line
  function straightLineCheck() {
    // Check that shoulders are over wrists
    let shoulder_check = [$Pose.keypoints[12] - $Pose.keypoints[24], $Pose.keypoints[11] - $Pose.keypoints[23]]
    let straight_check_left = $Pose.angles['leftHip']
    let straight_check_right = $Pose.angles['rightHip']
    // shoulder should higher than wrist
    if (Math.max(...shoulder_check) < 0) {
      // Check that body is in a straight line
      if (straight_check_left > 150 && straight_check_right > 150) {
        return true
      }
    }
    return false
  }

</script>

<section>
  {#if !complete}
  <Voiceline txt={'Place your palms again on the mat, and either jump or step backward so that you are on the upwards position of a push-up. Your shoulders should be over your wrists and your body in a straight line.'}/>

    <!-- PoseCheckList activates elements inside it one by one -->
    <!-- PoseCheckList Dispatches "complete" event when all test are passed -->
    <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >

      <!-- PoseChecks only shows its content when its activated -->
      <PoseCheck test={palmsOnMatCheck}>
        <Voiceline txt={'Make sure both palms are on the mat.'}/>
      </PoseCheck>
  
      <PoseCheck test={straightLineCheck}>
        <Voiceline txt={'Make sure your shoulders are over your wrists and your body is in a straight line.'}/>
      </PoseCheck>

    </PoseCheckList>
  {:else}
    <Voiceline txt={'You are now in the Plank Pose. Hold the pose and breathe deeply.'}/>
  {/if}
</section>