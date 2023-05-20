$(document).ready(function() {
  var username = generateRandomCode(); // Generowanie losowego kodu
  var chat = $('#chat');
  var messages = $('#messages');
  var messageForm = $('#messageForm');
  var messageInput = $('#messageInput');
  var imageInput = $('#imageInput');

  // Wyślij wiadomość po kliknięciu przycisku lub naciśnięciu Enter
  messageForm.submit(function(e) {
    e.preventDefault();
    var messageText = messageInput.val();
    var imageData = imageInput.prop('files')[0];
    sendMessage(username, messageText, imageData);
    messageInput.val('');
    imageInput.val('');
  });

  // Pobierz i wyświetl poprzednie wiadomości
  fetchMessages();

  // Generowanie losowego kodu
  function generateRandomCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 5; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  // Wyślij wiadomość na serwer
  function sendMessage(username, message, image) {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }
    $.ajax({
      url: 'save_message.php',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function() {
        fetchMessages();
      },
      error: function() {
        alert('Wysłanie wiadomości nie powiodło się.');
      }
    });
  }

  // Pobierz i wyświetl wiadomości
  function fetchMessages() {
    $.ajax({
      url: 'get_messages.php',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        messages.empty();
        response.forEach(function(message) {
          var messageElement = $('<div>').addClass('message');
          var usernameElement = $('<span>').addClass('username').text(message.username);
          var timestampElement = $('<span>').addClass('timestamp').text(formatTimestamp(message.timestamp));
          var textElement = $('<p>').addClass('text').text(message.message);
          messageElement.append(usernameElement, timestampElement, textElement);
          messages.prepend(messageElement);
        });
      },
      error: function() {
        alert('Pobranie wiadomości nie powiodło się.');
      }
    });
  }

  // Formatowanie znacznika czasu
  function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('pl-PL', options);
  }
});
