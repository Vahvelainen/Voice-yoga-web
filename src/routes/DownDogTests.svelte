<script>
  import Posecheck from '@lib/PoseCheck'
  import Pose from '@stores/poseStore' 
  import { onMount } from 'svelte';

  // Everything on cam
  let onCam = new Posecheck( () => {
    let visibility_scores = $Pose.keypoints.map( p => p.score )
    return Math.min(...visibility_scores) > 0.6
  })

  // Limbs on floor
  // Check that height of wrists and foots are max 20cm different from each other
  let limbsDown = new Posecheck( () => {
    let heights = [
      // Wrists
      $Pose.keypoints[15].y,
      $Pose.keypoints[16].y, 
      // Foot     
      $Pose.keypoints[31].y,
      $Pose.keypoints[32].y,
    ]
    return Math.max(...heights) - Math.min(...heights) < 0.2
  })

  // Butt up
  // Are hips 50cm over the feet
  let buttUp = new Posecheck( () => {
    let footHeights = [
      // Foot     
      $Pose.keypoints[31].y,
      $Pose.keypoints[32].y,
    ]
    let buttHeights = [
      // Hips
      $Pose.keypoints[23].y,
      $Pose.keypoints[24].y, 
    ]
    return Math.max(...footHeights) - Math.min(...buttHeights) > 0.5 
  })

  function update() {
    onCam.check()
    limbsDown.check()
    buttUp.check()
  }

  onMount( () => {
    window.setInterval(
      update,
      100
    )
  })
</script>

<section>
  <div style="background-color: {onCam.pass ? 'green' : 'red'};"></div>
  <div style="background-color: {limbsDown.pass ? 'green' : 'red'};"></div>
  <div style="background-color: {buttUp.pass ? 'green' : 'red'};"></div>
</section>

<style>
  div {
    display: inline-block;
    height: 10em;
    width: 10em;
  }
</style>