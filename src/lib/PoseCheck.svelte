<script>
  import { onDestroy, onMount } from "svelte"

  let pass = false
  let last_pass = 0
  let last_failed = 0
  export let test = () => false
  export let timeout = 2000
  export let pass_timeout = 100
  export let active = true //Active by default but PoseCheckList will set it to false
  let elem
  let updateIntervalID


  const observer = new MutationObserver(setActive);
  function setActive() {
    active = elem? elem.getAttribute('active') == 'true' : false
  }

  const checkTest = () => {
    const now = Date.now()
    if ( test() ) {
      last_pass = now
      if ( now - last_failed > pass_timeout) { //will pass the first time the function is ran withouth timeout
        pass = true
      }
    } else {
      last_failed = now
      if ( now - last_pass > timeout) {
        pass = false
      }
    }
  }

  onMount( () => {
    checkTest()
    updateIntervalID = setInterval(checkTest, 100)
    observer.observe( elem, { attributes: true } )
  })

  onDestroy( () => {
    clearInterval(updateIntervalID)
  })

</script>

<div bind:this={elem} pass={pass} active={active}>
  <!-- The divider should be hided when not in developement -->
  <!-- <div class="pass_mark" style="background-color:{ pass? 'green' : 'red' };"></div> -->
  {#if active}
    <slot></slot>
  {/if}
</div>

<style>
  .pass_mark {
    height: 2em;
    width: 2em;
    display: inline-block;
  }
</style>