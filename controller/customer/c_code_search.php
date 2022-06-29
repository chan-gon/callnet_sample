<?php
header("Content-Type: application/json; charset=utf-8");
require_once dirname(__DIR__) . '/config/db.php';

$customerNum = $_POST['customerNum'];

$request = "SELECT customer_num FROM customer WHERE customer_num = '$customerNum'";
$response = pg_query($GLOBALS['DB_CONNECTION'], $request);
$data = pg_fetch_array($response);

$result[] = array();
if (pg_num_rows($response) > 0) {
    $result[0] = array('result' => true, 'msg' => '존재하는 고객 코드');
    echo json_encode($result);
} else {
    $result[0] = array('result' => false, 'msg' => '존재하지 않는 고객 코드');
    echo json_encode($result);
}
?>