const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require('express-fileupload')
const fs = require('fs');
var videoInfo = JSON.parse(fs.readFileSync('./files.json'));
var vidCount = videoInfo.length;
app.use(fileUpload());

setInterval(nextVideo,5000)
function nextVideo()
{
  newVideoData = videoInfo.shift()
  fs.writeFileSync('./files.json',JSON.stringify(videoInfo,null,2))

}
app.use('/', express.static(path.join(__dirname, 'client')))

app.use('/videos',express.static(
  path.join(__dirname,"/videos")
))
app.get('/getNextVideo',(req,res)=>{
    if(!videoInfo[0])
    {
      res.send(
        {
          link:'/videos/default.mp4',
          length:5,
          score:69
        }
      )
    }
    else
    {
    res.send(videoInfo[0]);
  }
})

app.post('/upload',(req,res) =>
{

  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let sampleFile = req.files.sampleFile
  sampleFile.mv(path.join(__dirname,"/videos/",vidCount+".mp4"), function(err) {
    if (err)
    {
      return res.status(500).send(err);
    }

    videoInfo.push(
      {
        link:'/videos/' + vidCount +".mp4",
        length:5,
        score:0
      });
      fs.writeFileSync('./files.json',JSON.stringify(videoInfo,null,2))
      
      vidCount = vidCount + 1;
  });
})

app.listen(3005,()=>
{
console.log("Server running at port 3005")
});
