<?php
function saveMessage($username, $message, $image) {
  $file = 'messages.json';
  $data = [
    'username' => $username,
    'message' => $message,
    'timestamp' => time()
  ];

  if ($image && $image['error'] === UPLOAD_ERR_OK) {
    $imageData = file_get_contents($image['tmp_name']);
    $data['image'] = base64_encode($imageData);
  }

  $messages = [];
  if (file_exists($file)) {
    $messages = json_decode(file_get_contents($file), true);
  }
  $messages[] = $data;
  file_put_contents($file, json_encode($messages));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $message = $_POST['message'];
  $image = $_FILES['image'];
  saveMessage($username, $message, $image);
}
?>
