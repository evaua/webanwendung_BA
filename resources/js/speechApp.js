import database from "./database.js";

var audioChunks,
mediaRecorder,
audioArray =[];
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia() 
var rec;
//Recorder.js object 
var input;
//var AudioContext = window.AudioContext || window.webkitAudioContext;
//var audioContext = new AudioContext;

/*function startRecording(){
  var constraints = {
    audio: true,
    video: false,
  } 
  
  /* We're using the standard promise based getUserMedia()
  
  https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
    /* assign to gumStream for later use 
    gumStream = stream;
    /* use the stream 
    input = audioContext.createMediaStreamSource(stream);
    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size 
    rec = new Recorder(input, {
        numChannels: 1
    }) 
    //start the recording process 
    rec.record();
    console.log("Recording started");
  }).catch(function(err) {
    //enable the record button if getUserMedia() fails 
  
  });
  }*/

  /*function initMediaRecorder(){
    var micButton = document.getElementById("microphone"),
    stopButton = document.getElementById("stopButton"),
    redordedAudio = document.getElementById("recordedAudio");
        if (navigator.mediaDevices.getUserMedia) {
        
          const constraints = { audio: true };
          let chunks = [],
        
          onSuccess = function(stream) {
            mediaRecorder = new MediaRecorder(stream);
        
            micButton.onclick = function() {
              
              mediaRecorder.start();
              //recognition.start();
              console.log("recorder started");
        
            };
        
            /*stopButton.onclick = function() {
              mediaRecorder.stop();
              recognition.stop();
              console.log("recorder stopped");
      
              // mediaRecorder.requestData();
        
              stopButton.disabled = true;
              startButton.disabled = false;
            };
      
            stopButton.onclick = function(e) {
              console.log("data available after MediaRecorder.stop() called.");
              mediaRecorder.stop();
        
              const clipContainer = document.createElement("article"),
              clipLabel = document.createElement("p"),
              audio = document.createElement("audio");
        
              clipContainer.classList.add("clip");
              audio.setAttribute("id", "controls", "");
              audio.id = "audioID";
        
              
              clipLabel.textContent = document.getElementById("heading").innerHTML;
              
        
              clipContainer.appendChild(audio);
              clipContainer.appendChild(clipLabel);
              redordedAudio.appendChild(clipContainer);
              
              
              audio.controls = true;
              const blob = new Blob(chunks, { "type" : "audio/wav"});
              //ogg; codecs=opus'
              chunks = [];
              const audioURL = window.URL.createObjectURL(blob);
              audio.src = audioURL;
              audioArray.push(audioURL);
              
              console.log(audioArray);
              uploadToStorage(blob);
          
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

      function uploadToStorage(blob){
          console.log("jumped in upload storage");
          database.addStorageReference(document.getElementById("heading").innerHTML);
          //database.pushAudio(blob);
      }*/
function startRecording2(){
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
    audioChunks.push(event.data);
    console.log(audioChunks);
    });

    var stopButton = document.getElementById("stopButton");
    stopButton.addEventListener("click", () =>{
      mediaRecorder.stop();
      console.log(audioChunks);
      console.log(audioChunks[0]);
      const audioBlob = new Blob(audioChunks, { 'type': 'audio/mp3' }),
      audioUrl = URL.createObjectURL(audioBlob),
      audio = new Audio (audioUrl);
      console.log(audioBlob);
      database.addStorageReference(document.getElementById("heading").innerHTML);
      database.pushAudio(audioChunks);
    });
});
}  

//evtl hier https://medium.com/google-developers/make-audio-recordings-with-actions-on-google-3094158c2a2d






class speechApp {

    initMic(){
        //initMediaRecorder();
        //this.initSpeechRecorder();
        var micButton = document.getElementById("microphone");
        //stopButton = document.getElementById("stopButton");
        micButton.addEventListener("click", startRecording2());
        //stopButton.addEventListener("click", stopRecording());

    }
  }

  export default new speechApp();
    /* Simple constraints object, for more advanced audio features see
  }
https://addpipe.com/blog/audio-constraints-getusermedia/ */

  /*stopRecording() {
  
  //disable the stop button, enable the record too allow for new recordings 
  
  //reset button just in case the recording is stopped while paused 
  //tell the recorder to stop the recording 
  rec.stop(); //stop microphone access 
  gumStream.getAudioTracks()[0].stop();
  //create the wav blob and pass it on to createDownloadLink 
  //rec.exportWAV(createDownloadLink);
  this.uploadToStorage();
}

uploadToStorage(){
  var clipContainer = document.createElement("article"),
  clipLabel = document.createElement("p"),
  audio = document.createElement("audio"),
  chunks;
        
  clipContainer.classList.add("clip");
  audio.setAttribute("id", "controls", "");
  audio.id = "audioID";

  clipLabel.textContent = document.getElementById("heading").innerHTML;

  clipContainer.appendChild(audio);
  clipContainer.appendChild(clipLabel);
  //soundClips.appendChild(clipContainer);
  //console.log(soundClips);
  
  audio.controls = true;
              

  const blob = new Blob(chunks, { "type" : "audio/wav"});
              //ogg; codecs=opus'
              chunks = [];
              const audioURL = window.URL.createObjectURL(blob);
              audio.src = audioURL;
              audioArray.push(audioURL);
  database.addStorageReference(document.getElementById("heading").innerHTML);
  database.pushAudio(blob);
  /*var url = URL.createObjectURL(blob),
  audio = document.createElement("audio"),
  li = document.createElement("li"),
  link = document.createElement("a");

  audio.controls = true;
  audio.src = url;

  link.href = url;
  link.download = document.getElementById("heading").innerHTML + ".wav";
  link.innerHTML = link.download;

  li.appendChild(audio);
  li.appendChild(link);
}
}*/




    //https://blog.addpipe.com/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site/
    
  /*  initSpeechRecorder(){
        var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        /*recognition.onstart = function() {
        console.log("We are listening. Try speaking into the microphone.");
        };
      
        recognition.onspeechend = function() {
        mediaRecorder.stop();
        this.saveData();
        };
                  
        // This runs when the speech recognition service returns result
        /*recognition.onresult = function(event) {
          var transcript = event.results[0][0].transcript;
        //console.log(transcript + confidence+100);
        };
      }

    initMediaRecorder(){
        var micButton = document.getElementById("microphone");
        if (navigator.mediaDevices.getUserMedia) {
        
          const constraints = { audio: true };
          let chunks = [],
        
          onSuccess = function(stream) {
            mediaRecorder = new MediaRecorder(stream);
        
            micButton.onclick = function() {
              
              mediaRecorder.start();
              //recognition.start();
              console.log("recorder started");
        
            };
        
            /*stopButton.onclick = function() {
              mediaRecorder.stop();
              recognition.stop();
              console.log("recorder stopped");
      
              // mediaRecorder.requestData();
        
              stopButton.disabled = true;
              startButton.disabled = false;
            };*/
      
            /*nextButton.onclick = function(e) {
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

    /*saveData(){
      //const clipName = prompt("Gib bitte einen Namen für deinen Clip ein","Unbenannt"),
        
      var clipContainer = document.createElement("article"),
      clipLabel = document.createElement("p"),
      audio = document.createElement("audio");

      clipContainer.classList.add("clip");
      audio.setAttribute("id", "controls", "");
      audio.id = "audioID";

      /*if(clipName === null) {
        clipLabel.textContent = 'Unbenannt';
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      soundClips.appendChild(clipContainer);
      console.log(soundClips);
      
      //downloadButton.classList.remove("hidden");
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
    }

    checkIfDataIsComplete(){
      
    }*/


