import { writable } from 'svelte/store';

//Speech settings
const voice = "Google UK English Female";
const pitch = 1
const rate = 0.8 //Speech rate slowed down due to user feedback

// Model of empty Queue
const speechQueueTemplate = {
  lines: [],
  latest: "",
  speaking: false,
}

export const SpeechQueue = writable(speechQueueTemplate);

// Add voiceline and speak remaining lines
export const addVoiceLine = (line) => {
  let speaking = true
  SpeechQueue.update( queue => {
    speaking = queue.speaking
    queue.lines.push(line)
    queue.speaking = true
    return queue
  })

  if (!speaking) {
    speakLines()
  }
}

export const deleteVoiceLine = ( line ) => {
  SpeechQueue.update( queue => {
    const index = queue.lines.indexOf(line);
    if (index > -1) { // only splice array when item is found
      queue.lines.splice(index, 1); // 2nd parameter means remove one item only
    }
    return queue
  })
}

// speechSynhehesis reguires user to do an action before it is allowed,
// Thankfully, onpenin the pose detection seems to allow it on desktop atleast
function speakLines() {
  let line

  SpeechQueue.update( queue => {
    line = queue.lines? queue.lines[0] : undefined
    if (!line) {
      queue.speaking = false
    } else {
      queue.latest = line
    }
    return queue
  })

  if (!line) return

  if (!'speechSynthesis' in window) {
    console.log('Text-to-speech not supported.');
    return
  }

  console.log('Speaking the line: ', line);
  const synth = window.speechSynthesis;

  //Wait 1s before starting
  setTimeout(()=>{
    //Check the line isnt deleted during timeout
    let line2 = ''
    SpeechQueue.update( queue => {
      line2 = queue.lines? queue.lines[0] : undefined
      return queue
    })
    //Abort if the line has been deleted
    if (line2 != line) {
      speakLines()
      return
    }

    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(line)
    utterThis.voice = voices.find( v => v.name == voice)
    utterThis.pitch = pitch
    utterThis.rate = rate
    // Always set the utterance language to the utterance voice's language
    // to prevent unspecified behavior.
    utterThis.lang = utterThis.voice.lang

    utterThis.onend = () => {
      //Do the next line
      deleteVoiceLine(line)
      speakLines()
    }

    synth.speak(utterThis)
  }, 1000) 
}

export default SpeechQueue;