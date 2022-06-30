<?php
header("Content-Type:text/html; charset:utf-8");
require_once '../../config/db_connect.php';

$code = $_POST['customerCode'];
$id = $_POST['customerId'];
$name = $_POST['customerName'];
$grade = $_POST['customerGrade'];
$gradeDate = $_POST['customerGradeSetDate'];
$tel = $_POST['customerTel'];
$phone = $_POST['customerPhone'];
$email = $_POST['customerEmail'];
$addr = $_POST['customerAddr'];

$request = "INSERT INTO 
    customer (customer_num, customer_id, customer_name, customer_tel, customer_phone, customer_email, customer_address,
     customer_grade, customer_grade_date)
     VALUES ('$code', '$id', '$name', '$tel', '$phone', '$email', '$addr', '$grade', '$gradeDate')";

$response = pg_query($GLOBALS['DB_CONNECTION'], $request);

// 고객정보 저장 확인
$insertChk = "SELECT count(*) FROM customer WHERE customer_num = '$code'";
$insertChkResponse =pg_query($GLOBALS['DB_CONNECTION'], $insertChk);
$insertChkNum = pg_num_rows($insertChkResponse);

echo $insertChkNum;

?>