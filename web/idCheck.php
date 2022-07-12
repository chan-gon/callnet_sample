<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';

    $memberId = $_POST['memberId'];
    if ($memberId == "") {
        $errorMsg = "아이디를 입력하세요.";
        echo json_encode(array("result"=>"FORMAT_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^[a-z]+$)", $memberId)) {
        $errorMsg = "잘못된 아이디 입력 양식.\n4~10자리 사이의 영문 소문자만 가능합니다. Ex) callnet";
        echo json_encode(array("result"=>"FORMAT_ERROR", "msg"=>$errorMsg));
    }
    else if (strlen($memberId) > 10) {
        $errorMsg = "아이디 길이는 10 글자를 초과할 수 없습니다.";
        echo json_encode(array("result"=>"FORMAT_ERROR", "msg"=>$errorMsg));
    }
    else if (strlen($memberId) < 4) {
        $errorMsg = "아이디는 최소 4글자 이상 입력해주세요.";
        echo json_encode(array("result"=>"FORMAT_ERROR", "msg"=>$errorMsg));
    }
    else {
        $c = new userClass();
        if ($c->isUserExisted($memberId)) {
            echo '{"result":"0"}'; // echo json_encode(array('result' => '0')); 과 동일
        } else {
            echo '{"result":"1"}';
        }
    }
}
?>