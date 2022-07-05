<?php
require_once '../config.php';
$pdo = new PDO(dsn);

$customerNum = $_POST['customerNum'];
$customerId = $_POST['customerId'];
$customerName = $_POST['customerName'];
$customerGrade = $_POST['customerGrade'];
$customerTel = $_POST['customerTel'];
$customerPhone = $_POST['customerPhone'];
$customerEmailAddr = $_POST['customerEmailAddr'];
$zonecode = $_POST['zonecode'];
$roadAddr = $_POST['roadAddr'];
$jibunAddr = $_POST['jibunAddr'];
$specificAddr = $_POST['specificAddr'];

$sql = "";
foreach ($_POST as $parameter) {
    if (empty($parameter)) {
        echo json_encode(array('result'=>NULL));
    } else {
        $sql .= "UPDATE customer SET ";
    }
}
if (!empty($customerNum)) {
    $sql .= "customer_num = '$customerNum'";
}
if (!empty($customerId)) {
    $sql .= "customer_id = '$customerId'";
}


?>