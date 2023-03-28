<script>
  import PoseDetection from "@lib/PoseDetection.svelte";
  import Keypoints from "./Keypoints.svelte";
  import DownDogTests from "./poses/DownDogTests.svelte";
  import Voiceline from "@lib/Voiceline.svelte";
  import { addVoiceCommand } from '@lib/voiceCommand'
  import { addVoiceLine } from '@lib/speechQueue.js'
  import { onMount } from "svelte";

  let start_yoga = false

  onMount(()=>{
    addVoiceCommand(
      ['start', 'begin', 'open', 'start session', "let's yoga", "start yoga"],
      startProgram, false
    )
    addVoiceCommand(
      ['stop', 'exit', 'cancel', 'quit'],
      stopProgram, false
    )
  })

  function startProgram() {
    addVoiceLine('Beginning yoga lesson')
    start_yoga = true
  }

  function stopProgram() {
    addVoiceLine('lesson stopped')
    start_yoga = false
  }
  
</script>

<Voiceline txt={'Welcome to voice yoga'}/>
<PoseDetection/>
{#if start_yoga}
  <DownDogTests/>
{/if}
<Keypoints/>
