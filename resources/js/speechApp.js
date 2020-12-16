import database from "./database.js";
import szenarioHandler from "./szenarioHandler.js";

var audioChunks,
mediaRecorder,
id,
micButton, nextButton, waveform;
URL = window.URL || window.webkitURL;

function startRecording(){

  micButton.removeEventListener("click", startRecording);
    micButton.addEventListener("click", stopRecording);

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    var constraints ={
      audio: true,
      video: false,
    };
  
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      waveform = document.getElementById("bars");
        waveform.classList.remove("hidden");
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = e => {
      audioChunks.push(e.data);
      if(mediaRecorder.state === "inactive"){
        const blob = new Blob(audioChunks, {type:"audio/webm"});
        database.addStorageReference("Szenario " + id + " NutzerID " + document.getElementById("userID").innerHTML);
        database.pushAudio(blob);
      }
    };
    mediaRecorder.start();
  });
  }
}

function stopRecording(){
    mediaRecorder.stop();
    waveform.classList.add("hidden");
    micButton.disabled = true;
    micButton.removeEventListener("click", stopRecording);
    nextButton.disabled = false;
    szenarioHandler.setAnswer();
}

// https://medium.com/google-developers/make-audio-recordings-with-actions-on-google-3094158c2a2d

class speechApp {

    initMic(szenarioID){
        id = szenarioID;
        micButton = document.getElementById("microphone");
        nextButton = document.getElementById("nextButton");
        micButton.addEventListener("click", startRecording);
        nextButton.disabled = true;
        if(micButton.disabled === true){
            micButton.disabled = false;
        }
    }
  }

export default new speechApp();