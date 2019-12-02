var stompClient = null;

function setConnected(connected) {
   $("#connect").prop("disabled", connected);
   $("#disconnect").prop("disabled", !connected);
   
   if (connected) {
      $("#conversation").show();
   } else {
      $("#conversation").hide();
   }
   $("#greetings").html("");
}
function gotoBottom(id){
   var element = document.getElementById(id);
   element.scrollTop = element.scrollHeight - element.clientHeight;
}
function connect() {
   var socket = new SockJS('/open-chat');
   stompClient = Stomp.over(socket);
   stompClient.connect({}, function (frame) {
      setConnected(true);
      console.log('Connected: ' + frame);
      stompClient.subscribe('/chat/global', function (chat) {
         showMessage(JSON.parse(chat.body).content);
      });
   });
}
function disconnect() {
   if (stompClient !== null) {
      stompClient.disconnect();
   }
   setConnected(false);
   console.log("Disconnected");
}
function sendMessage() {
   stompClient.send("/app/chat", {}, JSON.stringify({'name': $("#name").val(),'message': $("#message").val()}));
document.getElementById("msg").reset();
}

function showMessage(message) {
   $("#greetings").append("<tr><td>" + message + "</td></tr>");
	gotoBottom("scrollable-content");
}
$(function () {
   $( "form" ).on('submit', function (e) {e.preventDefault();});
   $( "#connect" ).click(function() { connect(); });
   $( "#disconnect" ).click(function() { disconnect(); });
   $( "#send" ).click(function() { sendMessage(); });
});