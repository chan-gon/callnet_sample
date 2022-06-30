<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    $c = new userClass();
    $member = $c->getUser($memberId, $memberPwd);

    if ($member) {
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['member_id'] = $member['member_id'];
        echo json_encode(array('result'=>'0'));
    } else {
        echo json_encode(array('result'=>'1'));
    }
} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'2'));
}
?>