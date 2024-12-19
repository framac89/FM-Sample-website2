let barra = document.querySelector("#barra");
let fondo = document.querySelector("#fondo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    barra.classList.add("scrollogiu");
  } else {
    barra.classList.remove("scrollogiu");
  }
});

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 40) {
    fondo.classList.add("scrollosu");
  } else {
    fondo.classList.remove("scrollosu");
  }
});
