// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
/* 
globalThis.c=1;
globalThis.isOpen=false;
globalThis.lastConnectTime=0;
globalThis.connectionsDuration=0;

const endpointUrl="http://localhost:8082/";


function blockingRequest(url, data) {
	// console.log(globalThis.isOpen);
	// data=JSON.stringify(data);
	// var xhr = new XMLHttpRequest();     
	// xhr.open("POST", url, false);    
	// xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");  
	// xhr.send(data);
	fetch(url,
	{
		headers: {
		
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify(data)
	})
}

function getCurrentTimestamp(){
	return ~~(Date.now()/1000);
}

function openConnection(){
	if(globalThis.isOpen){
		return;
	}
	clearTimeout(globalThis.connectTimeout);
	globalThis.isOpen=true;
		globalThis.lastConnectTime=getCurrentTimestamp();
		console.log("opening connections ...");
		blockingRequest(endpointUrl,  {action: "connect"});
	globalThis.connectTimeout=setTimeout(function(){
		/-* fetch("http://localhost:8082",
			{
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({action: "connect"})
			}).then(r=>{
				
			}); *-/
	},500);
}


function closeConnection(){
	if(!globalThis.isOpen){
		return;
	}
	clearTimeout(globalThis.deisconnectTimeout);
	globalThis.isOpen=false;
		globalThis.connectionsDuration += (getCurrentTimestamp()-globalThis.lastConnectTime);
		console.log("closing connections ..., Duration:",(getCurrentTimestamp()-globalThis.lastConnectTime));
		console.log("Total Duration:",globalThis.connectionsDuration);
		blockingRequest(endpointUrl,  {action: "disconnect"});
	globalThis.deisconnectTimeout=setTimeout(function(){
	},1000);
		
		/-* fetch("http://localhost:8082",
			{
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({action: "disconnect"})
			}).then(r=>{
				
			});
 *-/	
}


chrome.webRequest.onBeforeRequest.addListener(d=>{console.log(d.url);if(d.url!=endpointUrl)openConnection()} ,{urls: ["<all_urls>"]} );

function fininsh(details) {
	closeConnection();
	//globalThis.c--;
	//console.log("closed ",globalThis.c,details.url);
  
}

chrome.webRequest.onCompleted.addListener(d=>{if(d.url!=endpointUrl)closeConnection()} ,{urls: ["<all_urls>"]});

chrome.webRequest.onErrorOccurred.addListener(d=>{if(d.url!=endpointUrl)closeConnection()} ,{urls: ["<all_urls>"]});
  */
  
var serverAddr='http://192.168.1.2:8000';
var sessionId=''; 

function reloadStats(){
	fetch(serverAddr+'/',{body:sessionId,method:'POST'})
	.then(response => response.json())
	.then(data => {
		let value= data.tmpRemind || data.mainRemind;
		console.log(data);
		chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });  
		chrome.browserAction.setBadgeText({text: `${value}G`}); // We have 10+ unread items.
		globalThis.data=data;
	})
}
  
setInterval(reloadStats,30000);

reloadStats();


chrome.webNavigation.onCompleted.addListener(function(details) {
    console.log('gotIt!');
	chrome.cookies.get({ url: 'https://adsl.tci.ir/panel/', name: 'PHPSESSID' },
	  function (cookie) {
		if (cookie) {
		  console.log('SessionId: ',cookie.value);
		  sessionId=cookie.value;
		}
		else {
		  console.log('Can\'t get cookie! Check the name!');
		}
	});
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        urlEquals: 'https://adsl.tci.ir/panel/'
    }],
});



