<script>

  import MountainPose from "./1_MountainPose.svelte";
  import MountainPose_ArmRaised from "./2_MountainPose_ArmRaised.svelte";
  import StandingForwardBend from "./3_StandingForwardBend.svelte";
  import ForwardBend from "./4_ForwardBend.svelte";
  import PlankPose from "./5_PlankPose.svelte";
  import UpwardFacingDog from "./6_UpwardFacingDog.svelte";
  import DownDog from "./7_DownDogTests.svelte";
  import StandingForwardBend2 from './8_StandingForwardBend.svelte'
  import ForwardBend2 from './9_ForwardBend.svelte'
  import MountainPoseArmRaised2 from "./10_MountainPose_ArmRaised.svelte";
  import Setup from "@lib/Setup.svelte";
  import Voiceline from "@lib/Voiceline.svelte";

  let poseIndex = 0

</script>

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