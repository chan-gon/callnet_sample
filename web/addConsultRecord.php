<?php
extract($_POST);
if (isset($_POST)) {
     require_once '../config.php';

     // 입력값 검증
    $customerCID = $_POST['customerCID'];
    $customerNum = $_POST['customerNum'];
    $consultDate = $_POST['consultDate'];
    $consultantName = $_POST['consultantName'];
    $consultRoot = $_POST['consultRoot'];
    $categoryLarge = $_POST['categoryLarge'];
    $categoryMedium = $_POST['categoryMedium'];
    $consultResult = $_POST['consultResult'];
    $consultContent = $_POST['consultContent'];

    if ($customerCID == "" || $customerNum == "" || $consultDate == "" || $consultantName == "" || $consultContent == "") {
        $errorMsg = "필수입력 사항을 입력하세요.";
        echo json_encode(array("result"=>"CONSULT_RECORD_ERROR", "msg"=>$errorMsg));
    }
    else if (!isset($consultRoot)) {
        $errorMsg = "상담경로를 선택하세요.";
        echo json_encode(array("result"=>"CONSULT_RECORD_ERROR", "msg"=>$errorMsg));
    }
    else if ($categoryLarge == '-- 선택 --') {
        $errorMsg = "대분류를 선택하세요.";
        echo json_encode(array("result"=>"CONSULT_RECORD_ERROR", "msg"=>$errorMsg));
    }
    else if ($categoryMedium == '-- 선택 --') {
        $errorMsg = "중분류를 선택하세요.";
        echo json_encode(array("result"=>"CONSULT_RECORD_ERROR", "msg"=>$errorMsg));
    }
    else if ($consultResult == '-- 선택 --') {
        $errorMsg = "상담결과를 선택하세요.";
        echo json_encode(array("result"=>"CONSULT_RECORD_ERROR", "msg"=>$errorMsg));
    }
    else {
        $c = new consultClass();
        $consulting = $c->addConsultRecord($customerCID, $customerNum, $consultDate, $consultantName, $consultRoot, $categoryLarge, $categoryMedium, $consultResult, $consultContent);
        if ($consulting) {
            echo json_encode(array('result'=>'SUCCESS', 'msg'=>'상담기록 등록 완료'));
        } else {
            echo json_encode(array('result'=>'FAIL', 'msg'=>'등록 실패. 다시 시도해 주세요.'));
        }
    }
} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'DATA-NOTFOUND', 'msg'=>'등록 실패. 전송된 데이터가 없습니다.'));
}
?>
