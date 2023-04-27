<script>
  import Pose from '@stores/poseStore' 
  import Voiceline from '@lib/VoiceLine.svelte'
  import PoseCheck from '@lib/PoseCheck.svelte';
  import PoseCheckList from '@lib/PoseCheckList.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher()

  let complete = false
  
  function testFunction1() {
    //Access Pose with dollar sign like this:
    //$Pose.keypoints[index].x
    return false
  }

  function testFunction2() {
    return false
  }

</script>

<section>
  {#if !complete}
    <Voiceline txt={'Introduce the position'}/>

    <!-- PoseCheckList activates elements inside it one by one -->
    <!-- PoseCheckList Dispatches "complete" event when all test are passed -->
    <PoseCheckList on:complete={ () => setTimeout( () => dispatch('complete'), 10000 ) } bind:complete >

      <!-- PoseChecks only shows its content when its activated -->
      <PoseCheck test={testFunction1}>
        <Voiceline txt={'Advice to correct position so that test is passed'}/>
      </PoseCheck>

      <PoseCheck test={testFunction2}>
        <Voiceline txt={'Advice to correct position so that other test is passed'}/>
      </PoseCheck>

    </PoseCheckList>
  {:else}
    <Voiceline txt={'Tell user the pose is correct and ask to breath or something'}/>
  {/if}
</section>
