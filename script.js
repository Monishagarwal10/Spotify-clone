console.log("Javascript starts!");

async function getSongs() {
    let a= await fetch("http://127.0.0.1:5500/songs/")
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
    for (const song of 'songs') {
        songUl.innerHTML = songUl.innerHTML + '<li> ${song} </li>';
        
    }
    
    var audio = new Audio(songs[0]);
    // audio.play();// plays the first song

    audio.addEventListener("loadeddata",()=>{
        console.log(audio.duration,audio.currentSrc,audio.currentTime)// it will help to show the duration of songs in sec
    })
}

main()