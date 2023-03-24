<script>
  import PoseDetection from "@lib/PoseDetection.svelte";
  import Keypoints from "./Keypoints.svelte";
  import DownDogTests from "./DownDogTests.svelte";
  import { addVoiceLine } from '@lib/speechQueue.js'
  import { addVoiceCommand } from '@lib/voiceCommand'
  import { onMount } from "svelte";

  onMount( () => {
    addVoiceCommand(
      ['hello', 'hi'],
      () => { addVoiceLine('hello for you too') }
    )
  })

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<PoseDetection/>
<DownDogTests/>
<Keypoints/>
