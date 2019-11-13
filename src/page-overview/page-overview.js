"use strict";

/**
 * Klasse PageOverview: Stellt die Startseite der App zur Verfügung
 */
class PageOverview {
    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */
    constructor(app) {
        this._app = app;
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show() {
        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-overview/page-overview.html");
        let css = await fetch("page-overview/page-overview.css");
        //let formcss = await fetch("elements/form.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts")
            return;
        }

        // Seite zur Anzeige bringen
        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        await this._renderAnimalTiles(pageDom);
        let formElement = pageDom.querySelector('form');
        formElement.addEventListener('submit', event => this.tierHinzufügen(event, this._app.database));

        this._app.setPageTitle("Startseite");
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));



    }

    /**
     * Hilfsmethode, welche den HTML-Code zur Darstellung der Kacheln auf
     * der Startseite erzeugt.
     *
     * @param {HTMLElement} pageDom Wurzelelement der eingelesenen HTML-Datei
     * mit den HTML-Templates dieser Seite.
     */
    async _renderAnimalTiles(pageDom) {
        let mainElement = pageDom.querySelector("main"); //Aufruf des main-Bereichs der HTML
        let templateElement = pageDom.querySelector("#template-tile"); //Aufruf des template-tile-Bereichs der HTML

        let animals = await this._app.database.getAllRecords(); //Array der Tiere aus DB
        let alleTiere = ""; //Variable fuer gesamtes HTML der Schleife
        animals.forEach(animal => { //Schleife als Aufruf der einzelnen Datensaetze
            let imageDataURI = "animals/dummy.png";

            if (animal.imagemime && animal.image64) {
              imageDataURI = `data:${animal.imagemime};base64,${animal.image64}`;
            }

            let html = templateElement.innerHTML;
            html = html.replace("{HREF}", `#/Detail/${animal.id}`);
            html = html.replace("{IMG}", imageDataURI);
            html = html.replace("{NAME}", animal.name);

            alleTiere += html; //fortlaufende Informationen in HTML-Variable
        });

        alleTiere += mainElement.innerHTML; //main-Bereich hinter template-tile-Bereich
        mainElement.innerHTML = alleTiere; //einfuegen in Aufrufvariable
    }

    tierHinzufügen(event, database) {
      let newAnimal = {
        name: event.target.name.value,
        groesse: event.target.groesse.value,
        gewicht: event.target.gewicht.value,
        klasse: event.target.klasse.value,
        fakt1: event.target.fakt1.value,
        fakt2: event.target.fakt2.value,
        fakt3: event.target.fakt3.value,
        fakt4: event.target.fakt4.value,
        fakt5: event.target.fakt5.value,
        kontinent: event.target.kontinent.value,
        image64: event.target.image64.value,
        immagemime: "image/jpeg",
        sound64: event.target.sound64.value,
        soundmime:  "audio/mpeg",

      };
      database.saveNewAnimal(newAnimal);
      alert('Tier gespeichert');
      event.preventDefault();

    }
}
