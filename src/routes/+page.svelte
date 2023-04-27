<script>
  import PoseDetection from "@lib/PoseDetection.svelte";
  import Keypoints from "./Keypoints.svelte";
  import DownDogTests from "./poses/DownDogTests.svelte";
  import MountainPoseTest from "./poses/MountainPoseTest.svelte";
  import MountainPose_ArmRaised from "./poses/MountainPose_ArmRaised.svelte";
  import StandingForwardBend from "./poses/StandingForwardBend.svelte";
  import ForwardBend from "./poses/ForwardBend.svelte";
  import PlankPose from "./poses/PlankPose.svelte";
  import UpwardFacingDog from "./poses/UpwardFacingDog.svelte";
  import Setup from "@lib/Setup.svelte";
  import Voiceline from "@lib/Voiceline.svelte";
  import { addVoiceLine } from '@lib/speechQueue.js'

  import VoiceButton from "../lib/VoiceButton.svelte";

  let poseIndex = 0

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

<Voiceline txt={'Welcome to voice yoga'}/>

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

<PoseDetection/>
{#if start_yoga}
  <Setup>
    {#if poseIndex == 0}
      <MountainPoseTest on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 1}
      <MountainPose_ArmRaised on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 2}
      <DownDogTests on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 3}
      <Voiceline txt={'Thats the program done, We hope you enjoyed and have a nice day ::)'}/>
    {/if}
  </Setup>
{/if}
<Keypoints/>
