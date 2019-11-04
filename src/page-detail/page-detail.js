"use strict";

/**
 * Klasse PageDetail: Stellt die Detailseite der App zur Verfügung
 */
class PageDetail {
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
        this._recordId = matches[1];
        this._animals = await this._app.database.getRecordById(this._recordId);

        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-detail/page-detail.html");
        let css = await fetch("page-detail/page-detail.css");

        if (html.ok && css.ok) {
            html = await html.text();
            css = await css.text();
        } else {
            console.error("Fehler beim Laden des HTML/CSS-Inhalts")
            return;
        }

        // Seite zur Anzeige bringen
        html = this._replaceVariables(html);
        css = this._replaceVariables(css);
        let pageDom = this._processTemplate(html);


        this._app.setPageTitle(`${this._animals.name}`, {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    _replaceVariables(text){
        text = text.replace(/{NAME}/g, this._animals.name);
        //text = text.replace(/{IMG}/g, this._animals.img);

        text = text.replace(/{KLASSE}/g, this._animals.klasse);
        text = text.replace(/{GEWICHT}/g, this._animals.gewicht);
        text = text.replace(/{GRÖSSE}/g, this._animals.groesse);
        text = text.replace(/{LINK}/g, this._animals.link);
        text = text.replace(/{FAKT1}/g, this._animals.fakt1);
        text = text.replace(/{FAKT2}/g, this._animals.fakt2);
        text = text.replace(/{FAKT3}/g, this._animals.fakt3);
        text = text.replace(/{FAKT4}/g, this._animals.fakt4);
        text = text.replace(/{FAKT5}/g, this._animals.fakt5);
        return text;
    }
     /**
     * Hilfsmethode, welche den HTML-Code der eingelesenen HTML-Datei bearbeitet
     * und anhand der eingelesenen Daten ergänzt. Zusätzlich wird hier ein
     * Event Handler für den Button registriert.
     *
     * @param {HTMLElement} pageDom Wurzelelement der eingelesenen HTML-Datei
     * mit den HTML-Templates dieser Seite.
     */
     _processTemplate(html) {
        // HTML-Template in echte DOM-Objekte umwandeln, damit wir es mit den
        // DOM-Methoden von JavaScript weiterbearbeiten können
        let pageDom = document.createElement("div");
        pageDom.innerHTML = html;

        // Event Handler für den Button registrieren
        pageDom.querySelectorAll(".id").forEach(e => e.textContent = this._recordId);
        pageDom.querySelector("#show-more-button").addEventListener("click", () => this._onShowMoreButtonClicked());

        // Fertig bearbeitetes HTML-Element zurückgeben
        return pageDom;
    }

    /**
     * Beispiel für einen einfachen Event Handler, der bei Klick auf einen
     * Button aufgerufen wird.
     */
    _onShowMoreButtonClicked() {
        //alert(this._animals.name);
        let soundDataURI = `data:${this._animals.soundmime};base64,${this._animals.sound64}`;
        let audio = new Audio(soundDataURI);
        audio.play();
    }
}
