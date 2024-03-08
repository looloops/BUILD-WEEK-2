const body = document.getElementsByClassName("body")[0]; //div centrale pagina
const btnFriends = document.getElementById("btnFriends"); //bottone amici navbar
const sectionFriends = document.getElementsByClassName("sectionFriends")[0]; //sezione amici creata da samuele

function showRemove(elemento,add,remove){
  elemento.classList.add(add)
  elemento.classList.remove(remove)
}

//funzione che nasconde/mostra la sezione amici
function hiddenSectionfriends() {
  //caso che siamo sopre a 1200 di schermo
  //gestione apertura
  if (
    window.innerWidth >= 1200 &&
    sectionFriends.classList.contains("hidden")
  ) {
    if (libreria.classList.contains("show")) {
      //contollo se libreria è aperta e apro amici
      sectionFriends.classList.remove("hidden");
      sectionFriends.classList.add("show");
      body.className = "col body";
    } else {
      //caso libreria chiusa e apro amici
      sectionFriends.classList.remove("hidden");
      sectionFriends.classList.add("show");
      body.className = "col body";
    }
    //gestine chiusura
  } else if (window.innerWidth >= 1200 && libreria.classList.contains("show")) {
    //chiudo amici ma controllo se libreria è aperta
    showRemove(sectionFriends,"hidden","show")
    body.className = "col body";
  } else if (window.innerWidth >= 1200) {
    //caso libreria chiusa
    sectionFriends.classList.remove("show");
    sectionFriends.classList.add("hidden");
    body.className = "col body";
  } else if (libreria.classList.contains("show") && sectionFriends.classList.contains("hidden")) { //gestione sotto i 1200 px
     //vedo se libreria è aperta
    //---------------------apertura section friend 
    body.className = "col-9 body";
    showRemove(libreria,"hidden","show")
    showRemove(libreriaSm,"show","hidden")
    showRemove(sectionFriends,"show","hidden")

  } else {
    //librera chiusa
    if (sectionFriends.classList.contains("hidden")) {
      console.log("paolo")
      //mi apre friends
      showRemove(sectionFriends,"show","hidden")
      body.className = "col body";
    } else {
      //mi chiude friends
      console.log("mm")
      showRemove(sectionFriends,"hidden","show")
      body.className = "col body";
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


// window.innerWidth < 992
//   ? showRemove(libreriaSm,"hidden","show")
//   :showRemove(libreriaSm,"show","hidden");

btnLibreria.onclick = () => {
  hiddenLibreria();
};
btnlibreriaSm.onclick = () => {
  hiddenLibreria2();
};

function hiddenLibreria() {
  if (window.innerWidth >= 1200) {
    if (sectionFriends.classList.contains("show")) {
      //sezione amici aperta
      showRemove(libreria,"hidden","show")
      body.className = "col body";
      showRemove(libreriaSm,"show","hidden")
    } else {
      //sezione amici chiusa
      showRemove(libreria,"hidden","show")
      body.className = "col body";
      showRemove(libreriaSm,"show","hidden")
    }
  } else {
    //sotto i 1200
    showRemove(libreria,"hidden","show")
    body.className = "col body";
    showRemove(libreriaSm,"show","hidden")
    showRemove(sectionFriends,"hidden","show")
  }
}
function hiddenLibreria2() {
  if (window.innerWidth >= 1200) {
    if (sectionFriends.classList.contains("show")) {
      //sezione amici aperta
      showRemove(libreria,"show","hidden")
      body.className = "col body";
      showRemove(libreriaSm,"hidden","show")
    } else {
      //sezioni amici chiusa
      showRemove(libreria,"show","hidden")
      body.className = "col body";
      showRemove(libreriaSm,"hidden","show")
    }
  } else {
    //sotto i 1200
    showRemove(libreria,"show","hidden")
    body.className = "col body";
    showRemove(libreriaSm,"hidden","show")
    showRemove(sectionFriends,"hidden","show")
  }
}
//funzione chiusura friend da tasto x in alto
const closeBtnFriends = document.getElementById("close-btn-friend-section");
closeBtnFriends.onclick = () => {
  showRemove(sectionFriends,"hidden","show")

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

