<script>
  // 2nd pose
    import Pose from '@stores/poseStore' 
    import Voiceline from '@lib/VoiceLine.svelte'
    import PoseCheck from '@lib/PoseCheck.svelte';
    import PoseCheckList from '@lib/PoseCheckList.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()

    let complete = false

    function feetTogetherCheck() {
      // Check that feet are together within a margin of 20cm
      let margin = 0.20
      let distance = 0
      //x + z distance (Manhattan distance)
      distance +=  Math.abs($Pose.keypoints[27].x - $Pose.keypoints[28].x)
      distance +=  Math.abs($Pose.keypoints[27].z - $Pose.keypoints[28].z)
      if (distance < margin) {
        return true
      }
      return false
    }
  
    // Function to check if arms are lifted and palms are touching
    function armsUpCheck() {
      // Check that wrists are above head(we use nose as reference)
      let right_wrist_check = $Pose.keypoints[16].y - $Pose.keypoints[0].y
      let left_wrist_check = $Pose.keypoints[15].y - $Pose.keypoints[0].y
      // Check that palms are touching
      let palms_distance = 0
      //Should do distance functions for these
      palms_distance += Math.abs($Pose.keypoints[16].x - $Pose.keypoints[15].x)
      palms_distance += Math.abs($Pose.keypoints[16].z - $Pose.keypoints[15].z)
      if (right_wrist_check < -0.20 && left_wrist_check < 0.20 && palms_distance < 0.20) {
        return true
      }
      return false
    }
  
  </script>
  
  <section>

    <Voiceline txt={'Inhale and lift your arms straight up, and bring your palms together above your head.'}/>
    
    {#if !complete}
      <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >
        <PoseCheck test={feetTogetherCheck}>
          <Voiceline txt={'Make sure your feet are together and aligned'}/>
        </PoseCheck>
    
        <PoseCheck test={armsUpCheck}>
          <Voiceline txt={'Inhale, lift your arms up over your head, and bring your palms together'}/>
        </PoseCheck>
      </PoseCheckList>
    <!-- Advice for after the pose is done and user is waiting -->
    {:else}
      <Voiceline txt={'You are now in the Mountain Pose with raised arms. Hold the pose and breathe deeply'}/>
    {/if}
  </section>
  