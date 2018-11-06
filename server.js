const express = require("express");
const app = express();
const path = require("path");

const videoStream = require('./videostream')
app.use('/', express.static(path.join(__dirname, 'client')))
app.use('/',videoStream)
app.use('/videos',express.static(
  path.join(__dirname,"/videos")
))


app.listen(3005,()=>
{
console.log("Server running at port 3005")
});
