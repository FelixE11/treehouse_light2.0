var loginCode;
var username;

function login() {
  loginCode = generateLoginCode();
  username = loginCode;

  var loginContainer = document.getElementById('login-container');
  var chatContainer = document.getElementById('chat-container');
  loginContainer.style.display = 'none';
  chatContainer.style.display = 'block';

  loadChat();
}

function generateLoginCode() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var code = '';
  for (var i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function loadChat() {
  var messageContainer = document.getElementById('message-container');
  messageContainer.innerHTML = '';

  // TODO: Pobierz wcześniejsze wiadomości z serwera i wyświetl je w porządku od najnowszych do najstarszych

  // Przykładowe wiadomości
  var messages = [
    { username: 'User1', timestamp: new Date(), message: 'Hello!', image: null },
    { username: 'User2', timestamp: new Date(), message: 'Hi!', image: null }
  ];

  messages.sort(function(a, b) {
    return b.timestamp - a.timestamp;
  });

  messages.forEach(function(message) {
    var timestamp = formatDate(message.timestamp);
    var messageElement = createMessageElement(message.username, timestamp, message.message, message.image);
    messageContainer.appendChild(messageElement);
  });

  // Przewiń do ostatniej wiadomości
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function createMessageElement(username, timestamp, message, image) {
  var messageElement = document.createElement('div');
  messageElement.className = 'message';

  var usernameElement = document.createElement('span');
  usernameElement.className = 'username';
  usernameElement.textContent = username;

  var timestampElement = document.createElement('span');
  timestampElement.className = 'timestamp';
  timestampElement.textContent = timestamp;

  var messageTextElement = document.createElement('p');
  messageTextElement.textContent = message;

  messageElement.appendChild(usernameElement);
  messageElement.appendChild(document.createElement('br'));
  messageElement.appendChild(timestampElement);
  messageElement.appendChild(document.createElement('br'));
  messageElement.appendChild(messageTextElement);

  return messageElement;
}

function formatDate(timestamp) {
  var date = new Date(timestamp);
  var options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('pl-PL', options);
}

function sendMessage() {
  var messageInput = document.getElementById('message-input');
  var imageInput = document.getElementById('image-input');

  var message = messageInput.value;
  var image = imageInput.files[0];

  // TODO: Wyślij wiadomość na serwer

  // Przykładowe wysłanie wiadomości
  var newMessage = {
    username: username,
    timestamp: new Date(),
    message: message,
    image: image
  };

  var messageContainer = document.getElementById('message-container');
  var messageElement = createMessageElement(newMessage.username, formatDate(newMessage.timestamp), newMessage.message, newMessage.image);
  messageContainer.appendChild(messageElement);

  // Przewiń do ostatniej wiadomości
  messageContainer.scrollTop = messageContainer.scrollHeight;

  // Wyczyść pola wprowadzania
  messageInput.value = '';
  imageInput.value = '';
}


