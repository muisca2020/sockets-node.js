// Cargamos express y creamos una app con el
const express = require('express');
const app = express();

// Cargamos la librería http y creamos un servidor que escucha las peticiones 
// en un puerto mediante la app "express"
const http = require('http');
const server = http.createServer(app);

// Creamos un objeto con la librería socket.io
const { Server } = require('socket.io');
const io = new Server(server);

// Definimimos la respuesta ante distintos tipos de solicitud
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

// Iniciamos el socket y declaramos que para el evento connection se enviará 
// un log
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado al chat');

    // Definimos el evento chat message que recibe el mensaje desde un char y 
    // lo reemite de vuelta a todos
    socket.on('chat message', (msg) => {
        // console.log('El mensaje fue: ' + msg);
        // Este emit es de vuelta, no es equivalente el emit de la página 
        // cuando capturó el mensaje que se digitó en el input
        io.emit('chat message', msg);
    });
    // Definimos el evento disconect
    socket.on('disconnect', () => {
        console.log('El usuario se ha desconectado');
    });
});

// Inicializamos el servidor
server.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});