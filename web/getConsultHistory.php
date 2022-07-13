<?php
//extract($_POST);
//if (isset($_POST)) {
//    require_once '../config.php';
//    $c = new consultClass();
//    $consultHistory = $c->getConsultHistory($consultDateFrom, $consultDateTo, $customerCID, $customerName, $consultRoot, $categoryLarge, $categoryMedium, $consultResult);
//    if ($consultHistory) {
//        echo json_encode(array('result'=>$consultHistory, 'msg'=>'SUCCESS'));
//    } else {
//        echo json_encode(array('result'=>NULL, 'msg'=>'DATA-NOTFOUND'));
//    }
//}

require_once '../config.php';
$pdo = new PDO(dsn);

$sql = "SELECT a.customer_name, b.consulting_root, b.customer_cid, a.customer_phone, b.consulting_date, b.category_large, b.category_medium, b.consulting_result, b.consultant_name, b.consulting_content, b.consult_num, b.customer_num
                FROM customer a JOIN consulting b ON a.customer_num = b.customer_num WHERE a.customer_num IS NOT NULL";

$dateFrom = $_POST['consultDateFrom'];
$dateTo = $_POST['consultDateTo'];
$cid = $_POST['customerCID'];
$name = $_POST['customerName'];
$consultantName = $_POST['consultantName'];
$root = $_POST['consultRoot'];
$categoryLarge = $_POST['categoryLarge'];
$categoryMedium = $_POST['categoryLarge'];
$consultResult = $_POST['consultResult'];

if (!empty($dateFrom) && !empty($dateTo)) {
    $sql .= " AND b.consulting_date BETWEEN '$dateFrom' AND '$dateTo'";
}
if (!empty($cid)) {
    $sql .= " AND b.customer_cid = '$cid'";
}
if (!empty($name)) {
    $sql .= " AND b.customer_name = '$name'";
}
if (!empty($consultantName)) {
    $sql .= " AND b.consultant_name = '$consultantName'";
}
if (!empty($root)) {
    $sql .= " AND b.consulting_root = '$root'";
}
if (!empty($categoryLarge)) {
    $sql .= " AND b.category_large = '$categoryLarge'";
}
if (!empty($categoryMedium)) {
    $sql .= " AND b.category_medium = '$categoryMedium'";
}
if (!empty($consultResult)) {
    $sql .= " AND b.consulting_result = '$consultResult'";
}

$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
    echo json_encode(array('result'=>$result, 'msg'=>'SUCCESS'));
} else {
    echo json_encode(array('result'=>NULL, 'msg'=>'DATA-NOTFOUND'));
}
?>