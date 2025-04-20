console.log("Javascript starts!");
let currentSong = new Audio();

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

const  playMusic = (track,pause=false)=>{
    currentSong.src = "/songs/" + track
    // let audio = new Audio("/songs/" + track)
    if(!pause){
        currentSong.play();
        play.src = "pause.svg"
    }
    document.querySelector(".songName").innerHTML = decodeURI(track)
    // document.querySelector(".songTimeMin").innerHTML = "00:00/00:00"

}

function secondsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
}


async function main() {
    let songs = await getSongs()
    playMusic(songs[0] , true)// Helps to play the first song when u randomly click on play 

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
    
    //Attach an event listener to every song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",elements=>{
        console.log(e.querySelector(".songInfo").firstElementChild.innerHTML)
        playMusic(e.querySelector(".songInfo").firstElementChild.innerHTML.trim())
    })
    })

    // Attach an event listener to play the previous and next song
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    //To display the current time of the song
        currentSong.addEventListener("timeupdate" , ()=>{
        // console.log(currentSong.currentTime , currentSong.duration);
        document.querySelector(".songTimeMin").innerHTML = 
        `${secondsToMinutesSeconds(currentSong.currentTime)}`
        document.querySelector(".songDuration").innerHTML = 
        `${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left =
         (currentSong.currentTime/currentSong.duration) * 100 + "%";
    });

    //Handle the seekbar
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%"
         currentSong.currentTime = ((currentSong.duration)* percent) / 100;
         document.querySelector(".seekbar").style.background = `linear-gradient(to right, #1ed760 ${percent}%, #ccc ${percent}%)`;

    })

    //To add the hamburger in mobile
    document.querySelector(".hamburger").addEventListener("click" , ()=>{
        document.querySelector(".left").style.left = "0"
    })

    //To close the hamburger 
    document.querySelector(".close").addEventListener("click" , ()=>{
        document.querySelector(".left").style.left = "-120%"
    })
    
}

main()