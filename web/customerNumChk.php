<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';

    $c = new customerClass();
    $customerInfo = $c->isCustomerNumExisted($customerNum);
    if ($customerInfo) {
        echo json_encode(array('result'=>'EXISTED'));
    } else {
        echo json_encode(array('result'=>'NOT_EXISTED'));
    }

} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'DATA-NOTFOUND', 'msg'=>'데이터가 제대로 전송되지 않았습니다.'));
}
?>