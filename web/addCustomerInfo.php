<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    $c = new customerClass();
    $customer = $c->addCustomerInfo($customerNum, $customerId, $customerName, $customerGrade, $customerTel, $customerPhone, $customerEmailAddr, $customerAddr);
    if ($customer) {
        // 고객정보 등록 성공
        echo json_encode(array('result'=>'SUCCESS'));
    } else {
        // 고객정보 등록 실패
        echo json_encode(array('result'=>'FAIL'));
    }
} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'DATA-NOTFOUND'));
}
?>
