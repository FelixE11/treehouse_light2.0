<?php
function getMessages() {
  $file = 'messages.json';
  if (file_exists($file)) {
    $messages = json_decode(file_get_contents($file), true);
    return $messages;
  }
  return [];
}

$messages = getMessages();
header('Content-Type: application/json');
echo json_encode($messages);
?>
