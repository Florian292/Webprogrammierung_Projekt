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
        this._data = [
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
        ];
    }

    /**
     * Diese Methode sucht einen Datensazt anhand seiner ID in der Datenbank
     * und liefert den ersten, gefundenen Treffer zurück.
     *
     * @param  {Number} id Datensatz-ID
     * @return {Object} Gefundener Datensatz
     */
    getRecordById(id) {
        id = parseInt(id);
        return this._data.find(r => r.id === id);
    }

    /**
     * Diese Methode gibt eine Liste mit allen Datensätzen zurück.
     * @return {Array} Liste aller Datensätze
     */
    getAllRecords() {
        return this._data;
    }
}
