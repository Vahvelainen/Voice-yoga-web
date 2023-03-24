<script>
  import Posecheck from '@lib/PoseCheck'
  import Pose from '@stores/poseStore' 
  import { onMount } from 'svelte';
  import Voiceline from '@lib/Voiceline.svelte';

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

  let checkVals = []

  function update() {
    onCam.check()
    limbsDown.check()
    buttUp.check()

    // svelte cant follow object values automatically
    checkVals = [
      onCam.pass,
      limbsDown.pass,
      buttUp.pass
    ]
  }

  onMount( () => {
    window.setInterval(
      update,
      100
    )
  })
</script>

<section>

    <!-- https://www.masterclass.com/articles/downward-dog-explained -->
 

  <Voiceline txt={'Welcome to voice yoga'}/>
  
  <Voiceline txt={'1. Get down on all fours. Start on the floor with your hands shoulder-width apart, with your shoulders above your wrists.'}/>
  <Voiceline txt={'2. Lift your knees. Next, tuck your toes against the mat or ground, using that leverage to extend your legs and lift both knees into the air.'}/>
  <Voiceline txt={'3. Extend. Extend and lengthen your spine, simultaneously pressing through the palms of your hands and balls of your feet.'}/>

  {#each checkVals as val}
    <div style="background-color: {val ? 'green' : 'red'};"></div>    
  {/each}

</section>

<style>
  div {
    display: inline-block;
    height: 10em;
    width: 10em;
    margin-right: 1em;
  }
</style>