<?php
/*
 * 고객정보 수정
 */
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

try {
    $conditions = array();
    if (!empty($customerId)) {
        $conditions[] = "customer_id = '$customerId', ";
    }
    if (!empty($customerName)) {
        $conditions[] = "customer_name = '$customerName', ";
    }
    if (!empty($customerGrade)) {
        $conditions[] = "customer_grade = '$customerGrade', ";
    }
    if (!empty($customerTel)) {
        $conditions[] = "customer_tel = '$customerTel', ";
    }
    if (!empty($customerPhone)) {
        $conditions[] = "customer_phone = '$customerPhone', ";
    }
    if (!empty($customerEmailAddr)) {
        $conditions[] = "customer_email = '$customerEmailAddr', ";
    }
    if (!empty($zonecode)) {
        $conditions[] = "zonecode = '$zonecode', ";
    }
    if (!empty($roadAddr)) {
        $conditions[] = "road_addr = '$roadAddr', ";
    }
    if (!empty($jibunAddr)) {
        $conditions[] = "jibun_addr = '$jibunAddr', ";
    }
    if (!empty($specificAddr)) {
        $conditions[] = "specific_addr = '$specificAddr', ";
    }

    // 배열 복사(배열의 마지막 요소를 추출하는 용도로 사용되는 배열)
    $lastCondition = $conditions;
    // 배열의 마지막 요소의 key 값 추출
    $lastIndex = key(array_slice($conditions, -1, 1, true));
    // 배열의 마지막 요소 제거
    unset($conditions[$lastIndex]);

    // 검색 조건 붙이기
    $sql = "UPDATE customer SET " . implode('', $conditions);

    // 배열의 마지막 요소값에서 콤마 제거
    $lastElement = end($lastCondition);
    $lastStr = rtrim($lastElement, ', ');

    // 콤마 제거한 배열의 마지막 요소값을 쿼리문에 붙이기
    $sql .= $lastStr;

    // 쿼리문 마무리
    $sql .= " WHERE customer_num = '$customerNum'";

    $pdo->beginTransaction();
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $pdo->commit();
    
    // 변경사항 확인
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