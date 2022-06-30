<?php
require_once '../../config/db_connect.php';
/*$memberId = $_POST['memberId'];
$stmt = $pdo->prepare("SELECT COUNT(*) FROM member WHERE member_id = ?");
$stmt->execute([$memberId]);
if ($stmt->fetchColumn() > 0) {
    echo "사용할 수 없는 아이디입니다.";
} else {
    echo "사용할 수 있는 아이디입니다.";
}
$pdo = null;*/

try {
    $db = new db_connect();
    $pdo = $db->getPdo();
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM member WHERE member_id = ?");
    $memberId = $_POST['memberId'];
    $stmt->execute([$memberId]);
    if ($stmt->fetchColumn() > 0) {
        echo "사용할 수 없는 아이디입니다.";
    } else {
        echo "사용할 수 있는 아이디입니다.";
    }
} catch (Exception $e) {
    echo $e->getMessage();
}

?>