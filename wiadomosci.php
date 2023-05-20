<?php
function wczytajWiadomosci() {
  $file = 'wiadomosci.txt';
  $wiadomosci = [];
  if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
      $wiadomosc = json_decode($line, true);
      if ($wiadomosc) {
        $wiadomosci[] = $wiadomosc;
      }
    }
  }
  return $wiadomosci;
}

$wiadomosci = wczytajWiadomosci();
header('Content-Type: application/json');
echo json_encode($wiadomosci);
?>
