<?php
  // Pobranie wiadomości z serwera

  // Przykładowe odczytanie wiadomości z pliku tekstowego
  $messages = file('messages.txt', FILE_IGNORE_NEW_LINES);

  // Przygotowanie danych w formacie JSON
  $data = array();
  foreach ($messages as $message) {
    $data[] = array(
      'username' => 'Nazwa Użytkownika',
      'timestamp' => time(),
      'message' => $message,
      'image' => null
    );
  }

  echo json_encode($data);
?>
