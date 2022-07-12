<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    
    // 입력값 검증
    $customerName = $_POST['customerName'];
    $customerPhone = $_POST['customerPhone'];
    $customerEmailAddr = $_POST['customerEmailAddr'];
    $zonecode = $_POST['zonecode'];
    $roadAddr = $_POST['roadAddr'];
    $jibunAddr = $_POST['jibunAddr'];
    $specificAddr = $_POST['specificAddr'];

    if ($customerName == "" || $customerPhone == "" || $customerEmailAddr == "") {
        $errorMsg = "필수입력 사항을 입력하세요.";
        echo json_encode(array("result"=>"CUSTOMER_INFO_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$)", $customerEmailAddr)) {
        $errorMsg = "잘못된 이메일 입력 양식.\nEx) callnet@gmail.com";
        echo json_encode(array("result"=>"CUSTOMER_INFO_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$)", $customerName)) {
        $errorMsg = "잘못된 이름 입력 양식.\n한글 또는 영문으로만 입력하세요. Ex) 홍길동 / Daniel";
        echo json_encode(array("result"=>"CUSTOMER_INFO_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^010\d{8}$)", $customerPhone)) {
        $errorMsg = "잘못된 핸드폰 번호 입력 양식.\n구분자 없이 8자리 숫자만 입력하세요. Ex) 01015771577";
        echo json_encode(array("result"=>"CUSTOMER_INFO_ERROR", "msg"=>$errorMsg));
    }
    else {
        $c = new customerClass();
        $customer = $c->addCustomerInfo($customerNum, $customerName, $customerPhone, $customerEmailAddr, $zonecode, $roadAddr, $jibunAddr, $specificAddr);
        if ($customer) {
            // 고객정보 등록 성공
            echo json_encode(array('result'=>'SUCCESS', 'msg'=>'고객정보 등록 완료.'));
        } else {
            // 고객정보 등록 실패
            echo json_encode(array('result'=>'FAIL', 'msg'=>'등록 실패. 다시 시도해 주세요.'));
        }
    }
} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'DATA-NOTFOUND', 'msg'=>'등록 실패. 전송된 데이터가 없습니다.'));
}
?>