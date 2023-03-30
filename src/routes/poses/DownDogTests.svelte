<script>
  import Pose from '@stores/poseStore' 
  import Voiceline from '@lib/Voiceline.svelte';
  import { onMount } from 'svelte';
  
  //Test stay true for 2 seconds after turning false
  const timeout = 2000

  // Everything on cam
  let onCam  = false
  let onCamTime
  function onCamCheck() {
    // onCam check moved to poseStore.js
    if ( $Pose.onFrame ) {
      onCam  = true
      onCamTime = Date.now()
    } else if ( Date.now() - onCamTime > timeout) {
      onCam  = false
    }
  }
  
  let limbsDown = false
  let limbsDownTime
  function limbsDownCheck() {
    // Check that height of wrists and foots are max 20cm different from each other
    let heights = [
      // Wrists
      $Pose.keypoints[15].y,
      $Pose.keypoints[16].y, 
      // Foot     
      $Pose.keypoints[31].y,
      $Pose.keypoints[32].y,
    ]
    if ( Math.max(...heights) - Math.min(...heights) < 0.2 && onCam ) {
      limbsDown = true
      limbsDownTime = Date.now()
    } else if ( Date.now() - limbsDownTime > timeout) {
      limbsDown = false
    }
  }

  let buttUp = false
  let buttUpTime
  function buttUpCheck() {
    // Are hips 50cm over the feet
    let shoullderHeights = [
      $Pose.keypoints[11].y,
      $Pose.keypoints[12].y,
    ]
    let buttHeights = [
      // Hips
      $Pose.keypoints[23].y,
      $Pose.keypoints[24].y, 
    ]
    if (Math.max(...shoullderHeights) > Math.min(...buttHeights) && limbsDown) {
      buttUp = true
      buttUpTime = Date.now()
    } else if ( Date.now() - buttUpTime > timeout) {
      buttUp = false
    }
  }

  function update() {
    onCamCheck()
    limbsDownCheck()
    buttUpCheck()
  }

  //check done every 100ms
  onMount( ()=>{
    setInterval(update, 100)
  })

</script>

<section>

  <div style="background-color: {onCam ? 'green' : 'red'};"></div>   
  <div style="background-color: {limbsDown ? 'green' : 'red'};"></div>    
  <div style="background-color: {buttUp ? 'green' : 'red'};"></div>    
 
  {#if !onCam}
    <Voiceline txt={'Move in front of the device, so that you are fully in the picture'}/>
  {/if}

  {#if onCam && !limbsDown }
    <Voiceline txt={'Get to all fours by plasing your hands on the floor in front of you, shoulder with apart'}/>
  {/if}

  {#if limbsDown && !buttUp}
    <Voiceline txt={'Good! Now push trough your legs and lift yout hips up high'}/>
  {/if}

  {#if buttUp}
    <Voiceline txt={'You are now in downwards facing dog. Hold the postion and breth in and out'}/>
  {/if}


</section>

<style>
  div {
    display: inline-block;
    height: 2em;
    width: 10em;
  }
</style>