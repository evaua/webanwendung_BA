import database from "./database.js";

class demographicsApp {
    
    fillDatabase(){
        var age = document.getElementById("age").value,
        experience = document.getElementById("experience").value,
        profession = document.getElementById("profession").value,
        gender = document.getElementById("gender").value,
        id = document.getElementById("userID").innerHTML,
        data = {
            _id: id,
            _age: age,
            _gender: gender,
            _profession: profession,
            _experience: experience,
        };
        console.log(database);
        database.addDBReference("demographics");
        database.pushData(data);
    }

    checkIfDataIsComplete(){
        var age = document.getElementById("age").value,
        profession = document.getElementById("profession").value;
        if(age === "" || profession === ""){
            return false;
        }
        return true;
    }
}

export default new demographicsApp();