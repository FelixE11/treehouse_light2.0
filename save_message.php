<?php
  $message = $_POST['message'];
  $image = $_FILES['image'];

  // Zapisanie wiadomości i obrazu na serwerze

  // Przykładowe zapisanie wiadomości w pliku tekstowym
  $file = fopen('messages.txt', 'a');
  fwrite($file, $message . PHP_EOL);
  fclose($file);

  // Przykładowe zapisanie obrazu jako pliku na serwerze
  if ($image) {
    $imageData = file_get_contents($image['tmp_name']);
    $imageName = $image['name'];
    file_put_contents('images/' . $imageName, $imageData);
  }
?>
