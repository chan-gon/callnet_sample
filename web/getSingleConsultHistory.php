<?php
require_once '../config.php';
$pdo = new PDO(dsn);

$customerNum = $_POST['customerNum'];
$consultNum = $_POST['consultNum'];

$sql = "SELECT b.customer_name, b.customer_phone, b.customer_email, b.consulting_root, b.customer_cid, b.consulting_date, b.category_large, b.category_medium, b.consulting_result, b.consultant_name , b.consulting_content, b.consult_num, b.customer_num
FROM customer a JOIN consulting b ON a.customer_num = b.customer_num WHERE b.customer_num = '$customerNum' AND b.consult_num = '$consultNum'";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
    echo json_encode(array('result'=>$result, 'msg'=>'SUCCESS'));
} else {
    echo json_encode(array('result'=>NULL, 'msg'=>'DATA-NOTFOUND'));
}
?>