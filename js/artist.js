


















let actTrack = {
    name: "",
    artist: "",
    image: "",
    path: ""
}

let artistTrackList = []
let track_index

const numbSplit = (num) => {
  num = num.split("").reverse();
  for (let i = 2; i < num.length; i += 4) {
    if (typeof num[i + 1] === typeof "") {
      num.splice(i + 1, 0, ".");
    }
  }
  return (num = num.reverse().join(""));
};

const secToMin = (sec) => {
  sec = sec.split("");
  sec.splice(1, 0, ":");
  return (sec = sec.join(""));
};

const artistID = Math.floor(Math.random() * 5000);
console.log(artistID);
const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + 3951;
fetch(url)
  .then((response) => {
    console.log(response);

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
  .then((artist) => {
    const artistName = document.getElementsByClassName("artistName")[0];
    artistName.innerText = artist.name;
    const bgArtist = document.getElementsByClassName("bg-artist")[0];
    bgArtist.style.backgroundImage = "url('" + artist.picture_xl + "')";
    const monthlyListeners =
      document.getElementsByClassName("monthlyListeners")[0];
    monthlyListeners.innerText =
      numbSplit(String(artist.nb_fan)) + " " + "ascoltatori mensili";
    const artistNameRight =
      document.getElementsByClassName("artistNameRight")[0];
    artistNameRight.innerHTML = artist.name;
    const artistImgLikeSection = document.getElementsByClassName(
      "artistImgLikeSection"
    )[0];
    artistImgLikeSection.src = artist.picture;

    const URLTrackList = artist.tracklist;

    fetch(URLTrackList)
      .then((response) => {
        console.log(response);

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

      .then((tracklist) => {
        const artistSongsContainer = document.getElementsByClassName(
          "artistSongsContainer"
        )[0];
        console.log(tracklist.data);
        for (let i = 0; i < 5; i++) {
          const artistSongGenerate = document.createElement("div");
          artistSongGenerate.innerHTML = `<div class="artistSong d-flex justify-content-between align-items-center mb-4">
                                        <div class="d-flex align-items-center">
                                            <p class="numberArtistSong m-0">${
                                              i + 1
                                            }</p>
                                            <img src=${
                                              tracklist.data[i].album.cover
                                            } alt="" class="ms-4" style="width: 40px; height: 40px;">
                                            <p class="nameArtistSong m-0 ms-3" style="width: 6.563rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${
                                              tracklist.data[i].title_short
                                            }</p>
                                        </div>
                                        <p class="reprudactionNumber m-0 text-secondary-emphasis">276.616.912</p>
                                        <p class="songDuration m-0 d-none d-sm-inline-block text-secondary-emphasis">${secToMin(
                                          String(tracklist.data[i].duration)
                                        )}</p>
                                    </div>`;

          artistSongsContainer.appendChild(artistSongGenerate);

                                    const artistSong = document.getElementsByClassName("artistSong")[i]
                                    artistSong.onclick = (e) => {
                                        const nameSong = e.target.firstChild.data
                                        let urlMp3Track = ""
                                        let artistTrack = ""
                                        let titleTrack = ""
                                        let imgTrack = ""
                                        
                                        for (let i = 0; i < tracklist.data.length; i++) {
                                            if (nameSong === tracklist.data[i].title) {
                                                track_index = i
                                                urlMp3Track = tracklist.data[track_index].preview
                                                artistTrack = tracklist.data[track_index].contributors[0].name
                                                titleTrack = tracklist.data[track_index].title_short
                                                imgTrack = tracklist.data[track_index].album.cover
                                                
                                            }
                                            
                                        }
                                        
                                
                                        
                                        actTrack.name = titleTrack
                                        actTrack.artist = artistTrack
                                        actTrack.image = imgTrack
                                        actTrack.path = urlMp3Track
                                        
                                        
                                        loadTrack(actTrack);
                                        
                                        
                                    }
                                    
                                }
                                
                                const artistSongsContainerMore = document.createElement("div")
                                artistSongsContainerMore.classList = "d-flex flex-column artistSongsContainerMore d-none"
                                const showMoreArtist = document.createElement("p")
                                showMoreArtist.innerText = "VISUALIZZA ALTRO"
                                showMoreArtist.style.cursor = "pointer"
                                showMoreArtist.classList = "fw-bold showMoreArtist"
                                artistSongsContainer.appendChild(artistSongsContainerMore)
                                
                                if (tracklist.data.length > 5) {
                                    artistSongsContainer.appendChild(showMoreArtist)
                                }
                                
                                let trackListLenght = 0
                                if (tracklist.data.length >= 10) {
                    trackListLenght = 10
                    
                } else {
                    if (tracklist.data.length < 10) {
                    trackListLenght = tracklist.data.length
                    
                    
                }
                }
                
                for (let i = 5; i < trackListLenght; i++) {
                    const artistSongGenerate = document.createElement("div")
                    
                    
                    
                    
                    
                    artistSongGenerate.innerHTML = `<div class="artistSong d-flex justify-content-between align-items-center mb-4">
                    <div class="d-flex align-items-center">
                    <p class="numberArtistSong m-0">${i + 1}</p>
                    <img src=${tracklist.data[i].album.cover} alt="" class="ms-4" style="width: 40px; height: 40px;">
                    <p class="nameArtistSong m-0 ms-3" style="width: 6.563rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tracklist.data[i].title_short}</p>
                    </div>
                    <p class="reprudactionNumber m-0 text-secondary-emphasis">276.616.912</p>
                    <p class="songDuration m-0 d-none d-sm-inline-block text-secondary-emphasis">${secToMin(String(tracklist.data[i].duration))}</p>
                    </div>`
                    artistSongsContainerMore.appendChild(artistSongGenerate)
                    const artistSong = document.getElementsByClassName("artistSong")[i]
                    artistSong.onclick = (e) => {
                        const nameSong = e.target.firstChild.data
                        let urlMp3Track = ""
                        let trackDuration = ""
                        let artistTrack = ""
                        let titleTrack = ""
                        let imgTrack = ""
                        for (let i = 0; i < tracklist.data.length; i++) {
                            if (nameSong === tracklist.data[i].title_short) {
                                track_index = i
                                 urlMp3Track = tracklist.data[track_index].preview
                                 artistTrack = tracklist.data[track_index].contributors[0].name
                                titleTrack = tracklist.data[track_index].title_short
                                imgTrack = tracklist.data[track_index].album.cover
                            }
                            
                        }
                        
                        
                        actTrack.name = titleTrack
                        actTrack.artist = artistTrack
                        actTrack.image = imgTrack
                        actTrack.path = urlMp3Track
                        
                                        
                        loadTrack(actTrack);
                        
                        
                        
                    }
                    
                }
                
                showMoreArtist.onclick = () => {
                    showMoreArtist.innerText = "VISUALIZZA MENO"
                    if (artistSongsContainerMore.classList.contains("d-none")) {
                        artistSongsContainerMore.classList.remove("d-none")
                        
                    } else {
                        showMoreArtist.innerText = "VISUALIZZA ALTRO"
                        artistSongsContainerMore.classList = "d-none"
                        
                    }
                    
                }
                
                
                
                
            })
            .catch(err => console.log(err))
            
            
        })
        .catch(err => console.log(err))
        
        
        
        /*-----------------------------------------AUDIO PLAYER-----------------------------------*/
        let now_playing = document.querySelector(".now-playing");
        let track_art = document.querySelector(".track-art");
        let track_name = document.querySelector(".track-name");
        let track_artist = document.querySelector(".track-artist");
        
        let playpause_btn = document.querySelector(".playpause-track");
        let next_btn = document.querySelector(".next-track");
        let prev_btn = document.querySelector(".prev-track");
        
        let seek_slider = document.querySelector(".seek_slider");
        let volume_slider = document.querySelector(".volume_slider");
        let curr_time = document.querySelector(".current-time");
        let total_duration = document.querySelector(".total-duration");
        
        
        let isPlaying = false;
        let updateTimer;
        
        // Create new audio element
        let curr_track = document.createElement('audio');
        
        // Define the tracks that have to be played
        
        
        function random_bg_color() {
            
            // Get a number between 64 to 256 (for getting lighter colors)
            let red = Math.floor(Math.random() * 256) + 64;
            let green = Math.floor(Math.random() * 256) + 64;
            let blue = Math.floor(Math.random() * 256) + 64;
            
            // Construct a color withe the given values
            let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
            
            // Set the background to that color
            document.body.style.background = bgColor;
        }
        
        function loadTrack(actTrack) {
            clearInterval(updateTimer);
            resetValues();  
            
            curr_track.src = actTrack.path;
            curr_track.play();
            playTrack()
            
            track_art.style.backgroundImage = "url(" + actTrack.image + ")";
            track_name.textContent = actTrack.name;
            track_artist.textContent = actTrack.artist;
            
            updateTimer = setInterval(seekUpdate, 1000);
            curr_track.addEventListener("ended", nextTrack);
            random_bg_color();
        }
          
        
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}




function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index > 0)
    track_index += 1;
  else track_index = 1;                 
  actTrack.name = artistTrackList.data[track_index].title_short
  actTrack.artist = artistTrackList.data[track_index].contributors[0].name
  actTrack.image = artistTrackList.data[track_index].album.cover
  actTrack.path = artistTrackList.data[track_index].preview
  loadTrack(actTrack);
  playTrack();
  
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = 1;
  actTrack.name = artistTrackList.data[track_index].title_short
  actTrack.artist = artistTrackList.data[track_index].contributors[0].name
  actTrack.image = artistTrackList.data[track_index].album.cover
  actTrack.path = artistTrackList.data[track_index].preview
  loadTrack(actTrack);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


/*-----------------------------------------AUDIO PLAYER-----------------------------------*/
            

            
