<script>
  import Pose from '@stores/poseStore' 
  import { onMount } from 'svelte';

  // Everything on cam
  let onCam = false
  function onCamCheck() {
    let allThere = true
    $Pose.keypoints.forEach( keypoint  => {
      if (keypoint.score < 0.6 ) {
        allThere = false
      }
    })
    onCam = allThere
  }

  // Limbs on floor
  // Check that height of wrists and foots are max 20cm different from each other
  let limbsDown = false
  function limbsDownCheck() {
    let heights = [
      // Wrists
      $Pose.keypoints[15].y,
      $Pose.keypoints[16].y, 
      // Foot     
      $Pose.keypoints[31].y,
      $Pose.keypoints[32].y,
    ]
    limbsDown = Math.max(...heights) - Math.min(...heights) < 0.2
  }

  // Butt up
  // Are hips 50cm over the feet
  let buttUp = false
  function buttUpCheck() {
    let footHeights = [
      // Foot     
      $Pose.keypoints[31].y,
      $Pose.keypoints[32].y,
    ]
    let buttHeights = [
      // Wrists
      $Pose.keypoints[23].y,
      $Pose.keypoints[24].y, 
    ]
    buttUp =  Math.max(...footHeights) - Math.min(...buttHeights) > 0.5 
  }

  function update() {
    onCamCheck()
    limbsDownCheck()
    buttUpCheck()
  }

  onMount( () => {
    window.setInterval(
      update,
      100
    )
  })
</script>

<section>
  <div style="background-color: {onCam ? 'green' : 'red'};"></div>
  <div style="background-color: {limbsDown ? 'green' : 'red'};"></div>
  <div style="background-color: {buttUp ? 'green' : 'red'};"></div>
</section>

<style>
  div {
    display: inline-block;
    height: 10em;
    width: 10em;
  }
</style>