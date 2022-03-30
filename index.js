const axios = require('axios')
const express = require('express')
const http=require('http')
const app = express();
const port = 8080
const server=http.createServer(app)
const fs = require('fs')

app.use(express.json());
app.use(express.static('./'));

app.get('/',(req,res)=>{
    fs.readFile('/index.html',(err,data)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end();
    })
   
});

let serchKeyword='안산';
app.post('/',(req,res,next)=>{
    serchKeyword=String(req.body.keyword);
    //console.log(req.body)
    console.log(serchKeyword)
});


    const apiUrl='https://dapi.kakao.com/v2/local/search/keyword.json?query='+encodeURI(serchKeyword);

    axios.get(apiUrl,{headers:{'Authorization':'KakaoAK 카카오api키'}},)
    .then(
        function(response) { 
            console.log(JSON.stringify(response.data));
    });



server.listen(port, ()=> {
    console.log(port+'포트로 서버 실행');
  });