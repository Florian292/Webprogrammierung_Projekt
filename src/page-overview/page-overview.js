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
        let mainElement = pageDom.querySelector("main");
        let templateElement = pageDom.querySelector("#template-tile");

        let animals = await this._app.database.getAllRecords();

        animals.forEach(animal => {
            let imageDataURI = "animals/dummy.png";

            if (animal.imagemime && animal.image64) {
              imageDataURI = `data:${animal.imagemime};base64,${animal.image64}`;
            }

            let html = templateElement.innerHTML;
            html = html.replace("{HREF}", `#/Detail/${animal.id}`);
            html = html.replace("{IMG}", imageDataURI);
            html = html.replace("{NAME}", animal.name);

            mainElement.innerHTML += html;
        });
    }

    tierHinzufügen(event, database) {
      let newAnimal = {
        name: event.target.name.value,

      };
      database.saveNewAnimal(newAnimal);
      alert('Hallo');
      console.log(event.target.fakt1.value);
      event.preventDefault();

    }
}
