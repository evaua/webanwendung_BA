import database from "./database.js";

class surveyApp {
    
    fillDatabase(szenarioId){
        var use = document.getElementById("use").value,
        sense = document.getElementById("sense").value,
        frequency = document.getElementById("frequency").value,
        speed = document.getElementById("speed").value,
        id = document.getElementById("userID").innerHTML,
        data = {
            _id: id,
            _use: use,
            _sense: sense,
            _frequency: frequency,
            _speed: speed,
        };
  
        database.addDBReference("Survey " + szenarioId);
        database.pushData(data);
    }

    fillDatabaseFinal(){
        var use = document.getElementById("use-final").value,
        difficulty = document.getElementById("difficulty-final").value,
        german = document.getElementById("speech-german").value,
        dialect = document.getElementById("speech-dialect").value,
        reason = document.getElementById("reason").value,
        concern = document.getElementById("concern").value,
        tasks = document.getElementById("moreTasks").value,
        id = document.getElementById("userID").innerHTML,
        data ={
            _id: id,
            _use: use,
            _difficulty: difficulty,
            _german: german,
            _dialect: dialect,
            _reason: reason,
            _concern: concern,
            _tasks: tasks,
        };
        database.addDBReference("FinalSurvey");
        database.pushData(data);
    }

    checkIfDataIsComplete(){
        return true;
    }
}

export default new surveyApp();