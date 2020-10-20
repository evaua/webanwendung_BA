import demographicsPage from "./demographicApp.js";
import database from "./database.js";
import Config from "./Config.js";
//import speechRecorder from "./speechApp.js";
import recorder from "./recorderApp.js";
import surveyPage from "./surveyApp.js";
import szenarioHandler from "./szenarioHandler.js";
import Szenario from "./Szenario.js";

var counterNextButton = 0, textLayout, demographicsLayout, speechRecorderLayout, surveyLayout, heading, buddysAnswer, szenario1;

function init(){
    var nextButton = document.getElementById("nextButton");
    textLayout = document.getElementById("szenarien");
    demographicsLayout = document.getElementById("demographicsForm");
    speechRecorderLayout = document.getElementById("speechRecorder");
    surveyLayout = document.getElementById("surveyForm");
    heading = document.getElementById("heading");
    buddysAnswer = document.querySelector(".container");
    nextButton.addEventListener("click", nextButtonClicked);
    textLayout.classList.remove("hidden");
    database.initDatabase();
}

function nextButtonClicked(){
    counterNextButton++;
    //Informationen des Fragebogens müssen im Server gespeichert werden
    //Szenario 1 muss starten
    if(counterNextButton === 1){
        textLayout.classList.add("hidden");
        demographicsLayout.classList.remove("hidden");
        heading.innerHTML = "Demografische Fragen";
    }
    if(counterNextButton === 2){
        if(demographicsPage.checkIfDataIsComplete() === true){
            demographicsPage.fillDatabase();
            demographicsLayout.classList.add("hidden");
            console.log("bin noch in index");
            szenarioHandler.openSzenario();
            } else{
                alert("Du hast noch nicht alles ausgefüllt!");
                counterNextButton--;
            }
    }
}

//funktioniert, ist aber relativ hart gecoded und man bräuchte etwa 25 if Abragen
/*function nextButtonClicked(){
    counterNextButton++;
    //Informationen des Fragebogens müssen im Server gespeichert werden
    //Szenario 1 muss starten
    if(counterNextButton === 1){
        textLayout.classList.add("hidden");
        demographicsLayout.classList.remove("hidden");
        heading.innerHTML = "Demografische Fragen";
    }
    if(counterNextButton === 2){
        openFirstSzenarioPage();
    }
    if(counterNextButton === 3){
        openSpeechPage();
        heading.innerHTML = Config.SPEECH_QUESTION + Config.HEADING_1 + "?";
    }
    if(counterNextButton === 4){
        openSurveyPage();
        heading.innerHTML = Config.SURVEY_QUESTION + Config.HEADING_1 + "?";
    }
    if(counterNextButton === 5){
        if(surveyPage.checkIfDataIsComplete() === true){
            surveyPage.fillDatabase();
            openNextSzenario();
            textLayout.innerHTML = Config.SZENARIO_2;
            heading.innerHTML = Config.HEADING_2;
        }else{
            alert("Du hast noch nicht alles ausgefüllt!");
            counterNextButton--;
        }
    }

function openFirstSzenarioPage(){
        if(demographicsPage.checkIfDataIsComplete() === true){
            demographicsPage.fillDatabase();
            demographicsLayout.classList.add("hidden");
            textLayout.classList.remove("hidden");
            textLayout.innerHTML = Config.SZENARIO_1;
            heading.innerHTML = Config.HEADING_1;
            } else{
                alert("Du hast noch nicht alles ausgefüllt!");
                counterNextButton--;
            }
    }

function openSpeechPage(){
        textLayout.classList.add("hidden");
        speechRecorderLayout.classList.remove("hidden");
        recorder.initRecorder(); 
    }

function openSurveyPage(){
        speechRecorderLayout.classList.add("hidden");
        buddysAnswer.classList.add("hidden");
        surveyLayout.classList.remove("hidden");
    }

function openNextSzenario(){
        surveyLayout.classList.add("hidden");
        textLayout.classList.remove("hidden");
    }
}*/

init();