import demographicsPage from "./demographicApp.js";
import database from "./database.js";
import szenarioHandler from "./szenarioHandler.js";

var counterNextButton = 0, textLayout, demographicsLayout, heading, checkBox, gender, progress;

function init(){
    var nextButton = document.getElementById("nextButton");
    textLayout = document.getElementById("szenarien");
    checkBox = document.querySelector(".form-check");
    demographicsLayout = document.getElementById("demographicsForm");
    heading = document.getElementById("heading");
    nextButton.addEventListener("click", nextButtonClicked);
    database.initDatabase();
    createUserId();
}

function nextButtonClicked(){
    counterNextButton++;

    if(counterNextButton === 1){
        progress = document.getElementById("progress");
        progress.innerHTML = "2/35";
        if(document.getElementById("informedConsent").checked){
        textLayout.classList.add("hidden");
        checkBox.classList.add("hidden");
        demographicsLayout.classList.remove("hidden");
        heading.innerHTML = "Demografischer Fragebogen";
        gender = document.getElementById("gender");
        gender.addEventListener("change", function(){
            if(gender.value === "Weiteres:"){
                document.getElementById("genderInput").classList.remove("hidden");
            }
        });
        } else{
            alert("Bitte betätige, dass du die Einverständniserklärung gelesen hast.");
            counterNextButton--;
        }
    }
    if(counterNextButton === 2){
        progress.innerHTML = "3/35";
        if(demographicsPage.checkIfDataIsComplete() === true){
            demographicsPage.fillDatabase();
            demographicsLayout.classList.add("hidden");
            szenarioHandler.openSzenario();
            } else{
                alert("Du hast noch nicht alles ausgefüllt!");
                counterNextButton--;
            }
    }
}

function createUserId(){
    var userId = document.getElementById("userID");
    userId.innerHTML = Math.floor((Math.random() * 1000000000) + 1);
    console.log(userId);
}

init();