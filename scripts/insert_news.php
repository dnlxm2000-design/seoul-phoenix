<?php
// Insert news article into MySQL DB
$host = 'localhost';
$db = 'soccerline';
$user = 'soccerline';
$pass = 'love1004!';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$title = "서울피닉스 FC, 2026-2027시즌 말레이시아 A1리그 참가동의서 제출… '한국인 사령탑' 선임 고심 중";
$category = "club";
$date = "2026-07-02";
$author = "손진영 대표";
$content = file_get_contents(__DIR__ . '/news_article.txt');

$stmt = $conn->prepare("INSERT INTO news (title, category, date, content, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())");
$stmt->bind_param("sssss", $title, $category, $date, $content, $author);

if ($stmt->execute()) {
    echo "등록 성공! ID: " . $conn->insert_id . "\n";
} else {
    echo "오류: " . $stmt->error . "\n";
}

$stmt->close();
$conn->close();
