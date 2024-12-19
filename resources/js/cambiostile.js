//! CAMBIO STILE

let stilizzato = document.querySelector("#stilizzato");

let sblu = document.querySelector("#sblu");
let sbianco = document.querySelector("#sbianco");

let datisalvati = localStorage.getItem("stilizzatoHref");
let stilescelto = datisalvati;
if (
  datisalvati == "../css/style.css" ||
  datisalvati == "../css/stylebianco.css"
) {
  stilizzato.href = datisalvati;
}

sblu.addEventListener("click", () => {
  stilizzato.href = "../css/style.css";
  stilescelto = "../css/style.css";
  localStorage.setItem("stilizzatoHref", "../css/style.css");
  idpulsanteDM.innerHTML = `<i class="bi bi-moon"></i>`;
  isclicked = true;
  localStorage.setItem("statodm", "light");
});

sbianco.addEventListener("click", () => {
  stilizzato.href = "../css/stylebianco.css";
  stilescelto = "../css/stylebianco.css";
  localStorage.setItem("stilizzatoHref", "../css/stylebianco.css");
  idpulsanteDM.innerHTML = `<i class="bi bi-moon"></i>`;
  isclicked = true;
  localStorage.setItem("statodm", "light");
});

//! DARK MODE

let isclicked = true;
let idpulsanteDM = document.querySelector("#idpulsanteDM");

idpulsanteDM.addEventListener("click", () => {
  if (isclicked) {
    //DARK MODE
    idpulsanteDM.innerHTML = `<i class="bi bi-moon-fill"></i>`;
    isclicked = false;
    stilizzato.href = "../css/darkmode.css";
    localStorage.setItem("statodm", "dark");
  } else {
    // LIGHT MODE
    idpulsanteDM.innerHTML = `<i class="bi bi-moon"></i>`;
    isclicked = true;
    if (
      stilescelto == "../css/style.css" ||
      stilescelto == "../css/stylebianco.css"
    ) {
      stilizzato.href = stilescelto;
    } else stilizzato.href = "../css/style.css";
    localStorage.setItem("statodm", "light");
  }
});

let mode = localStorage.getItem("statodm");

if (mode == "dark") {
  stilizzato.href = "../css/darkmode.css";
  idpulsanteDM.innerHTML = `<i class="bi bi-moon-fill"></i>`;
  isclicked = false;
} else {
  idpulsanteDM.innerHTML = `<i class="bi bi-moon"></i>`;
  isclicked = true;
}
