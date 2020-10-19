import database from "./database.js";

class surveyApp {
    
    fillDatabase(){
        var use = document.getElementById("use").value,
        difficulty = document.getElementById("difficulty").value,
        data = {
            _use: use,
            _difficulty: difficulty,
        },
        heading = document.getElementById("heading").innerHTML;
        console.log(database);
        database.addDBReference("Survey " + heading);
        //var ref = database.ref("demographics");
        database.pushData(data);
        //database.ref.push(data);
        console.log(firebase);
        /*if(age === null && experience == null){
        startNextSzenario();
        } else{
            alert("Sie haben noch nicht alles ausgefüllt!");
        }*/
    }

    checkIfDataIsComplete(){
        var age = document.getElementById("age").value;
        if(age === ""){
            return false;
        }
        return true;
    }
}

export default new surveyApp();