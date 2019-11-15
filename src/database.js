"use strict";

/**
 * Klasse Database: Kümmert sich um die Datenhaltung der App
 *
 * Diese Klasse beinhaltet alle Datensätze der App. Entgegen dem Namen handelt
 * es sich nicht wirklich um eine Datenbank, da sie lediglich ein paar statische
 * Testdaten enthält. Ausgefeilte Methoden zum Durchsuchen, Ändern oder Löschen
 * der Daten fehlen komplett, könnten aber in einer echten Anwendung relativ
 * einfach hinzugefügt werden.
 */
class Database {
    /**
     * Konstruktor.
     */
    constructor() {

        var firebaseConfig = {
          apiKey: "AIzaSyBuGbXAmDXxdy1FYuyyRihscRUeOOfMvmo",
          authDomain: "irgendwas-mit-tieren-webprog.firebaseapp.com",
          databaseURL: "https://irgendwas-mit-tieren-webprog.firebaseio.com",
          projectId: "irgendwas-mit-tieren-webprog",
          storageBucket: "irgendwas-mit-tieren-webprog.appspot.com",
          messagingSenderId: "427713729504",
          appId: "1:427713729504:web:da1fd0277ec757edad1185"
        };

        firebase.initializeApp(firebaseConfig);
        this._db = firebase.firestore();
        this._animals = this._db.collection("animals");
    }

    /**
     * Diese Methode sucht einen Datensazt anhand seiner ID in der Datenbank
     * und liefert den ersten, gefundenen Treffer zurück.
     *
     * @param  {Number} id Datensatz-ID
     * @return {Object} Gefundener Datensatz
     */
    async getRecordById(id) {

        let result = await this._animals.doc(id).get();
        return result.data();
    }

    /**
     * Diese Methode gibt eine Liste mit allen Datensätzen zurück.
     * @return {Array} Liste aller Datensätze
     */
    async getAllRecords() {
      let result = await this._animals.get();
      let animals = [];

      result.forEach(entry => {
          let animal = entry.data();
          animal.id = entry.id;
          animals.push(animal);
      });

      return animals;
    }

    // Neues Tier in DB speichern
    saveNewAnimal(newAnimal) {
      return this._animals.add(newAnimal);
    }


}
