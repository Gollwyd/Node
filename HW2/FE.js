const http = require('http');
const axios = require('axios');

const getOptions = {
  hostname: 'localhost',
  port: 8080,
  method: 'GET',
}
const getReq = http.request(getOptions, (res) => {
  res.on('data',(data) => {
    console.log(Buffer.from(data).toString());
  })
})
getReq.on('error', (error) => {
  console.error(error)
})
getReq.end();

//POST request
let postOptions= {
  hostname: 'localhost',
  port: 8080,
  method: 'POST',
  headers: {'WhatWillSaveTheWorld': 'Love'}
}

let postReq = http.request(postOptions, (res) => {
  res.on('data', (data) => {
    console.log(Buffer.from(data).toString());
  })
})
postReq.on('error', (error) => {
  console.error(error)
})
postReq.end('my precious')

// POST request with Header IKnowYourSecret: TheOwlsAreNotWhatTheySeem

const postRequest = async () =>{
  const data={};
  const config = {
    headers: {'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem'}
  }
  
  const res = await axios.post('http://localhost:8080?name=Viktor', data, config);
  console.log(res.data);
}
postRequest();