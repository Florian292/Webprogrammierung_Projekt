"use strict";

/**
 * Klasse PageQuiz: Stellt das Quiz der App zur Verfügung
 */
class PageQuiz {
    /**
     * Konstruktor
     * @param {App} app Zentrale Instanz der App-Klasse
     */
    constructor(app) {
        this._app = app;
        this._recordId = -1;
        this._animals = null;
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show(matches) {

        // URL-Parameter auswerten
/*        this._recordId = matches[1];
        this._recordId = matches[2];
        this._animals = await this._app.database.getRecordById(this._recordId);*/

	      // zufälliges Tier auswählen
		    let animals = await this._app.database.getAllRecords(); //Array der Tiere aus DB
		    let anzahlTiere = animals.length; //Anzahl der Tiere in DB
		    var x = Math.floor(Math.random() * (anzahlTiere)); //Zufallszahl zwischen 0 und Anzahl der Tier -1

        // Dummy-Datensatz rausfiltern
        var y = true;
        while (y == true) {
          if (animals[x].name == "dummy") x = Math.floor(Math.random() * (anzahlTiere));
          else y = false;
        }

		    let kontinent = animals[x].kontinent;
		    let animalname = animals[x].name;

        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-quiz/page-quiz.html");
        let css = await fetch("page-quiz/page-quiz.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts")
            return;
        }

		    // Tiername in Titel ersetzen
        html = html.replace(/{TIERNAME}/g, animalname);
        html = html.replace(/{KONTINENT}/g, kontinent);

        //passende Prüffunktion für Lösungskontinent wählen
        let z = "";
        if (kontinent == "Suedamerika") z = "a";
        if (kontinent == "Europa") z = "b";
        if (kontinent == "Nordamerika") z = "c";
        if (kontinent == "Asien") z = "d";
        if (kontinent == "Antarktis") z = "e";
        if (kontinent == "Meer") z = "f";
        if (kontinent == "Afrika") z = "g";
        if (kontinent == "Australien") z = "h";
        html = html.replace(/{PRUEFFUNKTION}/g, z+'pruefen');

        // Seite zur Anzeige bringen
        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        this._app.setPageTitle("Quiz", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));

    }

}
