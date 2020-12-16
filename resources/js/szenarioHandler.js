import Szenario from "./Szenario.js";
import Config from "./Config.js";
import surveyPage from "./surveyApp.js";
import mic from "./speechApp.js";
import recorderApp from "./recorderApp.js";

var textLayout = document.getElementById("szenarien"),
heading = document.getElementById("heading"),
nextButton = document.getElementById("nextButton"),
speechRecorderLayout = speechRecorderLayout = document.getElementById("speechRecorder"),
avatar = document.querySelector(".container"),
buddysAnswer = document.getElementById("buddyAnswer"),
surveyLayout = document.getElementById("surveyForm"),
finalSurveyLayout = document.getElementById("finalSurveyForm"),
finalSurveyLayout2 = document.getElementById("finalSurveyForm2"),
modal = document.getElementById("myModal"),
modalText = document.getElementById("modalText"),
span = document.getElementsByClassName("close")[0],
modalButton = document.getElementById("modalButton"),
progress = document.getElementById("progress"),
counter = 2,

szenario1 = new Szenario(1, Config.SZENARIO_1, Config.ANSWER_1),
szenario2 = new Szenario(2, Config.SZENARIO_2, Config.ANSWER_2),
szenario3 = new Szenario(3, Config.SZENARIO_3, Config.ANSWER_3),
szenario4 = new Szenario(4, Config.SZENARIO_4, Config.ANSWER_4),
szenario5 = new Szenario(5, Config.SZENARIO_5, Config.ANSWER_5),
szenario6 = new Szenario(6, Config.SZENARIO_6, Config.ANSWER_6),
szenario7 = new Szenario(7, Config.SZENARIO_7, Config.ANSWER_7),
szenario8 = new Szenario(8, Config.SZENARIO_8, Config.ANSWER_8),
szenario9 = new Szenario(9, Config.SZENARIO_9, Config.ANSWER_9),
szenario10 = new Szenario(10, Config.SZENARIO_10, Config.ANSWER_10),

szenarioArray = [szenario1, szenario2, szenario3, szenario4,szenario5, szenario6, szenario7, szenario8, szenario9, szenario10],
headings1 = [Config.HEADING_1, Config.HEADING_2, Config.HEADING_3, Config.HEADING_4, Config.HEADING_5, Config.HEADING_6, Config.HEADING_7, Config.HEADING_8, Config.HEADING_9, Config.HEADING_10],
headings2 = [Config.HEADING2_1, Config.HEADING2_2, Config.HEADING2_3, Config.HEADING2_4, Config.HEADING2_5, Config.HEADING2_6, Config.HEADING2_7, Config.HEADING2_8, Config.HEADING2_9, Config.HEADING2_10],
headings3 = [Config.HEADING3_1, Config.HEADING3_2, Config.HEADING3_3, Config.HEADING3_4, Config.HEADING3_5, Config.HEADING3_6, Config.HEADING3_7, Config.HEADING3_8, Config.HEADING3_9, Config.HEADING3_10];

function startSpeechRecorder(){
    counter++;
    progress.innerHTML = counter + "/35";
    if(headings1[0] === Config.HEADING_1){
        modalText.innerHTML = Config.DESCRIPTION_SPEECH_PAGE;
        modal.style.display = "block";
    }
    nextButton.removeEventListener("click", startSpeechRecorder);
    console.log(nextButton);
    textLayout.classList.add("hidden");
    speechRecorderLayout.classList.remove("hidden");
    heading.innerHTML = headings2[0];
    nextButton.addEventListener("click", startSurveyPage);
    console.log("bin in der start Speech");
    console.log(nextButton);
    mic.initMic(szenarioArray[0].id);
    //recorderApp.initRecorder(szenarioArray[0].id);
}

function startSurveyPage(){
    counter++;
    progress.innerHTML = counter + "/35";
    if(headings1[0] === Config.HEADING_1){
        modalText.innerHTML = Config.DESCRIPTION_SURVEY_PAGE;
        modal.style.display = "block";
    }
    nextButton.removeEventListener("click", startSurveyPage);
    speechRecorderLayout.classList.add("hidden");
    avatar.classList.add("hidden");
    surveyLayout.classList.remove("hidden");
    document.getElementById("sense").value = "Bitte auswählen";
    document.getElementById("frequency").value = "Bitte auswählen";
    document.getElementById("speed").value = "Bitte auswählen";
    document.getElementById("use").value = "Bitte auswählen";
    heading.innerHTML = headings3[0];
    console.log("bin in der startSurveyPage");
    nextButton.addEventListener("click", openSzenario);
}

function openSzenario(){
    counter++;
    progress.innerHTML = counter + "/35";
    console.log("bin in der openSzenario");
    console.log(szenarioArray);
    if(heading.innerHTML === headings3[0]){
        surveyLayout.classList.add("hidden");
        nextButton.removeEventListener("click", openSzenario);
        if(surveyPage.checkIfDataIsComplete() === true){
            surveyPage.fillDatabase(szenarioArray[0].id);
            shiftArrays();
        }else{
            alert("Du hast noch nicht alles ausgefüllt!");
        }
    }

    if(headings1[0] === Config.HEADING_1){
        modalText.innerHTML = Config.DESCRIPTION_SZENARIO_PAGE;
        modal.style.display = "block";
        span.addEventListener("click", closeModal);
        modalButton.addEventListener("click", closeModal);
    }

    if(headings1[0] === Config.HEADING_2){
        modalText.innerHTML = Config.DESCRIPTION_NEXT_SZENARIEN;
        modal.style.display = "block";
    }
        
    if(headings1.length >0){
        console.log("bin jetzt in der while schleife");
        textLayout.classList.remove("hidden");
        console.log(szenarioArray);
        textLayout.innerHTML = szenarioArray[0].description;
        heading.innerHTML = headings1[0];
        console.log(headings1[0]);
        nextButton.addEventListener("click", startSpeechRecorder);
        console.log(nextButton);
        }else{
            finalSurveyLayout.classList.remove("hidden");
            surveyLayout.classList.add("hidden");
            heading.innerHTML = Config.HEADING_FINALSURVEY;
            nextButton.addEventListener("click", openFinalSurveyPage2);
        }
}

function setBuddyAnswer(){
    avatar.classList.remove("hidden");
    buddysAnswer.innerHTML = szenarioArray[0].answer;
}

function closeModal(){
    modal.style.display = "none";
}

function openFinalSurveyPage2(){
    counter++;
    progress.innerHTML = counter + "/35";
    nextButton.removeEventListener("click", openFinalSurveyPage2);
    finalSurveyLayout.classList.add("hidden");
    finalSurveyLayout2.classList.remove("hidden");
    heading.innerHTML = "";
    nextButton.addEventListener("click", openEndPage);
}

function openEndPage(){
    counter++;
    progress.innerHTML = counter + "/35";
    textLayout.classList.remove("hidden");
    finalSurveyLayout2.classList.add("hidden");
    nextButton.classList.add("hidden");
    document.getElementById("gif").classList.remove("hidden");
    surveyPage.fillDatabaseFinal();
    heading.innerHTML = Config.HEADING_END;
    textLayout.innerHTML = Config.PARAGRAPH_END;
}

function shiftArrays(){
    headings1.shift();
    headings2.shift();
    headings3.shift();
    szenarioArray.shift();
}

function randomiseArray(array){
    array.sort(() => Math.random() - 0.5);
    return array;
}

class szenarioHandler{
    
    openSzenario(){
        randomiseArray(szenarioArray);
        return openSzenario();
    }

    setAnswer(){
        return setBuddyAnswer();
    }
    
}

export default new szenarioHandler();