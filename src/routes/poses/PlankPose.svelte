//The 5th pose
<script>
  import Pose from '@stores/poseStore' 
  import Voiceline from '@lib/VoiceLine.svelte'
  import PoseCheck from '@lib/PoseCheck.svelte';
  import PoseCheckList from '@lib/PoseCheckList.svelte';

  // Function to check if palms are on the mat
  function palmsOnMatCheck() {
    // Check that both palms are on the mat
    let left_hand_check = Math.abs($Pose.keypoints[15].y - $Pose.keypoints[27].y)
    let right_hand_check = Math.abs($Pose.keypoints[16].y - $Pose.keypoints[28].y)
    if (left_hand_check < 10 && right_hand_check < 10) {
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
  <PoseCheckList on:complete={() => console.log('yay')}>
    <PoseCheck test={() => $Pose.onFrame}>
      <Voiceline txt={'Place your palms again on the mat, and either jump or step backward so that you are on the upwards position of a push-up. Your shoulders should be over your wrists and your body in a straight line.'}/>
    </PoseCheck>

    <PoseCheck test={palmsOnMatCheck}>
      <Voiceline txt={'Make sure both palms are on the mat.'}/>
    </PoseCheck>

    <PoseCheck test={straightLineCheck}>
      <Voiceline txt={'Make sure your shoulders are over your wrists and your body is in a straight line.'}/>
    </PoseCheck>

    <PoseCheck test={() => false}>
      <Voiceline txt={'You are now in the Upward-Facing Dog pose. Hold the pose and breathe deeply.'}/>
    </PoseCheck>
  </PoseCheckList>
</section>
