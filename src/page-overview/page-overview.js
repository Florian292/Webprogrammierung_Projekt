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
        // TODO: Seite anzeigen

        let mainElement = document.getElementbyId("app-main-area");
        mainElement.innerHTML ="<button id='test-button'>Test. Bitte anklicken </button>";

        let testButton = document.getElementbyId("test-button");
        testButton.addEventListener("click", this.onTestButtonClicked);
    }

    onTestButtonClicked(){
      alert("Test bestanden");
    }
}
