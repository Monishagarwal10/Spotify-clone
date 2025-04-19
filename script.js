console.log("Javascript starts!");

async function getSongs() {
    let a= await fetch("http://127.0.0.1:5500/songs/")//To fetch all  the songs from the folder
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for( let index = 0;index < as.length;index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs; 
}

async function main() {
    let songs = await getSongs()
    console.log(songs);//get the list of all songs

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> 
        
        <img class="buttonlogos  invert  "  src="musical-note.png " alt="">
                  <div class="songInfo">
                    <div> ${song.replaceAll("%20"," ")}</div>
                    <div>Arijit Singh</div>
                  </div>
                  <div id="playnow">
                    <span>Play Now</span>
                    <div> <img class="buttonlogos  invert  playHover"   src="playnow.png" alt=""></div>
                  </div>
        </li>`;
        
    }
    
    

    
}

main()