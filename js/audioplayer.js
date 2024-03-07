// ALBUM PAGE FUNZIONE BACKGROUD
// funzione color random

function getColorForAlbumPage() {
  const colorThief = new ColorThief();
  const img = document.getElementById("album-page-image-color");

  // Make sure image is finished loading
  if (img.complete) {
    let arrayColor = colorThief.getColor(img);
    let color = arrayColor.toString();
    return color;
  } else {
    image.addEventListener("load", function () {
      colorThief.getColor(img);
    });
  }
}

function albumPageBackground() {
  const nav = document.getElementById("album-page-navbar-sticky");
  const header = document.getElementById("album-page-header");
  let color = getColorForAlbumPage();
  nav.style.backgroundColor = `rgb(${color})`;
  header.style = `background: linear-gradient(180deg, rgba(${color},1) 0%, rgba(18,18,18,1) 63%);`;
}

albumPageBackground();

// PLAYER WALKER

let audio = document.getElementById("audio"); // elemento audio
let time = document.querySelector(".time"); // traccia audio
let btnPlay = document.querySelector(".play"); // tasto play

let btnPause = document.querySelector(".pause"); // tasto pausa (da vedeere come implementarlo)
let btnPrev = document.querySelector(".prev"); // tasto indietro
let btnNext = document.querySelector(".next"); // tasto avanti

// array di canzioni.. da implementare poi con la fetch
let songs = ["track 1.mp3", "track 2.mp3", "track 3.mp3"]; // array di canzoni da dover riprodurre

let track; // variabile index traccia

window.onload = function () {
  track = 0;
};

function switchTrack(numTrack) {
  // assegnamo all'audio una risorsa
  audio.src = "../song.mp3" + songs[numTrack]; // *cambiare l'indirizzo dell'audio in base alla fetch
  // assegnamo alla canzione un tempo 0
  audio.currentTime = 0;
  //avviamo la canzone
  audio.play();
}

btnPlay.onclick = () => {
  audio.play();
  // set intervall
  btnPlay.classList.add("d-none");
  btnPause.classList.remove("d-none");
  audioPlay = setInterval(function () {
    //prendere il valore del decondo della canzone
    let audioTime = Math.round(audio.currentTime); //getTime
    // prendiamo tutto il tempo della canzone
    let audioLength = Math.round(audio.duration);

    // function innerLongSong(time, length) {
    //   let start = document.getElementById("start-song");
    //   let long = document.getElementById("end-song");

    // }

    // assegnamo una lunghezza in base all'elemento
    time.style.width = (audioTime * 100) / audioLength + "%";
    // mostra i secondi di riempimento della barra e controlla che la variabile sia meno di 4
    if (audioTime === audioLength && track < songs.length) {
      track++; //la traccia si incrementa
      switchTrack(track); // cambia traccia
    } else if (audioTime === audioLength >= songs.length) {
      track = 0; // gli riassegnamo il valore 0
      switchTrack(track); // e cambia traccia
    }
  }, 10);
};

btnPause.onclick = () => {
  btnPause.classList.add("d-none");
  btnPlay.classList.remove("d-none");
  audio.pause(); // Interrompe la canzone
  clearInterval(audioPlay); // interrompe l'intervallo
};
