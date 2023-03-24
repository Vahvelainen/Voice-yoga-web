import { writable } from 'svelte/store';


// Model of empty Queue
const voiceCommandQueueTemplate = {
  commands: [
    // Example
    // {
    //   lines: [ 'hi,', 'hello', 'hello there' ],
    //   action: () => {},
    // },
  ],
  listening: false,
}

const VoiceCommandQueue = writable(voiceCommandQueueTemplate)


//Adds a voice regognition entry with action and returns a delete function
export function addVoiceCommand( lines, action ) {
  let listening
  let command = {
    lines: lines,
    action: action,
  }
  VoiceCommandQueue.update( queue => {
    listening = queue.listening
    queue.commands.push(command)
    // Set the grammar list here later
    return queue
  })

  if (!listening) {
    listen()
  }

  return () => { deleteCommand(command) }
}

function deleteCommand(command) {
  VoiceCommandQueue.update( queue => {
    //Remove the entry from commands (not sure if want to keep it like this)
    const index = queue.commands.indexOf(command);
    if (index > -1) { // only splice array when item is found
      queue.commands.splice(index, 1); // 2nd parameter means remove one item only
    }
    return queue
  })
}

function matchCommand(text) {
  let match = undefined

  VoiceCommandQueue.update( queue => {
    queue.commands.forEach( command => {
      command.lines.forEach( line => {
        if ( text == line.toLowerCase() ) {
          match = command
        }
      })
    })
    return queue
  })

  if (match != undefined) {
    match.action()
    deleteCommand(match)
  }
}

function listen() {
  VoiceCommandQueue.update( queue => {
    queue.listening = true
    return queue
  }) 

  console.log('Listening voice commands');
  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
  const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

  // const colors = [
  //   "aqua",
  //   "azure",
  //   "beige",
  //   "bisque",
  //   "black",
  //   "blue",
  //   "brown",
  //   "chocolate",
  //   "coral" /* … */,
  // ];
  // const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
  //   " | "
  // )};`;

  // const speechRecognitionList = new SpeechGrammarList();
  // speechRecognitionList.addFromString(grammar, 1);
  // recognition.grammars = speechRecognitionList;
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    console.log('Command: ', command);
    console.log(`Confidence: ${event.results[0][0].confidence}`);
    matchCommand( command )
  };

  recognition.onspeechend = () => {
    recognition.stop();
    listen()
  };

  recognition.onnomatch = (event) => {
      console.log('Word not recognized');
  };

  recognition.onerror = (event) => {
    console.log(`Error occurred in recognition: ${event.error}`);
    listen()
  };
}