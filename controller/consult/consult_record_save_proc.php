<?php
header("Content-Type: application/json; charset=utf-8");
require_once '../../config/db_connect.php';

$customerNum = $_POST['customerNum'];
$customerCID = $_POST['customerCID'];
$consultDate = $_POST['consultDate'];
$consultantName = $_POST['consultantName'];
$consultRoot = $_POST['consultRoot'];
$categoryLarge = $_POST['categoryLarge'];
$categoryMedium = $_POST['categoryMedium'];
$consultResult = $_POST['consultResult'];
$consultContent = $_POST['consultContent'];

$request = "INSERT INTO consulting (
   consulting_num , customer_num, consulting_date, consulting_rep_name, 
   consulting_root, category_large, category_medium, consulting_result, consulting_content, customer_cid)
    VALUES(gen_random_uuid(), '$customerNum', '$consultDate', '$consultantName', 
           '$consultRoot', '$categoryLarge', '$categoryMedium', '$consultResult', '$consultContent', $customerCID)";

$response = pg_query($GLOBALS['DB_CONNECTION'], $request);

if ($response) {
    echo json_encode(array('result' => '상담기록 저장 완료'));
} else {
    echo json_encode(array('result' => '다시 시도해 주세요'));
}

?>