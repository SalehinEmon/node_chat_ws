var webSocketAddress = "ws://" + window.location.host;
console.log(webSocketAddress);
var chatId = 'lal';
const msgerChat = get(".msger-chat");
var chatInput = document.getElementById("msger-input");
var userName = "";

//add enter tirgger to the input field
chatInput.addEventListener("keypress", function (event) {

   if (event.key === "Enter") {

      event.preventDefault();

      document.getElementById("msger-send-btn").click();
   }
});

function get(selector, root = document) {
   return root.querySelector(selector);
}


// Let us open a web socket
var ws = new WebSocket(webSocketAddress);

ws.onopen = function () {

   // Web Socket is connected, send data using send()

   alert('Connected with id ');
};


//    ws.onmessage = function (evt) { 
//     console.log(ent);
//       var received_msg = evt.data;
//       var chatMessageVar  =document.getElementById('chatMessage').innerHTML='env.data';
//    };

ws.onmessage = OnMessageReceive;

// (event) => {
//    console.log(event.data);
//    var chatMessageVar = document.getElementById('chatMessage').innerText = event.data;
// };

ws.onclose = function () {

   // websocket is closed.
   alert("Connection is closed...");
};





function OnMessageReceive(event) {
   var data = event.data;
   console.log(data);


   var chatMessage = JSON.parse(data);
   if (chatMessage.onConnect) {
      chatId = chatMessage.chatId;
   }

   if (chatId == chatMessage.chatId) {
      appendMessage(chatMessage.userName, '', 'right', chatMessage.messageText, chatMessage.chatId);
   }
   else {
      appendMessage(chatMessage.userName, '', 'left', chatMessage.messageText, chatMessage.chatId);

   }

}

function onSendButtonClick() {
   console.log('Send button click');
   var chatMessageInput = document.getElementById('msger-input').value;
   var currentDate = Date();

   var chatMessage = new ChatMessage();
   chatMessage.chatId = chatId;
   chatMessage.messageText = chatMessageInput;
   chatMessage.isDelevered = true;
   chatMessage.deliveryTime = currentDate;
   chatMessage.userName = userName;
   // console.log(chatMessage);

   if (ws.readyState == WebSocket.OPEN)
      document.getElementById('msger-input').value = "";
   ws.send(JSON.stringify(chatMessage));

}


function appendMessage(name, img, side, text, chatId) {
   if (isNullOrEmpty(name)) {
      name = chatId;
   }
   //   Simple solution for small apps
   const msgHTML = `
     <div class="msg ${side}-msg">
       <div class="msg-img" style="background-image: url(${img})"></div>
 
       <div class="msg-bubble">
         <div class="msg-info">
           <div class="msg-info-name">${name}</div>
           <div class="msg-info-time">${formatDate(new Date())}</div>
         </div>
 
         <div class="msg-text">${text}</div>
       </div>
     </div>
   `;

   msgerChat.insertAdjacentHTML("beforeend", msgHTML);
   msgerChat.scrollTop += 500;
}


function isNullOrEmpty(value) {
   return (value == null || (typeof value === "string" && value.trim().length === 0));
}

function formatDate(date) {
   const h = "0" + date.getHours();
   const m = "0" + date.getMinutes();

   return `${h.slice(-2)}:${m.slice(-2)}`;
}

function setChatName() {
   userName = document.getElementById('chat-name').value;
   console.log(userName);
}


function ChatMessage() {
   var chatId;
   var messageText;
   var deliveryTime;
   var isDelevered;
   var onConnect;
   var userName;

}

function OnConneceModel() {
   var chatId;
}

