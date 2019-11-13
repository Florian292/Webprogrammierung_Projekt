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
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    async show(matches) {

	    // zufälliges Tier auswählen
		/*let animals = await this._app.database.getAllRecords(); //Array der Tiere aus DB
		let anzahlTiere = animals.length; //Anzahl der Tiere in DB
		var x = Math.floor(Math.random() * (anzahlTiere)); //Zufallszahl zwischen 0 und Anzahl der Tier -1
		let kontinent = animals[x].kontinent;
		let animalname = animals[x].name;*/

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
    //    html = html.replace(/{TIERNAME}/g, animalname);

        // Seite zur Anzeige bringen
        let pageDom = document.createElement("div");
//        html = html.replace("{TIERNAME}", animal.name);
        pageDom.innerHTML = html;

/*        await this._renderAnimalTiles(pageDom);
        let formElement = pageDom.querySelector('form');
        formElement.addEventListener('submit', event => this.tierHinzufügen(event, this._app.database)); */

        await this._getAllAnimals(html);
        pageDom.innerHTML = html;

/*
		window.addEventListener ('load', function () {
			var map = document.querySelectorAll('#kontinente area');
			for (var i=0; i<map.length; i++) {
				if (map[i].addEventListener) {
					map[i].addEventListener('touchstart', swap, false);
					map[i].addEventListener('mouseover', swap, false);
					//map[i].addEventListener('mouseout', swap, false);
				}
			}

			function swap(ev) {
				var lan = this.getAttribute('alt');
				document.getElementById('worldmap').setAttribute('src','images/kontinente/' + lan + '.png');
				return false;
			}
		});
*/

        this._app.setPageTitle("Quiz", {isSubPage: true});
        this._app.setPageCss(css);
        this._app.setPageHeader(pageDom.querySelector("header"));
        this._app.setPageContent(pageDom.querySelector("main"));

    }

  async  _getAllAnimals(text){
      let animals = await this._app.database.getAllRecords(); //Array der Tiere aus DB
      let anzahlTiere = animals.length;
      var x = Math.floor(Math.random() * (anzahlTiere));
      let kontinent = animals[x].kontinent;
      let animalname = animals[x].name;

      text = text.replace("{TIERNAME}", animalname);
return text;
    //  alert(anzahlTiere);
    //  alert(animalname);

    }

    /*_replaceVariables(text){
        text = text.replace(/{NAME}/g, this._animals.name);*/
        //text = text.replace(/{IMG}/g, this._animals.img);


}
