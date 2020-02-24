let socket = io.connect('http://localhost:3000', { "forceNew": true });

socket.on("messages", data => {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map( (e,i) => {
        return (`
            <div>
                <strong>${e.author}</strong>
                <em>${e.content}</em>
            </div>
        `);
    }).join(" ");

    document.getElementById("messages").innerHTML = html;
}

function addMessage()
{
    let message = {
        author: document.getElementById('username').value,
        content: document.getElementById('text').value
    }
    //clienteBD.insertMensaje(message.author, message.content);
    console.log('Emitting new message');
    socket.emit("new-message", message);
    document.getElementById('username').value = "";
    document.getElementById('text').value = "";
    return false;
}