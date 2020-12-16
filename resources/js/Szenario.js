class Szenario {

    constructor(id, description, answer) {
      this.id = id;
      this.description = description || "So sieht die Aufgabe aus";
      this.answer = answer || "So lautet meine Antwort";
    }
  
    setDescription(description) {
      this.description = description;
    }
  
    static fromObject(obj) {
      return new Szenario(obj.description, obj.id, obj.answer);
    }
  
  }
  
  export default Szenario;