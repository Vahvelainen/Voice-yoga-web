// The 3rd pose
<script>
    import Pose from '@stores/poseStore' 
    import Voiceline from '@lib/VoiceLine.svelte'
    import PoseCheck from '@lib/PoseCheck.svelte';
    import PoseCheckList from '@lib/PoseCheckList.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()

    let complete = false
  
    // Function to check if feet are hip-width apart and aligned
    function feetHipWidthCheck() {
      // Check that feet are together within a margin of 10cm
      let margin = 0.20
      let distance = 0
      //x + z distance
      distance +=  Math.abs($Pose.keypoints[27].x - $Pose.keypoints[28].x)
      distance +=  Math.abs($Pose.keypoints[27].z - $Pose.keypoints[28].z)
      if (distance > margin) {
        return true
      }
      return false
    }
  
    // Function to check if hands are on the mat and knees are straight
    function forwardBendCheck() {
    // Check that hands are on the mat
    let right_hand_check = $Pose.keypoints[16].y - $Pose.keypoints[26].y
    let left_hand_check = $Pose.keypoints[15].y - $Pose.keypoints[25].y
    let head_knee_distance = Math.min(Math.abs($Pose.keypoints[0].x - $Pose.keypoints[26].x), Math.abs($Pose.keypoints[0].x - $Pose.keypoints[25].x))
    if (right_hand_check > 0 && left_hand_check > 0) {
      // Check that knees are straight
      if ($Pose.keypoints[0].y > $Pose.keypoints[26].y || $Pose.keypoints[0].y > $Pose.keypoints[26].y){
        if (head_knee_distance < 0.55) {
          return true
        }
      }
      // return true
    }
    return false
  }
  
  </script>
  
  <section>
    <Voiceline txt={'Face the camera sideways. Stand at the front of your mat with your feet hip-width apart and your hands hanging down on your sides'}/>
    
    {#if !complete}
      
      <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >
        <PoseCheck test={feetHipWidthCheck}>
          <Voiceline txt={'Make sure your feet are hip-width apart and aligned'}/>
        </PoseCheck>

        <PoseCheck test={forwardBendCheck}>
          <Voiceline txt={'Exhale, bend forward from your waist and bring your hands down to the mat, to the sides of your feet. Bend your knees as little as possible'}/>
        </PoseCheck>
      </PoseCheckList>
    <!-- Advice for after the pose is done and user is waiting -->
    {:else}
      <Voiceline txt={'You are now in the Standing Forward Bend pose. Hold the pose and breathe deeply'}/>
    {/if}
  </section>