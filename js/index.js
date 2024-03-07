const body = document.getElementsByClassName("body")[0]; //div centrale pagina
const btnFriends = document.getElementById("btnFriends"); //bottone amici navbar
const sectionFriends = document.getElementById("sectionFriends"); //sezione amici creata da samuele
sectionFriends.style.display = "none";

//funzione che nasconde/mostra la sezione amici
function hiddenSectionfriends() {
  //caso che siamo sopre a 1200 di schermo
  //gestione apertura
  if (window.innerWidth >= 1200 && sectionFriends.style.display === "none") {
    if (libreria.style.display === "block") {
      //contollo se libreria è aperta e apro amici
      sectionFriends.style.display = "block";
      body.className = "col-7 body";
    } else {
      //caso libreria chiusa e apro amici
      sectionFriends.style.display = "block";
      body.className = "col-9 body";
    }
    //gestine chiusura
  } else if (window.innerWidth >= 1200 && libreria.style.display === "block") {
    //chiudo amici ma controllo se libreria è aperta
    sectionFriends.style.display = "none";
    body.className = "col-9 body";
  } else if (window.innerWidth >= 1200) {
    //caso libreria chiusa
    sectionFriends.style.display = "none";
    body.className = "col-11 body";
  }else if (  //gestione sotto i 1200 px
  //---------------------apertura section friend
    libreria.style.display === "block" &&
    sectionFriends.style.display === "none"
  ) {
    //vedo se libreria è aperta
    libreria.style.display = "none";
    sectionFriends.style.display = "block";
    body.className = "col-9 body";
    libreriaSm.style.display = "block";
  } else {
    //librera chiusa
    if (sectionFriends.style.display === "none") {
      //mi apre friends
      sectionFriends.style.display = "block";
      body.className = "col-9 body";
    } else {
      //mi chiude friends
      sectionFriends.style.display = "none";
      body.className = "col-11 body";
    }
  }
}
btnFriends.onclick = function () {
  hiddenSectionfriends();
};
//funzione che nasconde la libreria
const btnLibreria = document.getElementsByClassName("btnlibreria")[0];
const btnlibreriaSm = document.getElementsByClassName("btnlibreriaSm")[0];
const libreria = document.getElementsByClassName("libreria")[0];
const libreriaSm = document.getElementsByClassName("libreriaSm")[0];
libreria.style.display = "none";

window.innerWidth <992 ?libreriaSm.style.display = "none" :libreriaSm.style.display = "block";


btnLibreria.onclick = () => {
  hiddenLibreria();
};
btnlibreriaSm.onclick = () => {
  hiddenLibreria2();
};

function hiddenLibreria() {
  if (window.innerWidth >= 1200) {
    if (sectionFriends.style.display === "block") {
      //sezione amici aperta
      libreria.style.display = "none";
      body.className = "col-9 body";
      libreriaSm.style.display = "block";
    } else {
      //sezione amici chiusa
      libreria.style.display = "none";
      body.className = "col-11 body";
      libreriaSm.style.display = "block";
    }
  } else {
    //sotto i 1200
    libreria.style.display = "none";
    body.className = "col-11 body";
    libreriaSm.style.display = "block";
    sectionFriends.style.display = "none";
  }
}
function hiddenLibreria2() {
  if (window.innerWidth >= 1200) {
    if (sectionFriends.style.display === "block") {
      //sezione amici aperta
      libreria.style.display = "block";
      body.className = "col-7 body";
      libreriaSm.style.display = "none";
    } else {
      //sezioni amici chiusa
      libreria.style.display = "block";
      body.className = "col-9 body";
      libreriaSm.style.display = "none";
    }
  } else {
    //sotto i 1200
    libreria.style.display = "block";
    body.className = "col-9 body";
    libreriaSm.style.display = "none";
    sectionFriends.style.display = "none";
  }
}

//funzione che fa scomparire la scrollbar

// body.style.overflow = "hidden";
// body.style.paddingRight = "13px";
// body.addEventListener("mouseout", function () {
//     body.style.overflow = "hidden";
//     body.style.paddingRight = "13px"; // Sostituisci con la larghezza della tua barra di scorrimento
//   });
//   body.addEventListener("mouseover", function () {
//     body.style.overflow = "scroll";
//     body.style.paddingRight = "0";
//   });
// ////////////////////////////////////

//fetch
const apiSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q="; //+nome artista
const apiInfos = "https://deezerdevs-deezer.p.rapidapi.com/infos";
const apiPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/"; //+id playlist
const getAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/"; //+id album
const getArtist = "https://deezerdevs-deezer.p.rapidapi.com/artist/"; //+id artista

function getFetch(url, id) {
  fetch(url + id, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "56d9802fa4msh3c9b858e765d317p12378djsn46ec36243627",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }
        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }
        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }
        throw new Error("Errore nel reperimento dati");
      }
    })
    .then((oggetto) => {
      console.log(oggetto);
    })
    .catch((err) => console.log(err));
}

getFetch(apiSearch, "elvis");
