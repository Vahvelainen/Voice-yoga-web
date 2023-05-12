<script>
  import PoseDetection from "@lib/PoseDetection.svelte";
  import Keypoints from "./Keypoints.svelte";
  import Voiceline from "@lib/Voiceline.svelte";
  import { SpeechQueue, addVoiceLine } from '@lib/speechQueue.js'
  import VoiceButton from "../lib/VoiceButton.svelte";
  import PoseIndex from "./poses/PoseIndex.svelte";
  import ScreenTap from "./ScreenTap.svelte";
  import Hero from "./Hero.svelte";

  let start_yoga = false

  function startProgram() {
    console.log('Starting program')
    addVoiceLine('Beginning yoga lesson')
    start_yoga = true
  }

  function stopProgram() {
    addVoiceLine('lesson stopped')
    start_yoga = false
  }
  
</script>


<ScreenTap>  
  <Voiceline txt={'Welcome to voice yoga'}/>

  {#if start_yoga}
    <PoseDetection/> 
    <div class="instruction_box">
      <h2>{$SpeechQueue.latest}</h2>
    </div>
    <PoseIndex/>
    <VoiceButton
      phrases={['stop', 'exit', 'cancel', 'quit']}
      on:select={stopProgram}
      color='#3F9C97'
    >Back to Start</VoiceButton>
  {:else}
    <Hero/>
    <VoiceButton
        phrases={['start', 'begin', 'open', 'start session', "let's yoga", "start yoga"]}
        on:select={startProgram}
    >Start lesson</VoiceButton>
  {/if}

  <VoiceButton
    phrases={['help', 'instructions']}
    on:select={()=>false}
    color='#FB6544'
  >
    Instructions
</VoiceButton>
  
  
  <!-- <Keypoints/> -->
</ScreenTap>


<style>
  .instruction_box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 8em;
    background-color: #0C2345;
  }
</style>