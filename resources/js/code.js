/*eslint-env browser */

var audioChunks, isplaying, startButton, stopButton, nextButton, 
recognition, mediaRecorder, soundClips, downloadButton, audioArray = [];

function init(){
  startButton = document.getElementById("speakButton");
  stopButton = document.getElementById("stopButton");
  nextButton = document.getElementById("nextButton");
  soundClips = document.querySelector(".soundClips");
    
  //stopButton.addEventListener("click", stopRecording);
  initMediaRecorder();
  initSpeechRecorder();
  stopButton.disabled = true;
 
  /*navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    mediaRecorder = new MediaRecorder(stream);});
    
   /* navigator.mediaDevices.getUserMedia({ audio: true })
    .then(successCallback)
    .catch(failureCallback);*/
}

function initSpeechRecorder(){
  var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.onstart = function() {
  console.log("We are listening. Try speaking into the microphone.");
  };

  recognition.onspeechend = function() {
  // when user is done speaking
  
  };
            
  // This runs when the speech recognition service returns result
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
  //console.log(transcript + confidence+100);
  };
}

function initMediaRecorder(){
  if (navigator.mediaDevices.getUserMedia) {
  
    const constraints = { audio: true };
    let chunks = [],
  
    onSuccess = function(stream) {
      const mediaRecorder = new MediaRecorder(stream);
  
      startButton.onclick = function() {
        
        mediaRecorder.start();
        recognition.start();
        console.log("recorder started");
  
        stopButton.disabled = false;
        startButton.disabled = true;
      };
  
      stopButton.onclick = function() {
        mediaRecorder.stop();
        recognition.stop();
        console.log("recorder stopped");

        // mediaRecorder.requestData();
  
        stopButton.disabled = true;
        startButton.disabled = false;
      };

      nextButton.onclick = function(e) {
        console.log("data available after MediaRecorder.stop() called.");
  
        const clipName = prompt("Gib bitte einen Namen für deinen Clip ein","Unbenannt"),
  
        clipContainer = document.createElement("article"),
        clipLabel = document.createElement("p"),
        audio = document.createElement("audio");
  
        clipContainer.classList.add("clip");
        audio.setAttribute("id", "controls", "");
        audio.id = "audioID";
  
        if(clipName === null) {
          clipLabel.textContent = 'Unbenannt';
        } else {
          clipLabel.textContent = clipName;
        }
  
        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        soundClips.appendChild(clipContainer);
        console.log(soundClips);
        
        downloadButton.classList.remove("hidden");
        audio.controls = true;
        const blob = new Blob(chunks, { "type" : "audio/wav"});
        //ogg; codecs=opus'
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        audioArray.push(audioURL);

        console.log(audioArray);
  
        clipLabel.onclick = function() {
          const existingName = clipLabel.textContent;
          const newClipName = prompt("Gib einen neuen Namen für deinen Clip ein.");
          if(newClipName === null) {
            clipLabel.textContent = existingName;
          } else {
            clipLabel.textContent = newClipName;
          }
        }
      }
  
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }
    }
  
    let onError = function(err) {
      console.log('The following error occured: ' + err);
    }
  
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  
  } else {
     console.log('getUserMedia not supported on your browser!');
}
}

//STAND: Man kann alle audiofiles theoretisch nacheinander herunterladen, aber evtl kann ich zip daheim runterladen

function downloadFiles(){
  var link,i;
  for(i = 0; i < audioArray.length; i++){
    link = document.createElement("a");
    link.style.display ="none";
    link.href = audioArray[i];
    link.download = "audioClip"; //"audioSample.wav";
  link.innerHTML = "Click here to download the file";
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
  //
  window.onload = function(){
    var zip = new JSZip();
    zip.add("helleo");

  }



}
//happens when the Talk To Me Button is clicked

function nextQuestion(){
  
    mediaRecorder.start();
    audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    
    
    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    });
  
}

function stopRecording(){
  mediaRecorder.stop();
}

/*function successCallback(){
var audioContext = new (window.AudioContext || window.webkitAudioContext)(),
// Create a source from our MediaStream
source = audioContext.createMediaStreamSource(mediaStream),
// Now create a Javascript processing node with the following parameters:
// 4096 = bufferSize (See notes below)
// 2 = numberOfInputChannels (i.e. Stereo input)
// 2 = numberOfOutputChannels (i.e. Stereo output)
node = audioContext.createScriptProcessor(4096, 2, 2);
node.onaudioprocess = function(data) {
    console.log(data);
}
// Connect the microphone to the script processor
source.connect(node);
node.connect(audioContext.destination);

}*/

init();