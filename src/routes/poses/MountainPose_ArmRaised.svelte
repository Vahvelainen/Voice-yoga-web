// 2nd pose
<script>
    import Pose from '@stores/poseStore' 
    import Voiceline from '@lib/VoiceLine.svelte'
    import PoseCheck from '@lib/PoseCheck.svelte';
    import PoseCheckList from '@lib/PoseCheckList.svelte';

    function feetTogetherCheck() {
      // Check that feet are together within a margin of 5cm
      let margin = 0.05
      let distance = Math.abs($Pose.keypoints[27].x - $Pose.keypoints[28].x)
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
      let palms_distance = Math.abs($Pose.keypoints[16].x - $Pose.keypoints[15].x)
      if (right_wrist_check > 0.20 && left_wrist_check > 0.20 && palms_distance < 0.10) {
        return true
      }
      return false
    }
  
  </script>
  
  <section>
    <PoseCheckList on:complete={() => console.log('yay')}>
      <PoseCheck test={() => $Pose.onFrame}>
        <Voiceline txt={'Stand at the front of your mat with your feet together and your hands hanging down on your sides'}/>
      </PoseCheck>
  
      <PoseCheck test={feetTogetherCheck}>
        <Voiceline txt={'Make sure your feet are together and aligned'}/>
      </PoseCheck>
  
      <PoseCheck test={armsUpCheck}>
        <Voiceline txt={'Inhale, lift your arms up over-head, and bring your palms together'}/>
      </PoseCheck>
  
      <PoseCheck test={() => false}>
        <Voiceline txt={'You are now in the Mountain Pose with  raised arms. Hold the pose and breathe deeply'}/>
      </PoseCheck>
    </PoseCheckList>
  </section>
  