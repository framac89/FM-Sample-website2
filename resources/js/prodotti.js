//! Importo i prodotti

fetch("../prodotti.json")
  .then((response) => response.json())
  .then((data) => {
    //! prodotti importati, agisco sui dati ottenuti

    //! acquisisco la row su cui mostrare i contenuti
    let rowpadre = document.querySelector("#catalogoprodotti");

    //! acquisico l'input per testo
    let filtroparola = document.querySelector("#filtroparola");

    //! acquisico l'input del prezzo
    let filtroprezzo = document.querySelector("#filtroprezzo");
    let prezzomostrato = document.querySelector("#prezzomostrato");

    //! acquisisco il div padre delle categorie
    let padrecategorie = document.querySelector("#padrecategorie");

    //! acquisisco bottone reset
    let bottonereset = document.querySelector("#bottonereset");

    //! funzione che crea le categorie e le visualizza
    function creacatetorie() {
      let listacategorie = [];
      data.forEach((elemento) => {
        if (!listacategorie.includes(elemento.category)) {
          listacategorie.push(elemento.category);
          let nuovacategoria = document.createElement("div");
          nuovacategoria.classList.add("form-check");
          nuovacategoria.innerHTML = `<input class="form-check-input" type="radio" name="categoria" id="${elemento.category}" />
                      <label class="form-check-label" for="${elemento.category}">
                      ${elemento.category}
                      </label>`;
          padrecategorie.appendChild(nuovacategoria);
        }
      });
    }

    //! avvio la funzione crea categorie
    creacatetorie();

    //! acquisisco i radiobutton delle categorie

    let bottoniradio = document.querySelectorAll(".form-check-input");

    //! controllo il prezzi min e max del json
    function trovaminmax() {
      let vett = [];
      let mappato = data.map((ind) => +ind.price);

      vett[0] = Math.min(...mappato);
      vett[1] = Math.max(...mappato);

      return vett;
    }
    let minimoemassimo = trovaminmax();
    filtroprezzo.min = minimoemassimo[0];
    filtroprezzo.max = minimoemassimo[1];
    filtroprezzo.value = minimoemassimo[1];
    prezzomostrato.innerText = `€ ${minimoemassimo[1]}`;

    //! funzione per mostrare i prodotti

    function mostraprodotti(dat) {
      rowpadre.innerHTML = "";
      dat.forEach((element, i) => {
        let nuovacolonna = document.createElement("div");
        nuovacolonna.classList.add("col-12", "col-md-6", "col-xl-4");
        nuovacolonna.innerHTML = `
            <div class="card m-1" style="width: 18rem;">
                    <img src="https://picsum.photos/300?random=${i}" class="card-img-top" alt="prodotto">
                    <div class="card-body internoprodotto d-flex flex-column">
                      <h5 class="card-title text-center">${element.name}</h5>
                      <p class="card-text text-center">prezzo €${element.price}</p>
                      <a href="#!" class="btn sfondosezione">Vedi</a>
                    </div>
                  </div>
            `;
        rowpadre.appendChild(nuovacolonna);
      });
    }

    //! funzione richiamata per visualizzare tutti i prodotti all'avvio
    bottoniradio[0].checked = "true";
    mostraprodotti(data);

    //! funzione filtro globale
    function filtroglobale() {
      let filtratacateg = categ(data);
      let filtratoprezzo = filtroilprezzo(filtratacateg);
      let filtratotesto = listadatesto(filtratoprezzo);
      mostraprodotti(filtratotesto);
    }

    //! funzione filtra da testo
    function listadatesto(dat) {
      let listafiltrata = dat.filter((ind) =>
        ind.name.toLowerCase().includes(filtroparola.value.toLowerCase())
      );

      return listafiltrata;
    }

    //! avvio il filtro per il testo con ritardo
    filtroparola.addEventListener("input", () => {
      //genero la nuova lista dopo 500 ms
      setTimeout(() => {
        filtroglobale();
      }, 500);
    });

    //! funzione filtro prezzo
    function filtroilprezzo(dat) {
      let listafiltrata = dat.filter(
        (ind) => +ind.price <= +filtroprezzo.value
      );

      return listafiltrata;
    }

    //! richiamo la funzione per il prezzo e visualizzo
    filtroprezzo.addEventListener("input", () => {
      prezzomostrato.innerText = `€ ${filtroprezzo.value}`;
      filtroglobale();
    });

    //! funzione per categorie
    function categ(dat) {
      let catturanodelist = Array.from(bottoniradio);
      let controllocategoria = catturanodelist.find((ind) => ind.checked);
      let categoriascelta = controllocategoria.id;

      if (categoriascelta == "all") return data;
      else {
        let filtrati = dat.filter((el) => el.category == categoriascelta);
        return filtrati;
      }
    }

    //! evento sui radio button
    bottoniradio.forEach((elemento) => {
      elemento.addEventListener("click", () => {
        filtroglobale();
      });
    });

    //! evento bottone reset
    bottonereset.addEventListener("click", () => {
      bottoniradio[0].checked = "true";
      filtroprezzo.min = minimoemassimo[0];
      filtroprezzo.max = minimoemassimo[1];
      filtroprezzo.value = minimoemassimo[1];
      prezzomostrato.innerText = `€ ${minimoemassimo[1]}`;
      filtroparola.value = "";
      filtroglobale();
    });

    //! fine agisco sui dati ottenuti dalla fetch
  });
