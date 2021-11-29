#!/usr/bin/env nodejs
const fetch 		= require('node-fetch');
const jsdom 		= require("jsdom");
const { JSDOM }		= jsdom;

// const express       = require("express");
// const bodyParser    = require("body-parser");
// const app			= express();



let values=[];
let sessionId=''
let stats={};

function updateValue(){
	return fetch('https://adsl.tci.ir/panel/',{credentials: 'omit',headers: {Cookie: 'PHPSESSID='+sessionId}})
	.then(r=>r.text())
	.then(r=>{
		values=[];
		let dom =  new JSDOM((r));
		values=[...dom.window.document.querySelectorAll('[class*=pie-volume]:nth-child(1)>.percent>span')]
			.map(r=>r.textContent)
			.filter(r=>r.indexOf('GB')>-1)
			.map(r=>r.replace('GB','')*1);
		
		stats={
			mainRemind:	values[0] || 0,
			mainQuota:	values[1] || 0,
			
			tmpRemind:	values[2] || 0,
			tmpQuota:	values[3] || 0,
		}
		
		console.log(stats);
		
	})
}

setInterval(updateValue,30000);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get('/',function(req,res){
  // res.sendfile("index.html");
// });

// app.post('/get',function(req,res){
  // var user_name=req.body.user;
  // var password=req.body.password;
  // console.log("User name = "+user_name+", password is "+password);
  // res.end("yes");
// });
// app.listen(3000,function(){
  // console.log("Started on PORT 3000");
// })

var http = require('http');
http.createServer(function (request, response) {
	let sendResponse = function(){
		response.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		response.end(JSON.stringify(stats));
	}
	
	
	let reqBody = '';
	request.on('data', chunk => {
        reqBody += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
		if(sessionId.length>5){
			sessionId=reqBody;
		}
		
		
        console.log(reqBody);
		if(!stats.mainRemind){
			updateValue().then(r=>sendResponse());
		}else{
			sendResponse();
		}
        
    });
	
	

}).listen(8000);


console.log('Server running at http://127.0.0.1:8080/');
updateValue();