// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

// Serve the index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', message); // Broadcast
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
