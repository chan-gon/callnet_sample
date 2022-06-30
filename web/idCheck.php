<?php
extract($_POST);
if (isset($_POST)) {
    require_once '../config.php';
    $c = new userClass();
    if ($c->isUserExisted($memberId)) {
        echo '{"result":"0"}'; // echo json_encode(array('result' => '0')); 과 동일
    } else {
        echo '{"result":"1"}';
    }
}
?>