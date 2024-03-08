const artistID = Math.floor(Math.random() * 5000);
console.log(artistID);
const apiSearch = "https://deezerdevs-deezer.p.rapidapi.com/search?q="; //+nome artista
const getAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/"; //+id album

// ALBUM PAGE FUNZIONE BACKGROUD
// funzione color random

function getColorForAlbumPage() {
  const colorThief = new ColorThief();
  const img = document.getElementById("album-page-image-color");
  console.log(img.src);

  // Make sure image is finished loading
  if (img) {
    let arrayColor = colorThief.getColor(img);
    let color = arrayColor.toString();
    console.log(color);
    return color;
  } else {
    img.addEventListener("load", function () {
      colorThief.getColor(img);
    });
  }
}

function albumPageBackground() {
  const nav = document.getElementById("album-page-navbar-sticky");
  const header = document.getElementById("album-page-header");
  let color = getColorForAlbumPage();
  nav.style.backgroundColor = `rgb(${color})`;
  header.style = `background: linear-gradient(180deg, rgba(${color},1) 0%, rgba(18,18,18,1) 33%);`;
}

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

function innerAlbumPage(album, artist) {
  const cover = album.cover_medium;
  console.log(cover);
  const title = album.title;
  const artistName = artist.name;

  const page = document.getElementById("page-container");
  console.log(page);
  page.innerHTML = `<div class="container-fluid m-0 ps-0" id="inner-body">
  <nav class="row align-content-center album-page-header-padding sticky-top py-1" id="album-page-navbar-sticky">
    <div class="col-3 pt-1">
      <button class="rounded-circle border-0" style="background-color: #131313">
        <img src="./assets/arrow-prev-small-svgrepo-com.svg" alt="" srcset="" class="rounded-circle" />
      </button>
      <button class="rounded-circle border-0" style="background-color: #131313">
        <img src="./assets/arrow-next-small-svgrepo-com.svg" alt="" srcset="" class="rounded-circle" />
      </button>
    </div>

    <div class="col-9 text-end px-0">
      <button type="button" class="btn btn-light rounded-pill fw-bold px-3">Esplora Premium</button>
      <button type="button" class="btn rounded-circle fw-bold" style="background-color: #131313">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="26"
          fill="currentColor"
          class="bi bi-bell"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
          />
        </svg>
      </button>
      <button
        type="button"
        class="btn rounded-circle fw-bold"
        style="background-color: #131313"
        id="btnFriends"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="26"
          fill="currentColor"
          class="bi bi-people-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
          />
        </svg>
      </button>
      <!-- logo avatr profilo -->
      <button
        type="button"
        id="btnlogoAvatar"
        class="btn border-0 dropdown-toggle dropdown-toggle-split text-white rounded-pill overflow-hiddens fs-4 pe-3 d-inline-flex align-items-center"
        style="background-color: #0a0a0a"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdR-W0o7aRlmTTSDUnIZuUEu1GR5nx7Zarsw&usqp=CAU"
          class="rounded-circle"
          width="36rem"
          alt="logo"
        />
        <span class="fs-6 ps-2">Lidia Nautilus... </span>
        <span class="px-2"></span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end me-2">
        <li>
          <a class="dropdown-item d-flex justify-content-between" href="#"
            ><span>Account</span>
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                />
                <path
                  fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                /></svg></span
          ></a>
        </li>
        <li><a class="dropdown-item" href="#"> Profilo</a></li>
        <li>
          <a class="dropdown-item d-flex justify-content-between g-2" href="#"
            ><span>Effettua l'upgrade a Premium</span>
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="ms-3"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                />
                <path
                  fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                /></svg></span
          ></a>
        </li>
        <li><a class="dropdown-item" href="#"> Sessione privata</a></li>
        <li><a class="dropdown-item" href="#"> Impostazioni</a></li>
        <hr />
        <li><a class="dropdown-item" href="#"> Esci</a></li>
      </ul>
    </div>
  </nav>

  <!-- HEADER PAGE ALBUM -->
  <div class="row pb-5" id="album-page-header">
    <div class="row align-items-end px-0 py-5 album-page-header-padding">
      <!-- cover e title album -->
      <div class="col-md-3">
        <div class="d-flex album-page-image-container" >
          <img
            src=${cover}
            width="100%"
            height="100%"
            alt=""
            id="album-page-image-color"
            crossorigin="anonymous"
          />
        </div>
      </div>
      <div class="col-md-9">
        <p class="text-uppercase small text-secondary d-none d-md-block mb-0">ALBUM</p>
        <p class="album-page-main-title-mobile mb-0" id="album-page-title-album">${artistName}</p>
        <p class="album-page-list-fs-small text-secondary d-none d-md-block">
          Globale: il tuo aggiornamento quotidiano sui brani più ascoltati in questo momento.
        </p>
        <div class="d-md-flex align-items-center album-page-info album-page-list-fs-small">
          <div class="d-flex align-items-center">
            <img
              src=${cover}
              width="40px"
              height="40px"
              class="rounded-circle"
              alt=""
            />
            <p class="fw-bolder" id="album-page-artist">${title}</p>
          </div>
          
        </div>
      </div>
    </div>
    <!-- tasti play preferiti e elenco -->
    <div
      class="d-flex align-items-center py-4 text-secondary px-0 album-page-header-padding"
      id="album-page-icons-songs"
    >
      <div class="d-flex align-items-center order-last order-md-0 ms-auto ms-md-0">
        <!-- btn-random -->
        <button class="player-btn text-secondary d-block d-md-none">
          <svg
            fill="currentColor"
            width="30"
            height="30"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            class="me-4"
          >
            <path
              d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"
            ></path>
            <path
              d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"
            ></path>
          </svg>
        </button>
        <!-- btn-play -->
        <div class="btn-page-album-play">
          <svg
            fill="currentColor"
            width="25"
            height="25"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="Svg-sc-ytk21e-0 bneLcE"
          >
            <path
              d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
            ></path>
          </svg>
        </div>
      </div>
      <!-- btn-prefer -->
      <svg
        fill="currentColor"
        width="30"
        height="30"
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        class="mx-md-4 album-page-icons-md-mobile"
      >
        <path
          d="M5.21 1.57a6.757 6.757 0 0 1 6.708 1.545.124.124 0 0 0 .165 0 6.741 6.741 0 0 1 5.715-1.78l.004.001a6.802 6.802 0 0 1 5.571 5.376v.003a6.689 6.689 0 0 1-1.49 5.655l-7.954 9.48a2.518 2.518 0 0 1-3.857 0L2.12 12.37A6.683 6.683 0 0 1 .627 6.714 6.757 6.757 0 0 1 5.21 1.57zm3.12 1.803a4.757 4.757 0 0 0-5.74 3.725l-.001.002a4.684 4.684 0 0 0 1.049 3.969l.009.01 7.958 9.485a.518.518 0 0 0 .79 0l7.968-9.495a4.688 4.688 0 0 0 1.049-3.965 4.803 4.803 0 0 0-3.931-3.794 4.74 4.74 0 0 0-4.023 1.256l-.008.008a2.123 2.123 0 0 1-2.9 0l-.007-.007a4.757 4.757 0 0 0-2.214-1.194z"
        ></path>
      </svg>
      <!-- btn-arrow-down -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-arrow-down-circle mx-5 d-md-none"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
        />
      </svg>
      <!-- btn-points -->
      <svg
        fill="currentColor"
        width="30"
        height="30"
        data-encore-id="icon"
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        transform="rotate(90)"
        class="album-page-icon-middle-points"
      >
        <path
          d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
        ></path>
      </svg>

      <div class="justify-content-center ms-auto me-2 album-page-list d-none d-md-flex">
        <p class="fs-6 m-0">Elenco</p>
        <svg
          fill="currentColor"
          width="20"
          height="20"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
          class="ms-2"
        >
          <path
            d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"
          ></path>
        </svg>
      </div>
    </div>
    <!-- header descrizione album -->
    <div
      class="row border-bottom border-secondary pt-2 text-secondary d-none d-md-flex album-page-list-fs-small album-page-header-padding"
      id="album-page-header-list-song"
    >
      <div class="col-1">
        <p>#</p>
      </div>
      <div class="col-5">
        <p>Titolo</p>
      </div>
      <div class="col-3">
        <p>Album</p>
      </div>
      <div class="col-2">
        <p>Aggiunto il giorno</p>
      </div>
      <div class="col-1 ps-4">
        <svg
          fill="currentColor"
          width="20"
          height="20"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
          <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
        </svg>
      </div>
    </div>
    <div id="append"></div>
    <!-- titoli descrizione album -->
   
  </div>
  <!-- -------------------------------------------------------------------------------------------------------Luljeta -->

  <section id="consigliati" class="text-white album-page-header-padding">
    <h3 class="d-flex fs-5 align-items-center my-3">Altro di ciò che ti piace</h3>

    <div class="row row-gap-3 px-0">
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="./assets/imgs/main/image-11.jpg" class="card-img-top img-fluid" alt="..." />
          <div class="card-body px-0">
            <h5 class="card-title text-white">Mix anni 2010</h5>
            <p class="card-text text-body-secondary">artista,artista,artista,artista</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="./assets/imgs/main/image-11.jpg" class="card-img-top img-fluid" alt="..." />
          <div class="card-body px-0">
            <h5 class="card-title text-white">Mix anni 2010</h5>
            <p class="card-text text-body-secondary">artista,artista,artista,artista</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="./assets/imgs/main/image-11.jpg" class="card-img-top img-fluid" alt="..." />
          <div class="card-body px-0">
            <h5 class="card-title text-white">Mix anni 2010</h5>
            <p class="card-text text-body-secondary">artista,artista,artista,artista</p>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="./assets/imgs/main/image-11.jpg" class="card-img-top img-fluid" alt="..." />
          <div class="card-body px-0">
            <h5 class="card-title text-white">Mix anni 2010</h5>
            <p class="card-text text-body-secondary">artista,artista,artista,artista</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
<div class="container-fluid mt-5 fw-lighter album-page-header-padding" id="footer-page">
  <div class="d-md-flex mb-5">
    <ul class="list-group w-20">
      <li class="fw-bolder mb-2 mt-3">Azienda</li>
      <li>Chi siamo</li>
      <li>Opportunità di lavoro</li>
      <li>For the Record</li>
    </ul>
    <ul class="list-group w-20">
      <li class="fw-bolder mb-2 mt-3">Community</li>
      <li>Per artsti</li>
      <li>Sviluppatori</li>
      <li>Pubblicità</li>
      <li>Investitori</li>
      <li>Venditori</li>
    </ul>

    <div class="d-md-flex justify-content-between w-60 me-auto">
      <ul class="list-group">
        <li class="fw-bolder mb-2 mt-3">Link utili</li>
        <li>Assistenza</li>
        <li>App per cellulare</li>
        <li>App per cellure <br />gratuita</li>
        <li>Diritti del consumatore</li>
      </ul>
      <div class="d-flex mt-5 mt-md-0">
        <!-- ig -->
        <div class="album-page-icon-social-footer">
          <svg
            fill="currentColor"
            role="img"
            height="16"
            width="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-encore-id="icon"
            class="Svg-sc-ytk21e-0 hOjEcl"
          >
            <path
              d="M8 1.44c2.136 0 2.389.009 3.233.047.78.036 1.203.166 1.485.276.348.128.663.332.921.598.266.258.47.573.599.921.11.282.24.706.275 1.485.039.844.047 1.097.047 3.233s-.008 2.389-.047 3.232c-.035.78-.166 1.204-.275 1.486a2.654 2.654 0 01-1.518 1.518c-.282.11-.706.24-1.486.275-.843.039-1.097.047-3.233.047s-2.39-.008-3.232-.047c-.78-.035-1.204-.165-1.486-.275a2.477 2.477 0 01-.921-.599 2.477 2.477 0 01-.599-.92c-.11-.282-.24-.706-.275-1.486-.038-.844-.047-1.096-.047-3.232s.009-2.39.047-3.233c.036-.78.166-1.203.275-1.485.129-.348.333-.663.599-.921a2.49 2.49 0 01.92-.599c.283-.11.707-.24 1.487-.275.843-.038 1.096-.047 3.232-.047L8 1.441zm.001-1.442c-2.172 0-2.445.01-3.298.048-.854.04-1.435.176-1.943.373a3.928 3.928 0 00-1.417.923c-.407.4-.722.883-.923 1.417-.198.508-.333 1.09-.372 1.942C.01 5.552 0 5.826 0 8c0 2.172.01 2.445.048 3.298.04.853.174 1.433.372 1.941.2.534.516 1.017.923 1.417.4.407.883.722 1.417.923.508.198 1.09.333 1.942.372.852.039 1.126.048 3.299.048 2.172 0 2.445-.01 3.298-.048.853-.04 1.433-.174 1.94-.372a4.087 4.087 0 002.34-2.34c.199-.508.334-1.09.373-1.942.039-.851.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.853-.174-1.433-.372-1.94a3.924 3.924 0 00-.923-1.418A3.928 3.928 0 0013.24.42c-.508-.197-1.09-.333-1.942-.371-.851-.041-1.125-.05-3.298-.05l.001-.001z"
            ></path>
            <path
              d="M8 3.892a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm0 6.775a2.668 2.668 0 110-5.335 2.668 2.668 0 010 5.335zm4.27-5.978a.96.96 0 100-1.92.96.96 0 000 1.92z"
            ></path>
          </svg>
        </div>
        <!-- twitter -->
        <div class="album-page-icon-social-footer mx-3">
          <svg
            fill="currentColor"
            role="img"
            height="16"
            width="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-encore-id="icon"
            class="Svg-sc-ytk21e-0 hOjEcl"
          >
            <path
              d="M13.54 3.889a2.968 2.968 0 001.333-1.683 5.937 5.937 0 01-1.929.738 2.992 2.992 0 00-.996-.706 2.98 2.98 0 00-1.218-.254 2.92 2.92 0 00-2.143.889 2.929 2.929 0 00-.889 2.15c0 .212.027.442.08.691a8.475 8.475 0 01-3.484-.932A8.536 8.536 0 011.532 2.54a2.993 2.993 0 00-.413 1.523c0 .519.12 1 .361 1.445.24.445.57.805.988 1.08a2.873 2.873 0 01-1.373-.374v.04c0 .725.23 1.365.69 1.92a2.97 2.97 0 001.739 1.048 2.937 2.937 0 01-1.365.056 2.94 2.94 0 001.063 1.5 2.945 2.945 0 001.77.603 5.944 5.944 0 01-3.77 1.302c-.243 0-.484-.016-.722-.048A8.414 8.414 0 005.15 14c.905 0 1.763-.12 2.572-.361.81-.24 1.526-.57 2.147-.988a9.044 9.044 0 001.683-1.46c.5-.556.911-1.155 1.234-1.798a9.532 9.532 0 00.738-1.988 8.417 8.417 0 00.246-2.429 6.177 6.177 0 001.508-1.563c-.56.249-1.14.407-1.738.476z"
            ></path>
          </svg>
        </div>
        <!-- fb -->
        <div class="album-page-icon-social-footer">
          <svg
            fill="currentColor"
            role="img"
            height="16"
            width="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-encore-id="icon"
            class="Svg-sc-ytk21e-0 haNxPq"
          >
            <path
              d="M16 8a8 8 0 10-9.25 7.903v-5.59H4.719V8H6.75V6.237c0-2.005 1.194-3.112 3.022-3.112.875 0 1.79.156 1.79.156V5.25h-1.008c-.994 0-1.304.617-1.304 1.25V8h2.219l-.355 2.313H9.25v5.59A8.002 8.002 0 0016 8z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row py-5 border-top border-secondary">
      <div class="col-md-9 px-0">
        <p>
          <span>Informazioni legali</span>
          <span>Sicurezza e Centro sulla privacy</span>
          <span>Informativa sulla privacy</span>
          <span>Inpostazioni Cookie</span>
          <span>Info annunci</span>
          <span>Accessibilità</span>
        </p>
      </div>
      <div class="col-md-3 px-0">
        <p>&copy; 2024 Spotify AB</p>
      </div>
    </div>
  </div>
</div>
</div>`;
}

function getFetch(url, id) {
  fetch(url + id, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "56d9802fa4msh3c9b858e765d317p12378djsn46ec36243627",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then(response => {
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
    .then(oggetto => {
      console.log(oggetto);
      const data = oggetto.data;
      const album = data[0].album;
      const artist = data[0].artist;
      console.log(album.id);

      innerAlbumPage(album, artist);
      fetch(getAlbum + album.id, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "56d9802fa4msh3c9b858e765d317p12378djsn46ec36243627",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then(response => {
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
        .then(oggetto => {
          const tracks = oggetto.tracks.data;
          console.log("2", tracks);
          for (let i = 0; i < 7; i++) {
            const list = document.getElementById("append");
            const item = document.createElement("div");
            item.classList.add(
              "row",
              "justify-content-center",
              "align-items-center",
              "my-2",
              "py-2",
              "text-secondary",
              "album-page-header-padding",
              "album-page-list-row"
            );
            item.innerHTML = `<div class="col-1 d-none d-md-flex"><div class="album-page-list-fs-small">${[i]}</div>
              </div>
              <div class="col-11 col-md-5">
                <div class="d-flex align-items-center">
                  <div class="img-container-album-song me-2 d-none d-md-flex">
                    <img src="${tracks[i].album.cover_medium}" width="100%" height="100%" alt="" />
                  </div>
                  <div>
                    <div class="text-white" id="album-page-list-title">${tracks[i].title}</div>
                    <div class="album-page-list-fs-small" id="album-page-list-artist">${tracks[i].artist.name}</div>
                  </div>
                </div>
              </div>
              <div class="col-3 d-none d-md-flex">
                <div class="album-page-list-fs-small" id="album-page-list-album">${tracks[i].album.title}</div>
              </div>
              <div class="col-2 d-none d-md-flex"></div>
              <div class="col-1 d-none d-md-flex">
                <div class="album-page-list-fs-small" id="album-page-list-timing">${tracks[i].duration}</div>
              </div>
              <div class="col-1 d-md-none">
                <!-- btn-points -->
                <svg fill="currentColor" width="30" height="30" data-encore-id="icon" role="img" aria-hidden="true"
                  viewBox="0 0 24 24" transform="rotate(90)">
                  <path
                    d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z">
                  </path>
                </svg>
              </div>
            </div>
            </div>`;
            list.appendChild(item);
          }
          getColorForAlbumPage();
          albumPageBackground();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

const id = new URLSearchParams(window.location.search).get("idAlbum");

getFetch(apiSearch, id);