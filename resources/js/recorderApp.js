import database from "./database.js";
import szenarioHandler from "./szenarioHandler.js";

//Code partially from: https://blog.addpipe.com/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site
//Using this library: https://github.com/mattdiamond/Recorderjs

var gumStream,
id,
rec,
input,
waveform,
AudioContext = window.AudioContext || window.webkitAudioContext,
audioContext = new AudioContext,
nextButton, micButton;
URL = window.URL || window.webkitURL;

function startRecording(){

/*https://addpipe.com/blog/audio-constraints-getusermedia/ */
    var constraints = {
        audio: true,
        video: false,
    };
    
    micButton.removeEventListener("click", startRecording);
    micButton.addEventListener("click", stopRecording);

/* https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        waveform = document.getElementById("bars");
        waveform.classList.remove("hidden");
        console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
    /* assign to gumStream for later use */
        gumStream = stream;
    /* use the stream */
        input = audioContext.createMediaStreamSource(stream);
    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
        rec = new Recorder(input, {
        numChannels: 1,
        });
    //start the recording process 
        rec.record();
    }).catch(function(err) {
    //enable the record button if getUserMedia() fails 
        console.log("recording failed");
    });
    }

    function stopRecording() {
        micButton.disabled = true;
        micButton.removeEventListener("click", stopRecording);
        waveform.classList.add("hidden");
        nextButton.disabled = false;
        szenarioHandler.setAnswer();
        //tell the recorder to stop the recording 
        rec.stop(); //stop microphone access 
        gumStream.getAudioTracks()[0].stop();
        //create the wav blob and pass it on to createDownloadLink 
        rec.exportWAV(createDownloadLink);  
    }
    
    function createDownloadLink(blob) {
        console.log(blob);
        database.addStorageReference("Szenario " + id + " NutzerID " + document.getElementById("userID").innerHTML);
        database.pushAudio(blob);
    }

class RecorderApp{

    initRecorder(szenarioId){
        id = szenarioId;
        micButton = document.getElementById("microphone");
        nextButton = document.getElementById("nextButton");
        micButton.addEventListener("click", startRecording);
        nextButton.disabled = true;
        if(micButton.disabled === true){
            micButton.disabled = false;
        }
    }

}

export default new RecorderApp();