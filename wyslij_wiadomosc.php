<?php
function zapiszWiadomosc($messageData) {
  $file = 'wiadomosci.txt';
  $data = json_encode($messageData) . "\n";
  file_put_contents($file, $data, FILE_APPEND);
}

$messageData = json_decode(file_get_contents('php://input'), true);
if ($messageData) {
  zapiszWiadomosc($messageData);
}
?>
