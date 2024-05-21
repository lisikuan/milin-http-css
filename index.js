const express = require('express')
const app = express()
const port = 3000

var server = app.listen(8082)
var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log('socket ���ӳɹ���');
})

app.get('/', (req, res) => {
    res.send('__dirname' + '/index.html');
});

app.listen(port,()=>console.log())