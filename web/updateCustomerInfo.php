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

    // 입력값 검증
    if ($customerName == "" || $customerId == "" || $customerPhone == "" || $customerEmailAddr == "") {
        $errorMsg = "필수입력 사항을 입력하세요.";
        echo json_encode(array("result"=>"USER_UPDATE_ERROR", "msg"=>$errorMsg));
    }
    else if ($customerGrade == "-- 선택 --") {
        $errorMsg = "회원등급을 선택하세요.";
        echo json_encode(array("result"=>"USER_UPDATE_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$)", $customerEmailAddr)) {
        $errorMsg = "잘못된 이메일 입력 양식.\nEx) callnet@gmail.com";
        echo json_encode(array("result"=>"USER_UPDATE_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$)", $customerName)) {
        $errorMsg = "잘못된 이름 입력 양식.\n한글 또는 영문으로만 입력하세요. Ex) 홍길동 / Daniel";
        echo json_encode(array("result"=>"USER_UPDATE_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^010\d{8}$)", $customerPhone)) {
        $errorMsg = "잘못된 핸드폰 번호 입력 양식.\n구분자 없이 8자리 숫자만 입력하세요. Ex) 01015771577";
        echo json_encode(array("result"=>"USER_UPDATE_ERROR", "msg"=>$errorMsg));
    }
    else {
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
            echo json_encode(array('result'=>'SUCCESS', 'msg'=>'고객정보 수정 완료'));
        } else {
            echo json_encode(array('result'=>'NOTHING_TO_UPDATE', 'msg'=>'수정할 데이터가 없습니다.'));
        }
    }
} catch (PDOException $e) {
    $pdo->rollBack();
    echo "에러 : ".$e->getMessage();
}
?>