<?php
require_once '../config.php';
$pdo = new PDO(dsn);

$customerNum = $_POST['customerNum'];

$sql = "SELECT b.consulting_root, a.customer_name, b.customer_cid, a.customer_phone, b.consulting_date, b.category_large, b.category_medium, b.consulting_result, b.consultant_name , b.consulting_content
FROM customer a JOIN consulting b ON a.customer_num = b.customer_num WHERE b.customer_num = '$customerNum'";

$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
    echo json_encode(array('result'=>$result, 'msg'=>'SUCCESS'));
} else {
    echo json_encode(array('result'=>NULL, 'msg'=>'DATA-NOTFOUND'));
}
?>