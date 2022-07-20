<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    require_once '../db_ubigen.php';

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
            // ubigen_0307 DB에서 상담원 정보 가져오기
            $agtid = $member['agtid'];
            $sql = "SELECT * FROM agentinfo WHERE agtid = '$agtid'";
            $agtInfos = pg_query($connect_db, $sql);
            $data = pg_fetch_array($agtInfos);
            $temp = $data['agtctiid'];

            // 세션 등록
            $_SESSION['AgtID'] = $data['agtid'];
            $_SESSION['CtiID'] = $data['agtctiid'];
            $_SESSION['AgtName'] = $data['agtname'];
            $_SESSION['AgtAuth'] = $data['agtauth'];
            $_SESSION['AgtIntel'] = $data['agtctiid'];
            $_SESSION['session_id'] = rand(); // 세션 아이디는 중복되지 않는 임의의 숫자를 생성하는 방식으로 지정

            $_SESSION['memberId'] = $member['member_id'];
            $_SESSION['memberName'] = $member['member_name'];
            $_SESSION['memberNum'] = $member['member_num'];
            echo json_encode(array('result'=>'SUCCESS', 'msg'=>'로그인 성공'));
        } else {
            echo json_encode(array('result'=>'FAIL', 'msg'=>'존재하지 않는 사용자'));
        }
    }
} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'LOGIN_ERROR', 'msg'=>'에러 발생.'));
}
?>