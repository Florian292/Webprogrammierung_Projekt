"use strict";

/**
 * Klasse PageEdit: Einträge in der DB editieren
 */
class PageEdit {
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
        var animalid = matches[1];

        // Dummy-Daten für Sound aus DB holen
        let dummyId = "dummy";
        this._animalDummy =  await this._app.database.getRecordById(dummyId);

        // Anzuzeigenden Seiteninhalt nachladen
        let html = await fetch("page-edit/page-edit.html");
        let css = await fetch("page-edit/page-edit.css");

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

        let formElement = pageDom.querySelector('form');
        formElement.addEventListener('submit', event => this.tierAendern(event, this._app.database));

        this._app.setPageTitle(`${this._animals.name}`, {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));
    }

    _replaceVariables(text){

        let imageDataURI = "animals/dummy.png";
        if (this._animals.imagemime && this._animals.image64.startsWith('/9j/') == true ) {
          imageDataURI = `data:${this._animals.imagemime};base64,${this._animals.image64}`;
        }
        text = text.replace(/{NAME}/g, this._animals.name);
        text = text.replace(/{ID}/g, this._recordId);
        text = text.replace(/{IMG}/g, imageDataURI);
        text = text.replace(/{KLASSE}/g, this._animals.klasse);
        text = text.replace(/{GEWICHT}/g, this._animals.gewicht);
        text = text.replace(/{GRÖSSE}/g, this._animals.groesse);
        text = text.replace(/{KONTINENT}/g, this._animals.kontinent);
        text = text.replace(/{LINK}/g, this._animals.link);
        text = text.replace(/{FAKT1}/g, this._animals.fakt1);
        text = text.replace(/{FAKT2}/g, this._animals.fakt2);
        text = text.replace(/{FAKT3}/g, this._animals.fakt3);
        text = text.replace(/{FAKT4}/g, this._animals.fakt4);
        text = text.replace(/{FAKT5}/g, this._animals.fakt5);
        text = text.replace(/{IMAGE64}/g, this._animals.image64);
        text = text.replace(/{SOUND64}/g, this._animals.sound64);

        // Select für Klasse
        (this._animals.klasse == "Säugetier") ? text = text.replace(/{SÄUGETIER}/g, "selected") : text = text.replace(/{SÄUGETIER}/g, "");
        (this._animals.klasse == "Vogel") ? text = text.replace(/{VOGEL}/g, "selected") : text = text.replace(/{VOGEL}/g, "");
        (this._animals.klasse == "Reptilie") ? text = text.replace(/{REPTILIE}/g, "selected") : text = text.replace(/{REPTILIE}/g, "");
        (this._animals.klasse == "Amphibie") ? text = text.replace(/{AMPHIBIE}/g, "selected") : text = text.replace(/{AMPHIBIE}/g, "");
        (this._animals.klasse == "Fisch") ? text = text.replace(/{FISCH}/g, "selected") : text = text.replace(/{FISCH}/g, "");
        (this._animals.klasse == "Insekt") ? text = text.replace(/{INSEKT}/g, "selected") : text = text.replace(/{INSEKT}/g, "");
        (this._animals.klasse == "Weichtier") ? text = text.replace(/{WEICHTIER}/g, "selected") : text = text.replace(/{WEICHTIER}/g, "");
        (this._animals.klasse == "Spinnentier") ? text = text.replace(/{SPINNENTIER}/g, "selected") : text = text.replace(/{SPINNENTIER}/g, "");

        // Select für Kontinent
        (this._animals.kontinent == "Alle Kontinente") ? text = text.replace(/{ALLE}/g, "selected") : text = text.replace(/{ALLE}/g, "");
        (this._animals.kontinent == "Afrika") ? text = text.replace(/{AFRIKA}/g, "selected") : text = text.replace(/{AFRIKA}/g, "");
        (this._animals.kontinent == "Antarktis") ? text = text.replace(/{ANTARKTIS}/g, "selected") : text = text.replace(/{ANTARKTIS}/g, "");
        (this._animals.kontinent == "Asien") ? text = text.replace(/{ASIEN}/g, "selected") : text = text.replace(/{ASIEN}/g, "");
        (this._animals.kontinent == "Australien") ? text = text.replace(/{AUSTRALIEN}/g, "selected") : text = text.replace(/{AUSTRALIEN}/g, "");
        (this._animals.kontinent == "Europa") ? text = text.replace(/{EUROPA}/g, "selected") : text = text.replace(/{EUROPA}/g, "");
        (this._animals.kontinent == "Meer") ? text = text.replace(/{MEER}/g, "selected") : text = text.replace(/{MEER}/g, "");
        (this._animals.kontinent == "Nordamerika") ? text = text.replace(/{NORDAMERIKA}/g, "selected") : text = text.replace(/{NORDAMERIKA}/g, "");
        (this._animals.kontinent == "Südamerika") ? text = text.replace(/{SUEDAMERIKA}/g, "selected") : text = text.replace(/{SUEDAMERIKA}/g, "");

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
        pageDom.querySelector("#sound-button").addEventListener("click", () => this._onSoundButtonClicked());

        // Fertig bearbeitetes HTML-Element zurückgeben
        return pageDom;
    }


     //Handler für den Button der die Tiersounds abspielt und bei ungültiger Sounddatei einen Failsound sowie einen Hinweis ausgibt

    _onSoundButtonClicked() {
        let soundDataURI = ``;

        if (/*this._animals.soundmime &&*/ this._animals.sound64.startsWith("SUQz") == false) {
          soundDataURI = `data:${this._animals.soundmime};base64,${this._animalDummy.sound64}`;
          alert("Leider bisher kein Sound gespeichert");
        }
        else {
          soundDataURI = `data:${this._animals.soundmime};base64,${this._animals.sound64}`;
        }
        let audio = new Audio(soundDataURI);
        audio.play();
    }

    tierAendern(event, database) {
      let editAnimal = {
        id: event.target.id.value,
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
        imagemime: "image/jpeg",
        sound64: event.target.sound64.value,
        soundmime:  "audio/mpeg",

      };
      database.saveEditAnimal(editAnimal);
      alert('Tierdaten geändert');
      window.location = "./#/Edit/" + this._recordId;
      //location.reload(true);
      event.preventDefault();
    }

}
