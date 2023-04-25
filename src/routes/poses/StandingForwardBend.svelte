// The 3rd pose
<script>
    import Pose from '@stores/poseStore' 
    import Voiceline from '@lib/VoiceLine.svelte'
    import PoseCheck from '@lib/PoseCheck.svelte';
    import PoseCheckList from '@lib/PoseCheckList.svelte';
  
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
      let right_hand_check = $Pose.keypoints[16].y - $Pose.keypoints[28].y
      let left_hand_check = $Pose.keypoints[15].y - $Pose.keypoints[27].y
      if (right_hand_check < 0 && left_hand_check < 0) {
        // Check that knees are straight
        let right_knee_check = $Pose.angles['rightKnee']
        let left_knee_check = $Pose.angles['leftKnee']
        let right_hip_check = $Pose.angles['rightHip']
        let left_hip_check = $Pose.angles['leftHip']
        if ((right_knee_check > 150 && left_knee_check > 150)&&(right_hip_check < 50 || left_hip_check < 50)){
          return true
        }
      }
      return false
    }
  
  </script>
  
  <section>
    <PoseCheckList on:complete={() => console.log('yay')}>
      <PoseCheck test={() => $Pose.onFrame}>
        <Voiceline txt={'Stand at the front of your mat with your feet hip-width apart and your hands hanging down on your sides'}/>
      </PoseCheck>
  
      <PoseCheck test={feetHipWidthCheck}>
        <Voiceline txt={'Make sure your feet are hip-width apart and aligned'}/>
      </PoseCheck>
  
      <PoseCheck test={forwardBendCheck}>
        <Voiceline txt={'Exhale, bend forward from your waist and bring your hands down to the mat, on the sides of your feet. Bend your knees as little as possible'}/>
      </PoseCheck>
  
      <PoseCheck test={() => false}>
        <Voiceline txt={'You are now in the Forward Bend pose. Hold the pose and breathe deeply'}/>
      </PoseCheck>
    </PoseCheckList>
  </section>
  