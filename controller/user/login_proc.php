<?php
header("Content-Type: application/json; charset=utf-8");
require_once '../../config/db_connect.php';

$id = $_POST['id'];
$password = $_POST['password'];

$request = "SELECT * FROM member WHERE member_id = '$id'";
$response = pg_query($GLOBALS['DB_CONNECTION'], $request);
$data = pg_fetch_array($response);

$result[] = array();
if (pg_num_rows($response) > 0 && password_verify($password, $data['member_pwd'])) {
    $result[0] = array('result' => true, 'msg' => "$id"." 님 로그인 확인.");
    echo json_encode($result);
} else {
    $result[0] = array('result' => false, 'msg' => "아이디 또는 비밀번호가 일치하지 않습니다.");
    echo json_encode($result);
}
?>