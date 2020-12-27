const http = require('http');

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

////////////////////////////////
const postOptions= {
  hostname: 'localhost',
  port: 8080,
  method: 'POST',
  headers: {'WhatWillSaveTheWorld': 'Love'}
}

const postReq = http.request(postOptions, (res) => {
  res.on('data', (data) => {
    console.log(Buffer.from(data).toString());
  })
})
postReq.on('error', (error) => {
  console.error(error)
})
postReq.end('my precious')