const express = require("express");
const path = require('path');
const cors = require('cors');
const { createUnzip } = require("zlib");
const services = require('./services/services');

const PubSub = require('pubsub-js');
const { addAbortSignal } = require("stream");

const PORT = process.env.PORT || 3001;

const app = express();

// Autoriza o front-end a acessar o servidor
app.use(cors({ 
    origin: 'http://localhost:3000'
}));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/search/trends',function(req,res){
  let response = {};
  let body = "";
  req.on("data",function(chunk){
    body += chunk;
  })
  req.on("end", function(){
    res.writeHead(200, { "Content-Type": "text/html" });
    services.interestTime(JSON.parse(body).message).then(res => {
      response = services.loadTrend(res);
    }).then(() => {
      res.end(JSON.stringify(response));
    })
  });
})

app.post('/search/youtube', function(req,res){
  let response = [];
  let body = "";
  req.on("data",function(chunk){
    body += chunk;
  })
  req.on("end", function(){
    res.writeHead(200, { "Content-Type": "text/html" });
    services.getVideo(JSON.parse(body).message).then(res => {
      response = res
    }).then(() => {
      res.end(JSON.stringify(response));
    })
  });
})

app.post('/search/tiktok', function (req,res){
  let body = "";
  let response = {viewCount:0,videoCount:0};
  req.on("data",function(chunk){
    body += chunk;
  })
  req.on("end", function(){
    res.writeHead(200, { "Content-Type": "text/html" });
    services.getTikTokHashtag(JSON.parse(body).message).then(res => {
      response.viewCount = res.stats.viewCount;
      response.videoCount = res.stats.videoCount;
    }).then(() => {
      res.end(JSON.stringify(response));
    })
  });
})

app.post('/search/twitter', function (req, res) {
  let body = "";
  let response = "r";
  req.on("data",function(chunk){
    body += chunk;
  })
  req.on("end", function(){
    res.writeHead(200, { "Content-Type": "text/html" });
    services.getTweetVolume(JSON.parse(body).message).then(res => {
      response = services.loadTweets(res)
    }).then(() => {
      res.end(JSON.stringify(response));
    })
  });
})


/*app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});*/
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

