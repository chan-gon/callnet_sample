<?php
require_once dirname(__DIR__) . '/config/db.php';
$memberId = $_POST['id'];
$memberPwd = $_POST['password'];

$request = "SELECT "
?>