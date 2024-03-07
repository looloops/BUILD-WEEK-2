const numbSplit = (num) => {
    num = num.split("").reverse()
    for (let i = 2; i < num.length; i+=4) {
      if (typeof num[i + 1] === typeof "") {
        num.splice(i + 1, 0, ".")
      }
    }
    return num = num.reverse().join("")
    }

const secToMin = (sec) => {
     sec = sec.split("")
     sec.splice(1,0,":")
     return sec = sec.join("")
    }



const artistID = Math.floor(Math.random()*5000)
const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistID




fetch(URL)
            .then(response => {
                console.log(response)

                if (response.ok) {
                    return response.json()
                } else {
                    if (response.status === 400) {
                        throw new Error("400 - Errore lato client")
                    }

                    if (response.status === 404) {
                        throw new Error("404 - Dato non trovato")
                    }

                    if (response.status === 500) {
                        throw new Error("500 - Errore lato server")
                    }

                    throw new Error("Errore nel reperimento dati")
                }
            })

            .then(artist => {
                const artistName = document.getElementsByClassName("artistName")[0]
                artistName.innerText = artist.name
                const bgArtist = document.getElementsByClassName("bg-artist")[0]
                bgArtist.style.backgroundImage =  "url('"+ artist.picture_xl +"')"
                const monthlyListeners = document.getElementsByClassName("monthlyListeners")[0]
                monthlyListeners.innerText = numbSplit(String(artist.nb_fan)) + " " + "ascoltatori mensili"
                const artistNameRight = document.getElementsByClassName("artistNameRight")[0]
                artistNameRight.innerHTML = artist.name
                const artistImgLikeSection = document.getElementsByClassName("artistImgLikeSection")[0]
                artistImgLikeSection.src =artist.picture
                
                const URLTrackList = artist.tracklist
                

                fetch(URLTrackList)
            .then(response => {
                console.log(response)

                if (response.ok) {
                    return response.json()
                } else {
                    if (response.status === 400) {
                        throw new Error("400 - Errore lato client")
                    }

                    if (response.status === 404) {
                        throw new Error("404 - Dato non trovato")
                    }

                    if (response.status === 500) {
                        throw new Error("500 - Errore lato server")
                    }

                    throw new Error("Errore nel reperimento dati")
                }
            })

            .then(tracklist => {
                const artistSongsContainer = document.getElementsByClassName("artistSongsContainer")[0]
                for (let i = 0; i < 5; i++) {
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
                artistSongsContainer.appendChild(artistSongGenerate)
                
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
            
            

            