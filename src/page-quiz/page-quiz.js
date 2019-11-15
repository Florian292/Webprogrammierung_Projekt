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

	      // zufälliges Tier auswählen
		    let animals = await this._app.database.getAllRecords(); //Array der Tiere aus DB
		    let anzahlTiere = animals.length; //Anzahl der Tiere in DB
		    var x = Math.floor(Math.random() * (anzahlTiere)); //Zufallszahl zwischen 0 und Anzahl der Tiere -1

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
        //Zuordnung Lösungsbuchstaben zu Prüffunktionen, damit die Lösung nicht aus dem Link ersehen werden kann
        let z = "";
        if (kontinent == "Südamerika") z = "a";
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

//Funktion um Kontinente ein- und auszublenden
function swap(konti) {
    if (konti == undefined)
    {
      document.getElementById('australien').style.display = 'none';
      document.getElementById('antarktis').style.display = 'none';
      document.getElementById('afrika').style.display = 'none';
      document.getElementById('suedamerika').style.display = 'none';
      document.getElementById('nordamerika').style.display = 'none';
      document.getElementById('europa').style.display = 'none';
      document.getElementById('asien').style.display = 'none';
    }
    else {
      document.getElementById(konti).style.display = 'block';
    }
};

//Prueffunktionen fuer Quiz, Zuordnung nach Variable z in show
function pruefen(konti) {
    let richtig = false;
    if (konti != "Meer") richtig = true;
    einblenden(richtig);
};
function apruefen(konti) {
  let richtig = false;
  if (konti == "Suedamerika") richtig = true;
  einblenden(richtig);
};
function bpruefen(konti) {
  let richtig = false;
  if (konti == "Europa") richtig = true;
  einblenden(richtig);
};
function cpruefen(konti) {
  let richtig = false;
  if (konti == "Nordamerika") richtig = true;
  einblenden(richtig);
};
function dpruefen(konti) {
  let richtig = false;
  if (konti == "Asien") richtig = true;
  einblenden(richtig);
};
function epruefen(konti) {
  let richtig = false;
  if (konti == "Antarktis") richtig = true;
  einblenden(richtig);
};
function fpruefen(konti) {
  let richtig = false;
  if (konti == "Meer") richtig = true;
  einblenden(richtig);
};
function gpruefen(konti) {
  let richtig = false;
  if (konti == "Afrika") richtig = true;
  einblenden(richtig);
};
function hpruefen(konti) {
  let richtig = false;
  if (konti == "Australien") richtig = true;
  einblenden(richtig);
};
//Ein- und Ausblendfunktion bei Antworten im Quiz
function einblenden(test) {
  if (test == true)  {
    document.getElementById('richtig').style.display = 'block';
    document.getElementById('falsch').style.display = 'none';
  }
  else {
    document.getElementById('falsch').style.display = 'block';
    document.getElementById('richtig').style.display = 'none';
  }
};
