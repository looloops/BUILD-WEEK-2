const body = document.getElementsByClassName("body")[0];//div centrale pagina
const btnFriends = document.getElementById("btnFriends");//bottone amici navbar
const sectionFriends = document.getElementById("sectionFriends");//sezione amici creata da samuele

//funzione che nasconde/mostra la sezione amici
function hiddenSectionfriends() {
  if (sectionFriends.classList == "col-2 bg-black rounded d-block") {
    sectionFriends.classList.remove("d-block");
    sectionFriends.classList.add("d-none");
    body.className = "col-9 body";
  } else {
    sectionFriends.classList.remove("d-none");
    sectionFriends.classList.add("d-block");
    body.className = "col-7 body";
  }
}
btnFriends.onclick = function () {
  hiddenSectionfriends();
};

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
const apiSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";//+nome artista
const apiInfos = "https://deezerdevs-deezer.p.rapidapi.com/infos";
const apiPlaylist ="https://deezerdevs-deezer.p.rapidapi.com/playlist/";//+id playlist
const getAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";//+id album
const getArtist='https://deezerdevs-deezer.p.rapidapi.com/artist/';//+id artista

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

getFetch(apiSearch,"elvis")