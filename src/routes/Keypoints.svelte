<script>
  // Proof that poseStore works
  import Pose from '@stores/poseStore' 
</script>

{#if $Pose.available}
  {#each $Pose.keypoints as keypoint}
    <div class="output">
      <span class="name">{ keypoint.name}</span>  
      <!-- X: across the sideways, increases leftwards -->
      <span class="x">X: {parseInt( keypoint.x * 100 )}</span>  
      <!-- Y: Height, increases downwards -->
      <span class="y">Y: {parseInt( keypoint.y * 100 )}</span> 
      <!-- Z: depth i quess but doesnt really work -->
      <span class="x">Z: {parseInt( keypoint.z * 100 ) }</span>  
      <!-- Score: the visibility of teh joint over 0.8 is good to use -->
      <span class="x">Score: { keypoint.score }</span>  
    </div>
  {/each}
{/if}