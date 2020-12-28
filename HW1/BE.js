const http = require('http')
const port = 8080
const requestHandler = (request, response) => {

    if(request.method === 'GET') {
        response.end('Ответ на GET запрос')
    } 
    if(request.method === 'POST') request.on('data', data => {
        response.end(`Ответ на POST запрос '${Buffer.from(data)}'`)
    }) 
}
const server = http.createServer(requestHandler)
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})