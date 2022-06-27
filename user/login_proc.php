<?php
//header("Content-Type: application/json; charset=utf-8");
header("Content-Type:text/html; charset:utf-8");
require_once dirname(__DIR__) . '/config/db.php';

$id = $_POST['id'];
$password = $_POST['password'];

$request = "SELECT * FROM member WHERE member_id = '$id'";
$response = pg_query($GLOBALS['DB_CONNECTION'], $request);
$data = pg_fetch_array($response);
$result[] = array('success' => true, 'userId' => $id);

if (pg_num_rows($data) > 0 && password_verify($password, $data['member_pwd'])) {

    echo json_encode($result);
}
//echo json_encode($result);
echo password_verify($password, $data['member_pwd']);
?>