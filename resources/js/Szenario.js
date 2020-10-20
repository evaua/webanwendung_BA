class Szenario {

    constructor(id, heading, description, heading2, answer, heading3) {
      this.id = id;
      this.description = description || "So sieht die Aufgabe aus";
      this.heading = heading || "Szenario 1";
      this.heading2 = heading2 || "Wie lautet dein Sprachbefehl für Szenario 1?";
      this.heading3 = heading3 || "Wie fandest du Szenario 1?";
      this.answer = answer || "So lautet meine Antwort";
    }
  
    setDescription(description) {
      this.description = description;
    }
  
    static fromObject(obj) {
      return new Szenario(obj.description, obj.id, obj.heading, obj.heading2, obj.answer, obj.heading3);
    }
  
  }
  
  export default Szenario;