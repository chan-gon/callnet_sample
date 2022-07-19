<?php
	session_start();
	$sid = date("His");
	$sid .= $_SESSION['CtiID'];
	$ssid = $sid;
	$_SESSION['session_id'] = $ssid;
	
	$session_id = $_SESSION['session_id'];
echo $session_id;
?>
