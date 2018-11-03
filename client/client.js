
  setInterval(loadNextVideo,5000)


function loadNextVideo() {
  fetch('/getNextVideo').then(
    res => res.json()
  ).then(videoInfo => {

   let video = document.getElementById("video")
   let source = document.getElementById("source")
   source.src = videoInfo.link;
   video.load();
  })
}
