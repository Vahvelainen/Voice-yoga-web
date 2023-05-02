<script>
  import PoseDetection from "@lib/PoseDetection.svelte";
  import Keypoints from "./Keypoints.svelte";
  import MountainPose from "./poses/1_MountainPose.svelte";
  import MountainPose_ArmRaised from "./poses/2_MountainPose_ArmRaised.svelte";
  import StandingForwardBend from "./poses/3_StandingForwardBend.svelte";
  import ForwardBend from "./poses/4_ForwardBend.svelte";
  import PlankPose from "./poses/5_PlankPose.svelte";
  import UpwardFacingDog from "./poses/6_UpwardFacingDog.svelte";
  import DownDog from "./poses/7_DownDogTests.svelte";
  import StandingForwardBend2 from './poses/8_StandingForwardBend.svelte'
  import ForwardBend2 from './poses/9_ForwardBend.svelte'
  import MountainPoseArmRaised2 from "./poses/10_MountainPose_ArmRaised.svelte";
  import Setup from "@lib/Setup.svelte";
  import Voiceline from "@lib/Voiceline.svelte";
  import { addVoiceLine } from '@lib/speechQueue.js'

  import VoiceButton from "../lib/VoiceButton.svelte";
    import StandingForwardBend_2 from "./poses/StandingForwardBend_2.svelte";
    import MountainPoseArmRaised_2 from "./poses/MountainPose_ArmRaised_2.svelte";
    import ForwardBend_2 from "./poses/ForwardBend_2.svelte";

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
      <MountainPose on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 1}
      <MountainPose_ArmRaised on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 2}
      <StandingForwardBend on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 3}
      <ForwardBend on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 4}
      <PlankPose on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 5}
      <UpwardFacingDog on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 6}
      <DownDog on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 7}
      <StandingForwardBend2 on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 8}
      <ForwardBend2 on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 9}
      <MountainPoseArmRaised2 on:complete={ () => poseIndex += 1 }/>
    {:else if poseIndex == 10}
      <Voiceline txt={'Thats the program done, We hope you enjoyed and have a nice day ::)'}/>
    {/if}
  </Setup>
{/if}
<Keypoints/>
