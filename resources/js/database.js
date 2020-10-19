
  var database, ref, storage, storageRef;

  function initializeDatabase(){
    var firebaseConfig = {
      apiKey: "AIzaSyDfys0q2MQFLF9CvahsDrbg-vOtXk54aPM",
      authDomain: "bagilexa.firebaseapp.com",
      databaseURL: "https://bagilexa.firebaseio.com",
      projectId: "bagilexa",
      storageBucket: "bagilexa.appspot.com",
      messagingSenderId: "95550583293",
      appId: "1:95550583293:web:754f7859a47bee0126a994",
      measurementId: "G-29R69WJSY6",
    };

    firebase.initializeApp(firebaseConfig);
    storage = firebase.storage();
    database = firebase.database();
    //storage = require('@google-cloud/storage');
    
  }

  function createDBReference(reference){
    ref = database.ref(reference);
  }

  function pushDataToDB(data){
    ref.push(data);
  }

  function createStorageReference(reference){
    storageRef = storage.ref(reference);
  }

  function pushAudioToStorage(file){
    storageRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }

  class Database{

    initDatabase(){
      return initializeDatabase();
    }

    addDBReference(reference){
      return createDBReference(reference);
    }

    pushData(data){
      return pushDataToDB(data);
    }

    getReference(){
      return ref;
    }

    addStorageReference(reference){
      return createStorageReference(reference);
    }

    pushAudio(file){
      return pushAudioToStorage(file);
    }

}

export default new Database();
