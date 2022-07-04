<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    $c = new consultClass();
    $consultHistory = $c->getConsultHistory($consultDateFrom, $consultDateTo, $customerCID, $customerName, $consultRoot, $categoryLarge, $categoryMedium, $consultResult);
    if ($consultHistory) {
        echo json_encode(array('result'=>$consultHistory, 'msg'=>'SUCCESS'));
    } else {
        echo json_encode(array('result'=>NULL, 'msg'=>'DATA-NOTFOUND'));
    }
}
?>