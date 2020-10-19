var szenario1 = ["Szenario 1", "Das steht dann in deinem Szenario 1", "Wie lautet dein Sprachbefehl für Szenario 1?", 
"Wie fandest du Szenario 1?"],
textLayout = document.getElementById("szenarien"),
heading = document.getElementById("heading");

class szenarioHandler{
    
    openSzenario(szenarioNum){
        textLayout.classList.remove("hidden");
        textLayout.innerHTML = szenarioNum.description;
        heading.innerHTML = szenarioNum.heading;
    }
}

export default new szenarioHandler();