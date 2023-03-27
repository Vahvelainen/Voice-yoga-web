<script>
  import Posecheck from '@lib/PoseCheck'
  import Pose from '@stores/poseStore' 
  import { onMount } from 'svelte';
  import Voiceline from '@lib/Voiceline.svelte';

  // Everything on cam
  let onCam = new Posecheck( () => {
    let critical_scores = [
      //Wrists
      Math.max( $Pose.keypoints[15].score, $Pose.keypoints[16].score ),
      //Foot
      Math.max( $Pose.keypoints[31].score, $Pose.keypoints[32].score ),
      //Hips
      Math.max( $Pose.keypoints[23].score, $Pose.keypoints[24].score ),
      //Shoulders
      Math.max( $Pose.keypoints[11].score, $Pose.keypoints[12].score ),
    ]
    let visibility_scores = $Pose.keypoints.map( p => p.score )
    return Math.min(...critical_scores) > 0.8
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
    return Math.max(...heights) - Math.min(...heights) < 0.2 && onCam.pass
  })

  // Butt up
  // Are hips 50cm over the feet
  let buttUp = new Posecheck( () => {
    let shoullderHeights = [
      $Pose.keypoints[11].y,
      $Pose.keypoints[12].y,
    ]
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
    return Math.max(...shoullderHeights) > Math.min(...buttHeights) && limbsDown.pass
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

  {#each checkVals as val}
    <div style="background-color: {val ? 'green' : 'red'};"></div>    
  {/each}

  <Voiceline txt={'Welcome to voice yoga'}/>
  <Voiceline txt={'Move in front of the device, so that you are fully in the picture'}/>
  {#if checkVals[0]}
    <Voiceline txt={'Get to all fours by plasing your hands on the floor in front of you, shoulder with apart'}/>
  {/if}

  {#if checkVals[1] && checkVals[0]}
    <Voiceline txt={'Good! Now push trough your legs and lift yout hips up high'}/>
  {/if}

  {#if checkVals[2] && checkVals[1] && checkVals[0]}
    <Voiceline txt={'You are now in downwards facing dog. Hold the postion and breth in and out'}/>
  {/if}


</section>

<style>
  div {
    display: inline-block;
    height: 10em;
    width: 10em;
    margin-right: 1em;
  }
</style>