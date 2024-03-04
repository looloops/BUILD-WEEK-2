let audio = document.getElementById("audio"); // elemento audio
let time = document.querySelector(".time"); // traccia audio
let btnPlay = document.querySelector(".play"); // tasto play
let btnPause = document.querySelector(".pause"); // tasto pausa (da vedeere come implementarlo)
let btnPrev = document.querySelector(". prev"); // tasto indietro
let btnNext = document.querySelector(".next"); // tasto avanti

// array di canzioni.. da implementare poi con la fetch
let songs = ["track 1.mp3", "track 2.mp3", "track 3.mp3"]; // array di canzoni da dover riprodurre

let track; // variabile index traccia

window.onload = function () {
  track = 0;

  function switchTrack(numTrack) {
    // assegnamo all'audio una risorsa
    audio.src = "../song.mp3" + songs[numTrack]; // *cambiare l'indirizzo dell'audio in base alla fetch
    // assegnamo alla canzione un tempo 0
    audio.currentTime = 0;
    //avviamo la canzone
    audio.play();
  }
};

btnPlay.onclick = () => {
  audio.play();
  // set intervall
  audioPlay = setInterval(function () {
    //prendere il valore del decondo della canzone
    let audioTime = Math.around(audio.currentTime); //getTime
    // prendiamo tutto il tempo della canzone
    let audioLength = Math.random(audio.duration);

    // assegnamo una lunghezza in base all'elemento
  });
};
