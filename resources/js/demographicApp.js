import database from "./database.js";

class demographicsApp {
    
    fillDatabase(){
        var age = document.getElementById("age").value,
        experience = document.getElementById("experience").value,
        data = {
            _age: age,
            _experience: experience,
        };
        console.log(database);
        database.addDBReference("demographics");
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

export default new demographicsApp();