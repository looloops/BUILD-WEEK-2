const body = document.getElementsByClassName("body")[0];
const btnFriends = document.getElementById("btnFriends");
const sectionFriends = document.getElementById("sectionFriends");

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
