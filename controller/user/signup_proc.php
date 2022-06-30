<?php
header("Content-Type:text/html; charset:utf-8");

require_once '../../config/db_connect.php';

$memberId = $_POST['memberId'];
$memberPwd = password_hash($_POST['memberPwd'], PASSWORD_BCRYPT);
$memberName = $_POST['memberName'];
$memberGrade = $_POST['memberGrade'];

// 회원정보 DB 삽입
$request = "INSERT INTO member(member_num, member_id, member_pwd, member_name, member_grade)
VALUES (gen_random_uuid(), '$memberId', '$memberPwd', '$memberName', '$memberGrade')";

$response = pg_query($GLOBALS['DB_CONNECTION'], $request);

// DB 삽입 확인 쿼리
$insertChk = "SELECT count(*) FROM member WHERE member_id = '$memberId'";
$insertChkResponse = pg_query($GLOBALS['DB_CONNECTION'], $insertChk);
$insertChkNum = pg_num_rows($insertChkResponse);

echo $insertChkNum;

?>