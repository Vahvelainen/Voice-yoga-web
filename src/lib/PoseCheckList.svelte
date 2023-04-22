<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  const dispatch = createEventDispatcher()

  export let complete = false //compelete can use both as an event and as a bind
  let elem
  let children = []
  let updateIntervalID
  
  function setActiveChild() {
    //Set every children inactive
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.setAttribute('active', false)      
    }

    let allChildPassed = true
    //Set the first non pass child active
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const pass = child.getAttribute('pass')
      if ( pass != 'true' ) {
        allChildPassed = false
        child.setAttribute('active', true)
        break
      }
    }

    //Dispatch event when all children are passed
    if (allChildPassed) {
      if (!complete) {
        complete = true
        dispatch('complete')
      }
    } else {
      complete = false
    }
  }
  
  onMount( () => {
    children = elem.children
    setActiveChild()
    updateIntervalID = setInterval(setActiveChild, 50)
  })

  onDestroy( () => {
    clearInterval(updateIntervalID)
  })

</script>

<div bind:this={elem} id="poseCheckList">
  <slot></slot>
</div>

