let utereg = document.querySelector("#utereg");
let oggvend = document.querySelector("#oggvend");
let recpos = document.querySelector("#recpos");

function conteggio(oggetto, end, time) {
  let cont = 0;
  let moltiplicatore;

  if (end <= 10) {
    moltiplicatore = 1;
  } else if (end <= 50) {
    moltiplicatore = 4;
  } else if (end <= 400) {
    moltiplicatore = 5;
  } else if (end <= 3000) {
    moltiplicatore = 7;
  } else {
    moltiplicatore = 10;
  }

  let intervallo = setInterval(() => {
    if (cont < end) {
      cont = cont + moltiplicatore;
      oggetto.innerText = `${cont}+`;
    } else {
      cont = end;
      oggetto.innerText = `${cont}+`;
      clearInterval(intervallo);
    }
  }, time);
}

setTimeout( () => {


  conteggio(utereg, 353, 40);
  conteggio(oggvend, 1202, 40);
  conteggio(recpos, 1024, 40);
  

}, 500) 

