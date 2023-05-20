$(document).ready(function() {
  var loginCode = generateLoginCode(); // Wygenerowanie losowego kodu logowania

  // Wyświetlanie formularza logowania
  $('#login-code').val(loginCode);
  $('#login-container').show();

  // Obsługa logowania
  $('#login-button').click(function() {
    var enteredCode = $('#login-code').val();
    if (enteredCode === loginCode) {
      $('#login-container').hide();
      $('#chat-container').show();
      loadMessages();
    } else {
      alert('Logowanie się nie powiodło. Wprowadź poprawny kod logowania.');
    }
  });

  // Obsługa wysyłania wiadomości
  $('#send-button').click(function() {
    var message = $('#message-input').val();
    var image = $('#image-input')[0].files[0];

    if (message !== '' || image) {
      sendMessage(message, image);
      $('#message-input').val('');
      $('#image-input').val('');
    }
  });

  // Generowanie losowego kodu logowania
  function generateLoginCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  // Ładowanie wiadomości z serwera
  function loadMessages() {
    $.ajax({
      url: 'get_messages.php',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $('#messages-container').empty();
        for (var i = data.length - 1; i >= 0; i--) {
          var message = data[i];
          var timestamp = formatTimestamp(message.timestamp);
          var html = '<div class="message">' +
                       '<div class="message-header">' +
                         '<span class="username">' + message.username + '</span>' +
                         '<span class="timestamp">' + timestamp + '</span>' +
                       '</div>' +
                       '<div class="message-body">' +
                         '<p>' + message.message + '</p>';
          if (message.image) {
            html += '<img src="data:image/jpeg;base64,' + message.image + '" />';
          }
          html += '</div></div>';
          $('#messages-container').append(html);
        }
      }
    });
  }

  // Wysyłanie wiadomości na serwer
  function sendMessage(message, image) {
    var formData = new FormData();
    formData.append('message', message);
    formData.append('image', image);

    $.ajax({
      url: 'save_message.php',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function() {
        loadMessages();
      }
    });
  }

  // Formatowanie znacznika czasu
  function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('pl-PL', options);
  }
});

