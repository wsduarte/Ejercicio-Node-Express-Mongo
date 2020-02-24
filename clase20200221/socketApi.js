var socket_io = require("socket.io"); 
var clienteBD = require('./bd/Mongolib');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

let messages = [{
    _id: 1,
    content: "Welcome to chat room",
    author: "Chat admin"
}];

io.on('connection', function (socket) {
    clienteBD.findAll().then( mensajes => {
        messages = mensajes;
        io.sockets.emit('messages', messages);
        socket.on("new-message", data => {
            socketApi.sendNotification(data);
        });
    });
});

socketApi.sendNotification = data => {
    messages.push(data);
    clienteBD.insertMensaje(data.author, data.content);
    io.sockets.emit('messages', messages);
}

module.exports = socketApi;