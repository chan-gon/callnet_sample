<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    $c = new userClass();
    // 동일한 사용자가 등록되어 있는지 확인
    if ($c->isUserExisted($memberId)) {
        echo '{"result":"0"}';
    } else {
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