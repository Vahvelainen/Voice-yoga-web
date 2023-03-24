import { writable } from 'svelte/store';

//Speech settings
const voice = "Google UK English Female";
const pitch = 1
const rate = 1

// Model of empty Queue
const speechQueueTemplate = {
  lines: [],
  speaking: false,
}

const SpeechQueue = writable(speechQueueTemplate);

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

function speakLines() {
  let line

  SpeechQueue.update( queue => {
    line = queue.lines? queue.lines.shift() : undefined
    queue.speaking = queue.lines? true : false
    return queue
  })

  if (!line) return
  console.log('Speaking the line: ', line);

  const synth = window.speechSynthesis;

  //Wait 1s before starting
  setTimeout(()=>{
    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(line)
    utterThis.voice = voices.find( v => v.name == voice)
    utterThis.pitch = pitch
    utterThis.rate = rate

    utterThis.onend = () => {
      //Do the next line
      speakLines()
    }

    synth.speak(utterThis)
  }, 1000) 
}

export default SpeechQueue;