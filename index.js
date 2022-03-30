const axios = require('axios')
const express = require('express')
const http=require('http')
const app = express();
const port = 8080
const server=http.createServer(app)
const fs = require('fs')

const apiUrl= 'https://dapi.kakao.com/v2/local/search/keyword.json?query=';
const apiKey= {'Authorization':'KakaoAK 카카오api키'};
let kakaoData;
let serchKeyword='';

app.use(express.json());
app.use(express.static('./'));

app.get('/',(req,res)=>{
    fs.readFile('/index.html',(err,data)=>{
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end();
    })
});

app.post('/',(req,res,next)=>{
    serchKeyword=String(req.body.keyword);

    axios.get(apiUrl+encodeURI(serchKeyword), {headers:apiKey},)
    .then(function(response) {
            kakaoData=response.data.documents;
            console.log(kakaoData[0]);
            sendData={
                x:kakaoData[0].x,
                y:kakaoData[0].y,
            }
            res.json(sendData);
        }
    );
});

server.listen(port, ()=> {
    console.log(port+'포트로 서버 실행');
  });