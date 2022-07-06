<?php
/*
 * 고객 정보 조회
 */
require_once '../config.php';
$pdo = new PDO(dsn);

$customerId = $_POST['customerId'];
$customerPhone = $_POST['customerPhone'];

try {
    $sql = "SELECT * FROM customer WHERE";

    $conditions = array();
    if (!empty($customerId)) {
        $conditions[] = " customer_id = '$customerId' AND";
    }
    if (!empty($customerPhone)) {
        $conditions[] = " customer_phone = '$customerPhone' AND";
    }

    // 조건이 하나만 있는 경우
    if (count($conditions) == 1) {
        foreach ($conditions as $key => $value) {
            $singleCondition = rtrim($value, ' AND');
            $sql .= $singleCondition;
        }
    } else { // 조건이 두 개인 경우
        // 배열 복사
        $duplicateCondition = $conditions;

        // 마지막 인덱스 추출 및 제거
        $lastIndex = key(array_slice($conditions, -1 ,1, true));
        unset($conditions[$lastIndex]);

        // 마지막 인덱스 값 제외한 나머지 값 쿼리문에 붙이기
        $sql .= implode('', $conditions);

        // 복사한 배열에서 마지막 인덱스 값 가져오기
        $lastIndexValue = end($duplicateCondition);
        $modifiedValue = rtrim($lastIndexValue, ' AND');
        $sql .= $modifiedValue;
    }

    $pdo->beginTransaction();
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $customerInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($stmt->rowCount() > 0) {
        echo json_encode(array('result'=>$customerInfo));
    } else {
        echo json_encode(array('result'=>'NOTHING_TO_SEARCH'));
    }
} catch (PDOException $e) {
    echo "에러 : ".$e->getMessage();
}
?>