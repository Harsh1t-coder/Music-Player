let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played

let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName : "Namo Namo", filePath: "songs/1.mp3", coverPath : "covers/1.jpg"},
    {songName : "Gangster", filePath: "songs/2.mp3", coverPath : "covers/2.jpg"},
    {songName : "Believer", filePath: "songs/3.mp3", coverPath : "covers/3.jpg"},
    {songName : "Let Me Love You", filePath: "songs/4.mp3", coverPath : "covers/4.jpg"},
    {songName : "Kya Baat Hai", filePath: "songs/5.mp3", coverPath : "covers/5.jpg"},
    {songName : "Jalebi Baby",      filePath: "songs/6.mp3", coverPath : "covers/6.jpg"},
    {songName : "Kehndi Hundi Si ", filePath: "songs/7.mp3", coverPath : "covers/7.jpg"},
    {songName : "G.O.A.T", filePath: "songs/8.mp3", coverPath : "covers/8.jpg"},
    {songName : "Haryanvi Mashup 3", filePath: "songs/9.mp3", coverPath : "covers/9.jpg"},
    {songName : "Era", filePath: "songs/9.mp3", coverPath : "covers/10.jpg"},
];
songItems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
 })


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = songs[track_index].filePath;
  curr_track.load();
  track_name.textContent = songs[track_index].songName;


  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';;
}

function nextTrack() {
  if (track_index < songs.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = songs.length;
  loadTrack(track_index);
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
