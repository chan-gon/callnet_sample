<?php

header("Content-Type:text/html; charset:utf-8");

require_once dirname(__DIR__) . '/config/db.php';

$memberId = $_REQUEST['memberId'];
$request = "SELECT member_id FROM member WHERE member_id = '$memberId'";
$response = pg_query($GLOBALS['DB_CONNECTION'], $request);
$dataFromDB = pg_fetch_array($response);

$returnStr = "";
if ($memberId != $dataFromDB['member_id']) {
    $returnStr = "사용할 수 있는 아이디입니다.";
} else {
    $returnStr = "사용할 수 없는 아이디입니다.";
}

echo $returnStr;

?>