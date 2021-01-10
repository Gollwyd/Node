const http = require('http')
const url = require('url')
const NamesModel = require('./NamesModel')
const port = 8080
const requestHandler = (request, response) => {
   
    if(request.method === 'GET') {
        response.end('Ответ на GET запрос')
    } 
    if(request.method === 'POST' && request.headers?.iknowyoursecret==='TheOwlsAreNotWhatTheySeem') request.on('data', data => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        const urlRequest = url.parse(request.url, true);
        response.end(`Hi ${urlRequest.query.name}`);
        new NamesModel(urlRequest.query.name, request.socket.localAddress);
        
    }) 
}
const server = http.createServer(requestHandler)
server.listen(port, async (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    const names = await NamesModel.getAll();
    console.log(names);
})