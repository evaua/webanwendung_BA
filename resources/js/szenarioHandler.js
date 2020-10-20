import Szenario from "./Szenario.js";
import Config from "./Config.js";
import recorder from "./recorderApp.js";
import surveyPage from "./surveyApp.js";

var textLayout = document.getElementById("szenarien"),
heading = document.getElementById("heading"),
nextButton = document.getElementById("nextButton"),
speechRecorderLayout = speechRecorderLayout = document.getElementById("speechRecorder"),
avatar = document.querySelector(".container"),
buddysAnswer = document.getElementById("buddyAnswer"),
surveyLayout = document.getElementById("surveyForm"),
counter = -1,

szenario1 = new Szenario(1, Config.HEADING_1, Config.SZENARIO_1, Config.HEADING2_1, Config.ANSWER_1, Config.HEADING3_1),
szenario2 = new Szenario(2, Config.HEADING_2, Config.SZENARIO_2, Config.HEADING2_2, Config.ANSWER_2, Config.HEADING3_2),

szenarioArray = [szenario1, szenario2];

/*function nextButtonClicked(){
    counter++;
}*/

function startSpeechRecorder(){
    nextButton.removeEventListener("click", startSpeechRecorder);
    console.log(nextButton);
    textLayout.classList.add("hidden");
    speechRecorderLayout.classList.remove("hidden");
    heading.innerHTML = szenarioArray[0].heading2;
    nextButton.addEventListener("click", startSurveyPage);
    console.log("bin in der start Speech");
    console.log(nextButton);
    recorder.initRecorder(); 
}

function startSurveyPage(){
    nextButton.removeEventListener("click", startSurveyPage);
    speechRecorderLayout.classList.add("hidden");
    avatar.classList.add("hidden");
    surveyLayout.classList.remove("hidden");
    heading.innerHTML = szenarioArray[0].heading3;
    console.log("bin in der startSurveyPage");
    nextButton.addEventListener("click", openSzenario);
}

function openSzenario(){
    console.log("bin in der openSzenario");
    if(heading.innerHTML === szenarioArray[0].heading3){
        surveyLayout.classList.add("hidden");
        nextButton.removeEventListener("click", openSzenario);
        if(surveyPage.checkIfDataIsComplete() === true){
            surveyPage.fillDatabase();
            szenarioArray.shift();
            console.log(szenarioArray);
        }else{
            alert("Du hast noch nicht alles ausgefüllt!");
        }
    }
        
    if(szenarioArray.length > 0){
        console.log("bin jetzt in der while schleife");
        textLayout.classList.remove("hidden");
        console.log(szenarioArray);
        textLayout.innerHTML = szenarioArray[0].description;            
        heading.innerHTML = szenarioArray[0].heading;
        nextButton.addEventListener("click", startSpeechRecorder);
        console.log(nextButton);
        }else{
            textLayout.classList.remove("hidden");
            surveyLayout.classList.add("hidden");
            nextButton.classList.add("hidden");
            heading.innerHTML = Config.HEADING_END;
            textLayout.innerHTML = Config.PARAGRAPH_END;
        }
}

function setBuddyAnswer(){
    avatar.classList.remove("hidden");
    buddysAnswer.innerHTML = szenarioArray[0].answer;
}

class szenarioHandler{
    
    openSzenario(){
        return openSzenario();
    }

    setAnswer(){
        return setBuddyAnswer();
    }
    
}

export default new szenarioHandler();