<?php
extract($_POST);
if (isset($_POST)) {
     require_once '../config.php';
    $c = new consultClass();
    $consulting = $c->addConsultRecord($customerCID, $customerNum, $consultDate, $consultantName, $consultRoot, $categoryLarge, $categoryMedium, $consultResult, $consultContent);
    if ($consulting) {
        echo json_encode(array('result'=>'SUCCESS'));
    } else {
        echo json_encode(array('result'=>'FAIL'));
    }
} else {
    // 입력받은 데이터에 문제가 있을 경우
    echo json_encode(array('result'=>'DATA-NOTFOUND'));
}
?>
