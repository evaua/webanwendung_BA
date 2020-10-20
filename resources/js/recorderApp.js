import database from "./database.js";
import Config from "./Config.js";
import szenarioHandler from "./szenarioHandler.js";

//Code partially from: https://blog.addpipe.com/using-recorder-js-to-capture-wav-audio-in-your-html5-web-site
//Using this library: https://github.com/mattdiamond/Recorderjs


URL = window.URL || window.webkitURL;
var gumStream,
//stream from getUserMedia() 
rec,
//Recorder.js object 
input,
//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 
AudioContext = window.AudioContext || window.webkitAudioContext,
audioContext = new AudioContext,
nextButton, stopButton, micButton;

function startRecording(){
    /* Simple constraints object, for more advanced audio features see

https://addpipe.com/blog/audio-constraints-getusermedia/ */

    var constraints = {
        audio: true,
        video: false,
    } 
/* Disable the record button until we get a success or fail from getUserMedia() 

recordButton.disabled = true;
stopButton.disabled = false;*/
    micButton.disabled = true;
    stopButton.disabled = false;

/* We're using the standard promise based getUserMedia()

https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
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
        console.log("Recording started");
        //blinkMic();
    }).catch(function(err) {
    //enable the record button if getUserMedia() fails 
    /*recordButton.disabled = false;
    stopButton.disabled = true;
    pauseButton.disabled = true*/
        console.log("recording failed");
    });
    }

    /*function blinkMic(){
        setInterval(function() {
            micButton.style.color = (micButton.style.color == "lightBlue") ? "blue" : "lightBlue",;
        }, 500);
        
    }*/

    function stopRecording() {
        console.log("stopButton clicked");
        //disable the stop button, enable the record too allow for new recordings 
        /*stopButton.disabled = true;
        recordButton.disabled = false;
        pauseButton.disabled = true;*/
        micButton.disabled = true;
        stopButton.disabled = true;
        nextButton.disabled = false;
        szenarioHandler.setAnswer();
        
        
        

        //reset button just in case the recording is stopped while paused 
        /*pauseButton.innerHTML = "Pause";*/
        //tell the recorder to stop the recording 
        rec.stop(); //stop microphone access 
        gumStream.getAudioTracks()[0].stop();
        //create the wav blob and pass it on to createDownloadLink 
        rec.exportWAV(createDownloadLink);
        
    }
    
    function createDownloadLink(blob) {
        console.log(blob);
        database.addStorageReference(document.getElementById("heading").innerHTML + "hi");
        database.pushAudio(blob);
        /*var url = URL.createObjectURL(blob);
        var au = document.createElement('audio');
        var li = document.createElement('li');
        var link = document.createElement('a');
        //add controls to the <audio> element 
        au.controls = true;
        au.src = url;
        //link the a element to the blob 
        link.href = url;
        link.download = new Date().toISOString() + '.wav';
        link.innerHTML = link.download;
        //add the new audio and a elements to the li element 
        li.appendChild(au);
        li.appendChild(link);
        //add the li element to the ordered list 
        var recordingsList = document.getElementById("recordedAudio");
        recordingsList.appendChild(li);*/
    }

class RecorderApp{

    initRecorder(){
        micButton = document.getElementById("microphone");
        stopButton = document.getElementById("stopButton");
        nextButton = document.getElementById("nextButton");
        micButton.addEventListener("click", startRecording);
        stopButton.addEventListener("click", stopRecording);
        nextButton.disabled = true;
        stopButton.disabled = true;
        if(micButton.disabled === true){
            micButton.disabled = false;
        }
    }

}

export default new RecorderApp();