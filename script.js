console.log("Welcome to In(&)Out!!");

let songIndex = 0 ;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let iid = 0;
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {id:0,songName : "Namo Namo", filePath: "songs/1.mp3", coverPath : "covers/1.jpg"},
    {id:1,songName : "Gangster", filePath: "songs/2.mp3", coverPath : "covers/2.jpg"},
    {id:2,songName : "Believer", filePath: "songs/3.mp3", coverPath : "covers/3.jpg"},
    {id:3,songName : "Let Me Love You", filePath: "songs/4.mp3", coverPath : "covers/4.jpg"},
    {id:4,songName : "Kya Baat Hai", filePath: "songs/5.mp3", coverPath : "covers/5.jpg"},
    {id:5,songName : "Jalebi Baby",      filePath: "songs/6.mp3", coverPath : "covers/6.jpg"},
    {id:6,songName : "Kehndi Hundi Si Chan Tak Raah Bana De", filePath: "songs/7.mp3", coverPath : "covers/7.jpg"},
    {id:7,songName : "G.O.A.T", filePath: "songs/8.mp3", coverPath : "covers/8.jpg"},
    {id:8,songName : "Haryanvi Mashup 3", filePath: "songs/9.mp3", coverPath : "covers/9.jpg"},
    {id:9,songName : "Era", filePath: "songs/9.mp3", coverPath : "covers/10.jpg"},
]

songItems.forEach((element,i)=>{
   // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', ()=>{
if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    element.getElementsByClassName("songInfo").innerHTML=songs[iid].songName;
}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity=0;
}
})
audioElement.addEventListener('timeupdate' ,() =>{
    //console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        e.target.classList.add('fa-pause-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',()=>{
    console.log(e.target);
    makeAllPlays();
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    })
})