<?php
require_once '../config.php';
$pdo = new PDO(dsn);

$customerNum = $_POST['customerNum'];
$customerPhone = $_POST['customerPhone'];
$customerName = $_POST['customerName'];

try {
    $sql = "UPDATE customer SET ";
    $conditions = array();

    if (!empty($customerName)) {
        $conditions[] = "customer_name = '$customerName', ";
        //$sql .= "customer_name = '$customerName', ";
    }
    if (!empty($customerPhone)) {
        $conditions[] = "customer_phone = '$customerPhone', ";
        //$sql .= "customer_phone = '$customerPhone', ";
    }

    for ($i = 0; $i < count($conditions); $i++) {
        $sql .= $conditions[$i];
    }

    $lastElement = end($conditions);
    $lastStr = rtrim($lastElement, ', ');
    $sql .= $lastStr;

//    $lastElement = end($conditions);
//    $lastStr = rtrim($lastElement, ', ');
//    echo "lastStr ====> ".$lastStr;
    //$sql .= $lastStr;

    $sql .= " WHERE customer_num = '$customerNum'";

    $pdo->beginTransaction();
    $stmt = $pdo->prepare($sql);
    echo "<script>console.log($sql)</script>";
    $stmt->execute();
    $pdo->commit();
    $result = $stmt->rowCount();
    if ($result > 0) {
        echo json_encode(array('result'=>'SUCCESS'));
    } else {
        echo json_encode(array('result'=>'NOTHING_TO_UPDATE'));
    }
} catch (PDOException $e) {
    $pdo->rollBack();
    echo "에러 : ".$e->getMessage();
}
?>