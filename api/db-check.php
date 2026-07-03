<?php
header('Content-Type: application/json; charset=utf-8');
$host = 'localhost';
$user = 'soccerline';
$pass = 'love1004!';
$db_name = 'soccerline';

$conn = new mysqli($host, $user, $pass, $db_name);
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$result = $conn->query('SELECT id, title, content, date FROM news ORDER BY id');
$articles = [];
while ($row = $result->fetch_assoc()) {
    $articles[] = $row;
}

echo json_encode($articles, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$conn->close();
?>
