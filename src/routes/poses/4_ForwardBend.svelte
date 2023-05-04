// The 4th pose
<script>
  import Pose from '@stores/poseStore'
  import Voiceline from '@lib/VoiceLine.svelte'
  import PoseCheck from '@lib/PoseCheck.svelte'
  import PoseCheckList from '@lib/PoseCheckList.svelte'
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()

  let complete = false

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

  // Function to check if fingertips are touching the mat and the back is straight
  function forwardBendCheck() {
    // Check that fingertips are touching the mat
    let right_fingertip_check = $Pose.keypoints[12].y - $Pose.keypoints[28].y
    let left_fingertip_check = $Pose.keypoints[11].y - $Pose.keypoints[27].y
    let head_knee_distance = Math.min(Math.abs($Pose.keypoints[0].x - $Pose.keypoints[26].x), Math.abs($Pose.keypoints[0].x - $Pose.keypoints[25].x))
    if (right_fingertip_check >= -10 && left_fingertip_check >= -10) {
      // Check that the back is straight
      // let lefthip = $Pose.angles['leftHip']
      // let righthip = $Pose.angles['rightHip']
      if ($Pose.keypoints[0].y < $Pose.keypoints[24].y + 0.1 || $Pose.keypoints[0].y < $Pose.keypoints[23].y + 0.1){
        if ($Pose.keypoints[0].y < $Pose.keypoints[26].y || $Pose.keypoints[0].y < $Pose.keypoints[26].y){
          return true
        }
        // return true
        }
    }
    return false
  }
</script>

<section> 
  <Voiceline txt={'Come to a standing position with your feet hip-width apart and your hands by your sides'}/>
  
  {#if !complete}

    <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >
      <PoseCheck test={feetHipWidthCheck}>
        <Voiceline txt={'Make sure your feet are hip-width apart and aligned'}/>
      </PoseCheck>
  
      <PoseCheck test={forwardBendCheck}>
        <Voiceline txt={'Inhale and straighten your back so that you’re looking forward. Keep your fingertips touching the mat'}/>
      </PoseCheck>
    </PoseCheckList>
  {:else}
    <Voiceline txt={'You are now in the Forward Bend pose. Hold the pose and breathe deeply'}/>
  {/if}
</section>