<script>

  import Pose, { videoParams } from '@stores/poseStore' 
  import Voiceline from '@lib/VoiceLine.svelte'
  import PoseCheck from '@lib/PoseCheck.svelte';
  import PoseCheckList from '@lib/PoseCheckList.svelte';

  //A set up process for the yogi to find themselves in front of the camera

  // There propably should be some condition after the 
  // User wanders of the frame? -> Should change the onFrame on the posestore to not check scores (TODO)
  let setup_complete = false
  
  // First sentence "Place your device against the wall so that it stays upright and you have 2 meters in front of it for moving"

  // 1.
  // wait for person to come to the picture frame
  // ( Person is prettymuch directly in front of the frame by this point)
  function personPartlyInFrameTest() {
    const scores = $Pose.keypoints.map( point => point.score )
    return Math.max( ...scores ) > 0.8
  }

  // 2.
  // Check that users feet are visible
  // if not, advice to tilt the device more upright
  function feetInFrameTest() {
    let feetScores = [
      // Foot     
      $Pose.keypoints2D[31].y,
      $Pose.keypoints2D[32].y, 
    ]
    let feetHeights2D = [
      // Foot     
      $Pose.keypoints2D[31].y,
      $Pose.keypoints2D[32].y,
    ]
    return ( Math.max(...feetHeights2D) < videoParams.height - videoParams.frame 
             && Math.min(...feetScores) > 0.8 )
  }

  // 3.
  // Check that shoulders or head is in frame
  // if not advice user to walk further away from the device
  function noseInFrameTest() {
    const nose = $Pose.keypoints2D[0]
    return nose.y > videoParams.frame && nose.score > 0.8
  }

  // 4.
  // Check that user is more or less horizontally centered
  // Advice to walk bit to left or bit to right
  function notTooLeftTest() {
    const nose = $Pose.keypoints2D[0]
    return nose.x < ( videoParams.width / 3 ) * 2
    }
  function notTooRightTest() {
    const nose = $Pose.keypoints2D[0]
    return nose.x > videoParams.width / 3
  }

  // 5. Check that shoulderline points a bit away from the camera but not rearwards
  // addvice to turn if not
  // TODO

</script>

{#if !setup_complete }
  <PoseCheckList on:complete={ () => setup_complete = true }>

    <!-- PoseChecks only shows its content when its activated -->

    <PoseCheck test={ personPartlyInFrameTest }>
      <Voiceline txt={'Place your device against the wall so that it stays upright and you have 2 meters in front of it for moving around'}/>
    </PoseCheck>

    <PoseCheck test={ feetInFrameTest }>
      <Voiceline txt={'Tilt the device more upright so the camera can see your feet'}/>
    </PoseCheck>

    <PoseCheck test={ noseInFrameTest }>
      <Voiceline txt={'Walk back few meter so you are fully in the picture'}/>
    </PoseCheck>

    <PoseCheck test={ notTooLeftTest }>
      <Voiceline txt={'Move bit to the right'}/>
    </PoseCheck>

    <PoseCheck test={ notTooRightTest }>
      <Voiceline txt={'Move bit to the left'}/>
    </PoseCheck>

  </PoseCheckList>
{:else}
  <slot></slot>
{/if}