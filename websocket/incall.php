<?session_start();?>
<?include "./inc/db/db.php"; $ipcc_db = db_connect();?>
<?include "./inc/common/cn_function.php"; ?>

<?
$datetemp = date("Ymd");
$writedate = date("YmdHis");

$user_id = $_SESSION['AgtID'];
$user_nm = $_SESSION['AgtName'];

$cid = $_REQUEST['cid'];
$space = $_REQUEST['space'];
$pre_dnis = $_REQUEST['dnis'];

/*
$dnis = "";
switch ($pre_dnis) {
	case '07079961009'  : $dnis = "[더줌 컴퍼니]"; break;
	case '07079961010'  : $dnis = "[5G ZONE]"; break;
	case '07079961011'  : $dnis = "[해빛씨엔에스]"; break;
}
*/


?>




<html>
<head>
<title>전화가 왔습니다</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="../../inc/js/sy.js"></script>
<link rel="stylesheet" href="../../inc/css/common.css" type="text/css">
<script language="javascript">
<!--
/*
	var nTimer = null;

	window.onbeforeunload = windowOnClose;
	function WindowClose(val){
		//닫기버튼으로 종료
		window.close();
	}
*/
	function windowOnClose(val){
		//시스템메뉴 종료버튼으로 종료
		//var new_id = document.fm.new_id.value;
		var call_no = document.fm.call_no.value;
		returnValue = val + "," + call_no;
		//returnValue = new_id + "," + call_no;
		//alert(returnValue);
		window.close();
	}
//-->
</script>
</head>
<body>
	<table width="550" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td height="40" bgcolor="#cccccc" align="center" colspan="2"><font size="4" face="굴림"><b> <?=$dnis?> <?=ConvertTel($cid)?> &nbsp; 전화가 왔습니다.</b></font></td>
		</tr>
		<tr>
			<td height="10" align="center" colspan="2"></td>
		</tr>
		<tr>
			<td height="100" align="center" colspan="2"><img src="./image/km35_1637313.jpg"></td>
		</tr>
		<tr>
			<td height="10" align="center" colspan="2"></td>
		</tr>
		<!--tr>
			<td width="40%" height="30" align="right"><font size="2"><b>발신 번호 :</b></font><br></td>
			<td width="60%" align="left">&nbsp;<font size="2"><b><?=ConvertTel($cid)?></b></font><br></td>
		</tr>
		<tr>
			<td width="300" height="20" bgcolor="" align="center" colspan="2">
				<input type="button" name="btn_daegi_cancel" value="확      인" class="btnType1" onClick="WindowClose()" style="height:25px;width=200px;">
			</td>
		</tr-->
	</table>
	<table width="550" border="0" cellpadding="0" cellspacing="1" bgcolor="#A3C6D7">
		<tr bgcolor="#EEF5F8">
			<td width="7%" align="center" height="22">NO</td>
			<td width="23%" align="center">고객명</td>
			<td width="21%" align="center">전화번호</td>
			<td width="21%" align="center">핸드폰번호</td>
			<td width="14%" align="center">선 택</td>
<?
if ($cid == ""){
		$new_id = "NON";
?>
		<tr bgcolor="#FFFFFF" onMouseOver="this.style.backgroundColor='#E7E7E7'" onMouseOut="this.style.backgroundColor='#FFFFFF'" style="cursor:hand" align="center">
			<td height="25" colspan="4"><?=ConvertTel($cid)?>는 등록되지 않은 번호입니다. 확인을 눌러주세요.</td>
			<td ><input type="button" name="btn_daegi_cancel" value="확 인" class="btnType1" onClick="windowOnClose('<?=$new_id?>')" style="height:22px;width=60px;"></td>
		</tr>
<?
} else {

	$sql = "select idx, cust_name, cust_hp, cust_tel from customer where replace(replace(cust_tel,'-',''),' ','') = '" . str_replace("-","",$cid) . "' or replace(replace(cust_hp,'-',''),' ' ,'') = '" . str_replace("-","",$cid) . "'";	
	//echo $sql;
	//return;
	$result = db_exec($ipcc_db, $sql);
	$row = db_numrows($result);

	//$data = db_fetch_array($result);

	if ($row < 1){
		$new_id = "NON";
?>
		<tr bgcolor="#FFFFFF" onMouseOver="this.style.backgroundColor='#E7E7E7'" onMouseOut="this.style.backgroundColor='#FFFFFF'" style="cursor:hand" align="center">
			<td height="25" colspan="4"><?=ConvertTel($cid)?>는 등록되지 않은 번호입니다. 확인을 눌러주세요.</td>
			<td ><input type="button" name="btn_daegi_cancel" value="확 인" class="btnType1" onClick="windowOnClose('<?=$new_id?>')" style="height:22px;width=60px;"></td>
		</tr>
<?
	} else {
	
		$n=1;
		while( $data = db_fetch_array($result) )
		{	 
		$new_id	= $data["idx"];
		$cust_name = $data["cust_name"];
		$cust_tel = $data["cust_tel"];
		$cust_hp = $data["cust_hp"];

?>
		<tr bgcolor="#FFFFFF" onMouseOver="this.style.backgroundColor='#E7E7E7'" onMouseOut="this.style.backgroundColor='#FFFFFF'" style="cursor:hand" align="center">
			<td height="25"><?=$n?></td>
			<td><?=$cust_name?></td>
			<td><?=ConvertTel($cust_tel)?></td>
			<td><?=ConvertTel($cust_hp)?></td>
			<td ><input type="button" name="btn_daegi_cancel" value="확 인" class="btnType1" onClick="windowOnClose('<?=$new_id?>')" style="height:22px;width=60px;"></td>
		</tr>
	<?
		$n = $n + 1;
		}
?>
	</table>
<?
	}

}
	//	Call_no 코드 
	$sql2 = "SELECT MAX(call_no) AS max_id FROM call_list WHERE call_no LIKE '$datetemp%'";
	$result2 = db_exec($ipcc_db, $sql2);
	$data = db_fetch_array($result2);

	if ( !$data ) {
		$call_no = $datetemp."_0001";
	} else {
		$max_id = $data["max_id"];

		if (!$max_id){
			$call_no = $datetemp."_0001";
		} else {
			$tmp_id = substr($max_id,9,4);

			if ($tmp_id == "" or empty($tmp_id)) {
				$call_no = $datetemp & "_0001";
			} else {
				$new_max_id = $tmp_id + 1;

				if ($new_max_id < 10){
					$call_no = $datetemp . "_000" . $new_max_id;
				}else if ($new_max_id < 100){
					$call_no = $datetemp . "_00" . $new_max_id;
				}else if ($new_max_id < 1000){
					$call_no = $datetemp . "_0" . $new_max_id;
				} else {
					$call_no = $datetemp . "_" . $new_max_id;
				}
			}
		}
	}

	$sql2 = "insert into call_list (call_no, cust_cd, call_date, agt_id, agt_name, call_cid, save_yn) values";
	$sql2 .= "('$call_no', '$new_id', '$writedate', '$user_id', '$user_nm', '$cid', 'N')";
	db_exec($ipcc_db, $sql2);
	db_close($ipcc_db);

?>
</body>
</html>

<form name="fm">
	<input type="hidden" name="new_id" value="<?=$new_id?>">
	<input type="hidden" name="call_no" value="<?=$call_no?>">
</form>
