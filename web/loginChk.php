<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';

    $memberId = $_POST['memberId'];
    $memberPwd = $_POST['memberPwd'];

    if ($memberId == "") {
        $errorMsg = "아이디를 입력하세요.";
        echo json_encode(array("result"=>"LOGIN_ERROR", "msg"=>$errorMsg));
    }
    else if ($memberPwd == "") {
        $errorMsg = "비밀번호를 입력하세요.";
        echo json_encode(array("result"=>"LOGIN_ERROR", "msg"=>$errorMsg));
    }
    else {
        $c = new userClass();
        $member = $c->getUser($memberId, $memberPwd);

        if ($member) {
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['member_id'] = $member['member_id'];
            echo json_encode(array('result'=>'0', 'msg'=>'로그인 성공'));
        } else {
            echo json_encode(array('result'=>'1', 'msg'=>'존재하지 않는 사용자'));
        }
    }

} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'2'));
}
?>