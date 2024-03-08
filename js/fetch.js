const img = document.getElementsByClassName("img-cantante")[0];
const ascoltiamo = document.getElementsByClassName("ascoltiamo")[0];
const titleSongHeader = document.getElementById("titleSongHeader");
const playerTitle = document.getElementById("player-title");
const playerAartist = document.getElementById("player-artist");
const imgPlayer = document.getElementById("imgPlayer");
const myaudio = document.getElementById("audio");
const btnHeaderplay = document.getElementById("btnHeaderplay");
const btnplay = document.getElementsByClassName("play")[0];

//fetch
const apiSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q="; //+nome artista
const apiInfos = "https://deezerdevs-deezer.p.rapidapi.com/infos";
const apiPlaylist = "https://deezerdevs-deezer.p.rapidapi.com/playlist/"; //+id playlist
const getAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/"; //+id album
const getArtist = "https://deezerdevs-deezer.p.rapidapi.com/artist/"; //+id artista

let arrayArtist = [
  "eminem",
  "ryhanna",
  "pino daniele",
  "calcutta",
  "20cent",
  "jay-z",
  "sia",
  "luchè",
  "madonna",
  "the weeknd",
  "kanye west",
  "drake",
];
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
      let random = Math.floor(Math.random() * oggetto.data.length);
      console.log(oggetto);
      img.src = `${oggetto.data[random].album.cover_medium}`;
      ascoltiamo.innerHTML = `${oggetto.data[random].artist.name}`;
      titleSongHeader.innerHTML = `${oggetto.data[random].title}`;
      myaudio.src = `${oggetto.data[random].preview}`;
      playerAartist.innerHTML = `${oggetto.data[random].artist.name}`;
      imgPlayer.src = `${oggetto.data[random].album.cover_medium}`;
      playerTitle.innerHTML = `${oggetto.data[random].title}`;
    })
    .catch((err) => console.log(err));
}

let rand = Math.floor(Math.random() * arrayArtist.length);

getFetch(apiSearch, arrayArtist[rand]);
const endsongtime = document.getElementById("end-song");
const startsongtime = document.getElementById("start-song");

// click player in basso
btnplay.onclick = () => {
  endsongtime.innerText = "0." + Math.floor(myaudio.duration);

  if (myaudio.paused) {
    myaudio.play();
  } else {
    myaudio.pause();
  }
};
btnHeaderplay.onclick = () => {
  endsongtime.innerText = "0." + Math.floor(myaudio.duration);

  if (myaudio.paused) {
    myaudio.play();
  } else {
    myaudio.pause();
  }
};

//funzione che gestisce il volume
const rangeInput = document.getElementById("customRange1");
rangeInput.oninput = () => {
  const volume = parseFloat(rangeInput.value);
  myaudio.volume = volume / 100; // Imposta il volume dell'audio in base al valore del range
};

//funzione crea card

function creaCard(link, text1, text2, idContainer) {
  const divcards = document.getElementById(idContainer || "divcards");
  const div = document.createElement("div");
  div.className = "col-12 col-sm-4 col-md-3 gx-2 card-container";
  divcards.appendChild(div);
  ///////////////////////////
  const div2 = document.createElement("div");
  div2.style.cursor = "pointer";
  div2.onclick = () => {
    window.location.href = `./album.html?idAlbum=${id}`;
  };
  div2.className = "card";
  div.appendChild(div2);
  ///////////////////////////
  const imgContainer = document.createElement("div");
  imgContainer.className = "image-container";
  div2.appendChild(imgContainer);
  ///////////////////////////
  const img = document.createElement("img");
  img.className = "card-img-top img-fluid";
  img.src = link;
  imgContainer.appendChild(img);
  ///////////////////////////
  const buttonPlay = document.createElement("div");
  buttonPlay.className = "button-play-container";
  buttonPlay.innerHTML = `<div class="button-play-sub">
                              <div class="button-play">
                                <i class="bi bi-play-fill fs-1"></i>
                              </div>
                          </div>`;
  imgContainer.appendChild(buttonPlay);
  ///////////////////////////
  const div3 = document.createElement("div");
  div3.className = "card-body px-0 overflow-hidden";
  div2.appendChild(div3);
  ///////////////////////////
  const h5 = document.createElement("h5");
  h5.className = "card-title text-white text-nowrap text-truncate overflow-hidden";
  h5.textContent = text1;
  div3.appendChild(h5);
  ///////////////////////////
  const p = document.createElement("p");
  p.className = "card-text text-body-secondary text-white text-nowrap text-truncate";
  p.textContent = text2;
  div3.appendChild(p);
  cardMobileBG("card-img-top");
}

//////////////////////////////////////////////////////////////////////////////////////////fetch che crea nella home le card dinamiche

function getFetchcard(url, id, idContainer) {
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
      let random = Math.floor(Math.random() * oggetto.data.length);
      console.log(oggetto),
        creaCard(
          oggetto.data[random].album.cover_medium,
          oggetto.data[random].title,
          oggetto.data[random].artist.name,
          oggetto.data[random].artist.name
        );
    })
    .catch((err) => console.log(err));
}

for (let index = 0; index < 5; index++) {
  let rand2 = Math.floor(Math.random() * arrayArtist.length);
  getFetchcard(apiSearch, arrayArtist[rand2]);
}

for (let index = 0; index < 5; index++) {
  let rand2 = Math.floor(Math.random() * arrayArtist.length);
  getFetchcard(apiSearch, arrayArtist[rand2], "divcards-2");
}
