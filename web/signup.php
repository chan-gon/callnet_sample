<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';

    // 입력값 검증
    $memberId = $_POST['memberId'];
    $memberPwd = $_POST['memberPwd'];
    $memberName = $_POST['memberName'];
    $memberGrade = $_POST['memberGrade'];

    if ($memberId == "") {
        $errorMsg = "아이디를 입력하세요.";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }
    if (strlen($memberId) > 10) {
        $errorMsg = "아이디 길이는 10 글자를 초과할 수 없습니다.";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }
    if (strlen($memberId) < 4) {
        $errorMsg = "아이디는 최소 4글자 이상 입력해주세요.";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }
    if (!preg_match("((([a-zA-Z]+\d+)|(\d+[a-zA-Z]+))+)", $memberId)) {
        $errorMsg = "잘못된 아이디 입력 양식.\n영문+숫자 조합으로 아이디를 입력하세요. Ex) aa77";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }
    else if ($memberPwd == "") {
        $errorMsg = "비밀번호를 입력하세요.";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }    else if ($memberName == "") {
        $errorMsg = "이름을 입력하세요.";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }
    else if ($memberGrade == "선택") {
        $errorMsg = "등급을 선택하세요.";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }
    else if (!preg_match("(^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$)", $memberName)) {
        $errorMsg = "잘못된 이름 입력 양식.\n한글 또는 영문으로만 입력하세요. Ex) 홍길동 / Daniel";
        echo json_encode(array("result"=>"SIGNUP_ERROR", "msg"=>$errorMsg));
    }
    else {
        $c = new userClass();
        $member = $c->signUpUser($memberId, $memberPwd, $memberName, $memberGrade);
        if ($member) { // 회원 등록 성공
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['member_id'] = $member['member_id'];
            echo json_encode(array('result'=>'0'));
        } else {
            // 회원 등록 실패
            echo json_encode(array('result'=>'1'));
        }
    }

} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'2'));
}
?>