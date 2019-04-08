const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const port = 3001;


module.exports = (server, verifyClient) => {
    const ws = new WebSocketServer({ server, verifyClient });
    let messages = [];
    console.log('web socket server started');

    ws.on('connection', function(socket) {
        console.log('client connection established.');

        messages.forEach(function(msg) {
            socket.send(msg);
        })

        socket.on('message', function(data) {
            console.log('Message: ' + data);
            messages.push(data);
            ws.clients.forEach(function(clientSocket) {
                clientSocket.send(data);
            });
        });
    });
}