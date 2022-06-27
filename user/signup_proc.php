<?php
header("Content-Type:text/html; charset:utf-8");

require_once dirname(__DIR__) . '/config/db.php';

$memberId = $_POST['memberId'];
$memberPwd = password_hash($_POST['memberPwd'], PASSWORD_DEFAULT);
$memberName = $_POST['memberName'];
$memberGrade = $_POST['memberGrade'];

$request = "INSERT INTO member(member_num, member_id, member_pwd, member_name, member_grade)
VALUES (gen_random_uuid(), '$memberId', '$memberPwd', '$memberName', '$memberGrade')";

$response = pg_query($GLOBALS['DB_CONNECTION'], $request);
echo $response->sql_fetch_array;
//if ($response == 1) {
//    echo json_encode(array('result' => '회원 가입 성공'));
//} else {
//    echo json_encode(array('result' => '회원 가입 실패'));
//}

?>