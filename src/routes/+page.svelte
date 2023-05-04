<script>
  import PoseDetection from "@lib/PoseDetection.svelte";
  import Keypoints from "./Keypoints.svelte";
  import Voiceline from "@lib/Voiceline.svelte";
  import { SpeechQueue, addVoiceLine } from '@lib/speechQueue.js'
  import VoiceButton from "../lib/VoiceButton.svelte";
  import PoseIndex from "./poses/PoseIndex.svelte";
  import ScreenTap from "./ScreenTap.svelte";

  let start_yoga = false

  function startProgram() {
    addVoiceLine('Beginning yoga lesson')
    start_yoga = true
  }

  function stopProgram() {
    addVoiceLine('lesson stopped')
    start_yoga = false
  }
  
</script>

<ScreenTap>
  <PoseDetection/> 
  
  {#if start_yoga}
    <PoseIndex/>
  {/if}
  
  <div class="instruction_box">
    <h2>{$SpeechQueue.latest}</h2>
  </div>
  
  <VoiceButton
    phrases={['start', 'begin', 'open', 'start session', "let's yoga", "start yoga"]}
    on:select={startProgram}
  >
    Start yoga
  </VoiceButton>
  
  <VoiceButton
    phrases={['stop', 'exit', 'cancel', 'quit']}
    on:select={stopProgram}
  >
    Stop yoga
  </VoiceButton>
  <Voiceline txt={'Welcome to voice yoga'}/>
  
  <!-- <Keypoints/> -->
</ScreenTap>


<style>
  .instruction_box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 8em;
    background-color: gainsboro;
  }
</style>