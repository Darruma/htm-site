const express = require('express');
const router = express.Router()
const fs = require('fs');
const fileUpload = require('express-fileupload')


var videoInfo = JSON.parse(fs.readFileSync('./files.json'));
var vidCount = videoInfo.length;
app.use(fileUpload());

setInterval(nextVideo,5000)
function nextVideo()
{
  newVideoData = videoInfo.shift()
  fs.writeFileSync('./files.json',JSON.stringify(videoInfo,null,2))
}


//Client get Next Video
router.get('/getNextVideo',(req,res)=>{
    if(!videoInfo[0])
    {
      res.send(
        {
          link:'/videos/default.mp4',
          length:5,
          score:0
        }
      )
    }
    else
    {
    res.send(videoInfo[0]);
  }
})
//Client Upload
router.post('/upload',(req,res) =>
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





module.exports = router;