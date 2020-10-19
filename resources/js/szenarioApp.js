function init(){
    var nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", nextButtonClicked);
}

function nextButtonClicked(){
    //Informationen des Fragebogens müssen im Server gespeichert werden
    //Szenario 1 muss starten
    startNextSzenario();
}

function startNextSzenario(){
    console.log("Link wird gedrückt");
    location.replace("speech_page.html");
}

init();