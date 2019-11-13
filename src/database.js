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
        // Your web app's Firebase configuration
        var firebaseConfig = {
          apiKey: "AIzaSyBuGbXAmDXxdy1FYuyyRihscRUeOOfMvmo",
          authDomain: "irgendwas-mit-tieren-webprog.firebaseapp.com",
          databaseURL: "https://irgendwas-mit-tieren-webprog.firebaseio.com",
          projectId: "irgendwas-mit-tieren-webprog",
          storageBucket: "irgendwas-mit-tieren-webprog.appspot.com",
          messagingSenderId: "427713729504",
          appId: "1:427713729504:web:da1fd0277ec757edad1185"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this._db = firebase.firestore();
        this._animals = this._db.collection("animals");

        /*this._data = [
            {
                id:          1,
                img:        "animals/1.jpg",
                name:       "Giraffe",
                klasse:     "Säugetier",
                gewicht:    "800kg",
                grösse:     "bis 6,1m",
                link:       "???",
            },{
                id:          2,
                img:        "animals/2.jpg",
                name:       "Blauwal",
                klasse:     "Säugetier",
                gewicht:    "150t",
                grösse:     "25m",
                link:       "https://de.wikipedia.org/wiki/Falado_von_Rhodos",
            },{
                id:          3,
                img:        "animals/3.jpg",
                name:       "Eichhörnchen",
                klasse:     "Säugetier",
                gewicht:    "330g",
                grösse:     "21cm",
                link:       "https://de.wikipedia.org/wiki/Gorch_Fock_(Schiff,_1958)",
            },{
                id:          4,
                img:        "animals/4.jpg",
                name:       "Hund",
                tklasse:    "Säugetier",
                gewicht:    "34kg",
                grösse:     "61cm",
                link:       "https://de.wikipedia.org/wiki/Mare_Frisium",
            },{
                id:          5,
                img:        "animals/5.jpg",
                name:       "Katze",
                klasse:     "Säugetier",
                gewicht:    "4,5kg",
                grösse:     "25cm",
                link:       "https://de.wikipedia.org/wiki/Preu%C3%9Fen_(Schiff,_1902)",
            },{
                id:          6,
                img:        "animals/6.jpg",
                name:       "Maus",
                klasse:     "Säugetier",
                gewicht:    "19g",
                grösse:     "11cm",
                link:       "https://de.wikipedia.org/wiki/HMS_Victory",
            },{
                id:          7,
                img:        "animals/7.jpg",
                name:       "Pinguin",
                klasse:     "Vogel",
                gewicht:    "23kg",
                grösse:     "1,3m",
                link:       "https://de.wikipedia.org/wiki/Schulschiff_Deutschland",
            },{
                id:          8,
                img:        "animals/8.jpg",
                name:       "Schildkröte",
                klasse:     "Reptil",
                gewicht:    "45kg",
                grösse:     "80cm",
                link:       "https://de.wikipedia.org/wiki/Schulschiff_Deutschland",
            },{
                id:          9,
                img:        "animals/9.jpg",
                name:       "Schwein",
                klasse:     "Säugetier",
                gewicht:    "350kg",
                grösse:     "75cm",
                link:       "https://de.wikipedia.org/wiki/Schulschiff_Deutschland",
            },
        ];*/
    }

    /**
     * Diese Methode sucht einen Datensazt anhand seiner ID in der Datenbank
     * und liefert den ersten, gefundenen Treffer zurück.
     *
     * @param  {Number} id Datensatz-ID
     * @return {Object} Gefundener Datensatz
     */
    async getRecordById(id) {
        /*id = parseInt(id);
        return this._animals.find(r => r.id === id);*/

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
