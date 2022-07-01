<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    $c = new customerClass();
    $customerInfo = $c->isCustomerExisted($customerNum);
    if ($customerInfo) {
        echo json_encode(array('result'=>$customerInfo));
    } else {
        echo json_encode(array('result'=>'FAIL'));
    }
} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'DATA-NOTFOUND'));
}
?>