<?php
/*
 * 고객 정보 조회
 * @param 고객번호(customerNum)
 * @return 고객정보(json)
 */
require_once '../config.php';
$pdo = new PDO(dsn);

$customerNum = $_POST['customerNum'];

$sql = "SELECT * FROM customer WHERE customer_num = '$customerNum'";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
    echo json_encode(array('result'=>$result, 'msg'=>'SUCCESS'));
} else {
    echo json_encode(array('result'=>NULL, 'msg'=>'FAIL'));
}
?>