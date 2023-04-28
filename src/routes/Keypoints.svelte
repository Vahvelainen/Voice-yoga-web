<script>
  // Proof that poseStore works
  import Pose from '@stores/poseStore';
  $: angles = $Pose.angles;
</script>

{#if $Pose.available}
  <div class="output-container">
    {#each $Pose.keypoints as keypoint}
      <div class="output">
        <span class="name">{ keypoint.name }</span>
        <!-- X: across the sideways, increases leftwards -->
        <span class="x">X: { parseInt(keypoint.x * 100) }</span>
        <!-- Y: Height, increases downwards -->
        <span class="y">Y: { parseInt(keypoint.y * 100) }</span>
        <!-- Z: depth i guess but doesn't really work -->
        <span class="z">Z: { parseInt(keypoint.z * 100) }</span>
        <!-- Score: the visibility of the joint over 0.8 is good to use -->
        <span class="score">Score: { keypoint.score }</span>
      </div>
    {/each}

    {#if Object.keys(angles).length > 0}
    <div class="output">
      <span class="name">Angles:</span>
      {#each Object.keys(angles) as angleName}
        <span class="angle">{ angleName }: { angles[angleName].angle.toFixed(2) }&deg;</span>
        <span class="score">Score: { angles[angleName].score.toFixed(2) }</span>
        <br>
      {/each}
    </div>
  {/if}
  </div>
{/if}
