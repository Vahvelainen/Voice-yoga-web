//The 6th pose
<script>
    import Pose from '@stores/poseStore'
    import Voiceline from '@lib/VoiceLine.svelte'
    import PoseCheck from '@lib/PoseCheck.svelte';
    import PoseCheckList from '@lib/PoseCheckList.svelte';
    
    // Function to check if elbows are close to the sides and body is close to the mat
    function lowerBodyCheck() {
    // Check that shoulders are over wrists
    let shoulder_check = [$Pose.keypoints[12] - $Pose.keypoints[24], $Pose.keypoints[11] - $Pose.keypoints[23]]
    // shoulder should higher than wrist
    if (Math.max(...shoulder_check) < 0) {
        // Check that elbows are close to the side
        let hip_check = [$Pose.keypoints[13] - $Pose.keypoints[23], $Pose.keypoints[14] - $Pose.keypoints[24]]
        if (Math.max(...hip_check) < 0) {
        return true
        }   
      }
      return false
    }
    
  </script>
  
  <section>
    <PoseCheckList on:complete={() => console.log('yay')}>
      <PoseCheck test={() => $Pose.onFrame}>
        <Voiceline txt={'Take a deep breath and exhale as you lower your body down to the mat'}/>
      </PoseCheck>
    
      <PoseCheck test={lowerBodyCheck}>
        <Voiceline txt={'Keep your elbows close to your sides and lower your body down to the floor, keeping it close to the mat. Hold your breath'}/>
      </PoseCheck>
    
      <PoseCheck test={() => false}>
        <Voiceline txt={'You are now in the lowered position of a push-up. Hold the pose and breathe deeply'}/>
      </PoseCheck>
    </PoseCheckList>
  </section>
  