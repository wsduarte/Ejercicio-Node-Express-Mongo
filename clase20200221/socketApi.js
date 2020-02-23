let socket_io = require("socked.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

let messages = [{
    _id: 1,
    content: "Welcome to chat room",
    author: "Chat admin"
}];

io.on('connection', function (socket) {
    io.sockets.emit('messages', messages);

    socket.on("new-message", data => {
        socketApi.sendNotification(data);
    });
});

socketApi.sendNotification = data => {
    messages.push(data);
    io.sockets.emit('messages', messages);
}

module.exports = socketApi;