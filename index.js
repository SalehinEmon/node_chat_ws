import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { fileURLToPath } from 'url';
const path = require('path');
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const serverPort = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({
        server, headers: {
            "User-Agent": `WebSocket Client`
        }
    });

app.use(express.static(path.join(__dirname, '/chat_page')))

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'chat_page/index.html'));
    res.sendFile('chat_page/index.html', { root: __dirname })
});

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient, request) => {
    //send feedback to the incoming connection
    var onConnectResponse = new ChatMessage();
    onConnectResponse.chatId = request.headers['sec-websocket-key'];
    onConnectResponse.messageText = "Welcome to the Chat...";
    onConnectResponse.onConnect = true;


    webSocketClient.send(JSON.stringify(onConnectResponse));

    //when a message is received
    webSocketClient.on('message', (data) => {
        if (isJson(data.toString())) {
            console.log(data.toString());
            var incommingMsg = JSON.parse(data.toString());
            incommingMsg.onConnect = false;
            incommingMsg.chatId = request.headers['sec-websocket-key'];

            websocketServer.clients.forEach(client => {
                //send the client the current message
                client.send(JSON.stringify(incommingMsg));
            });
        } else {
            webSocketClient.send('Format error');
        }
        //for each websocket client
        // websocketServer.clients.forEach( client => {
        //     //send the client the current message
        //     client.send(JSON.stringify(incommingMsg));
        // });
    });
});

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});



function ChatMessage() {
    var chatId;
    var messageText;
    var deliveryTime;
    var isDelevered;
    var onConnect;
    var userName;
}

function CnConneceModel() {
    var chatId;
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}




