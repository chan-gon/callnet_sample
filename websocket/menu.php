<?php session_start();?>
<?//require_once "./inc/db/db.php"; $ipcc_db = db_connect();?>
<?//require_once "./inc/common/common.php";?> <!-- 세션 체크 함수 -->
<?//require_once "./inc/common/cn_function.php";?> <!-- 자주 사용하는 함수 모음 -->

<?php require_once "db_ubigen.php" ?>
<?php
//현재날짜를 계산한다(YYYY-MM-DD HH:MM:SS)
$datetemp = date("Y-m-d");
$datetemp1 = date("Ymd");
$writedate = date("His");
$writedatetime = $datetemp1;
$asw = date("YmdHis");

$AgtID	 	= $_SESSION['AgtID'];
$AgtAuth	= $_SESSION['AgtAuth'];

?>
<html>
<head>
<title>::: Call Center System ::: - CTI Module</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>

    .menu-table {border: none; width: 100%;}
    .menu-table td {border: none}
    .menu-table td input {font-family: "맑은 고딕"}
    #dial-num-table td input {
        width: 137px;
        height: 60px;
        font-size: 30px;
        font-weight: bold;
    }

/**/
/*	A:link   { text-decoration: none;  color: #000000;}*/
/*	A:visited   { text-decoration: none; color: #000000;}*/
/*	A:active   { text-decoration: none; }*/
/*	A:hover   { font-size:10pt; text-decoration: none; color: #0033CC; }*/

/*	table {*/
/*		font-family: "맑은 고딕";*/
/*		font-size: 11px;*/
/*		color: #5a5a5a;*/
/*	}*/
/*	td {*/
/*		font-family: "맑은 고딕";*/
/*		font-size: 12px;*/
/*		color: #5a5a5a;*/
/*	}*/

/*	input {*/
/*		background-color:;*/
/*		font-size:9pt;*/
/*		font-family: "맑은 고딕";*/
/*	}*/

/*	select {*/
/*		font-family: "맑은 고딕"; font-size: 12px; color: #5a5a5a; background-color:#fafafa; border: 1px #CFCFCF solid*/
/*	}*/

/*	.small_blue {*/
/*		font-family: "고딕";*/
/*		font-size: 12px;*/
/*		color: #3071B1;*/
/*		font-weight: bold;*/
/*		line-height: normal;*/
/*	}*/


/* #telno {font-size : 9pt};*/
</style>
</head>
<body onload="Ctilogin();">
<table class="menu-table">
  <tr>
    <td>
	  <table class="menu-table">
        <tr>
          <td>
			<!-- <table width="75" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td height="1"></td>
				</tr>
			</table> -->
		    <table class="menu-table">
              <tr>
				  <table class="menu-table">
                    <tr>&nbsp;&nbsp;&nbsp;
<form name="fm">
	<input type="hidden" size="30"id="session_id" name="session_id" value="<?php $_SESSION['session_id']?>">
	<input type="hidden" name="logintype" value="0">
	<input type="hidden" name="popchk" value="">
	<input type="hidden" name="iogubun" value="">
	<input type="hidden" name="SdCallTime" value="">
	<input type="hidden" name="AgtID" value="<?php $_SESSION['AgtID']?>">
	<input type="hidden" name="CtiID" value="<?php $_SESSION['CtiID']?>">
	<input type="hidden" name="AgtName" value="<?php $_SESSION['AgtName']?>">
	<input type="hidden" name="AgtIntel" value="<?php $_SESSION['AgtIntel']?>">
 
                      <td><b style = 'font-size:10pt;'>&nbsp;&nbsp;전화번호</b>&nbsp;&nbsp;</td>
					  <td><input style ='font-size:10pt;'type="text" id="telno" name="telno" value=""></td>
					  <td></td>
					  <td><b><div id="divclock" style = 'font-size:10pt'>통화시간 : 00:00:00</div></b></td>
                    </tr>
                    <tr>
					    <table class="menu-table">
						  <tr>
							<td>
					          <table class="menu-table" id="button-table">
					          	<tr>
									<tr>
										<td>&nbsp;
											<input type="button" id="btMakecall" name="btMakecall" value="전 화 걸 기">
										</td>
										<td>
											<input type="button"  id="btAnswer" name="btAnswer" value="전 화 받 기">
										</td>
										<td>
											<input type="button"  id="btCalldisconn" name="btCalldisconn" value="전 화 끊 기">
										</td>
									</tr>
									<tr>
										<td>&nbsp;
											<input type="button" id="btConsult" name="btConsult" value="호전환시도">
										</td>
										<td>
											<input type="button"  id="btTrensfer" name="btTrensfer" value="호전환완료">
										</td>
										<td>
											<input type="button" id="btReconnect" name="btReconnect" value="호전환취소">
										</td>
									</tr>
									<tr>
										<td>&nbsp;
											<input type="button"  id="btBreakon" name="btBreakon" value="휴 식 하 기">
										</td>
										<td>
											<input type="button"  id="btLunch" name="btLunch" value="점 심 식 사">
										</td>
										<td rowspan="2" >
											<input  type="button" id="btIdle" name="btIdle" value="업 무 대 기">
										</td>
									</tr>
									<tr>
										<td >&nbsp;
											<input type="button"  id="btEducation" name="btEducation" value="교 육 시 작">
										</td>
										<td >
											<input type="button" id="btPaperwork" name="btPaperwork" value="기 타 업 무">
										</td>
									</tr>
									<tr>
										<td >&nbsp;
											<input type="button"  id="btSelrec" name="btSelrec" value="선택녹취S">
										</td>
										<td >
											<input type="button" id="btSelrecEnd" name="btSelrecEnd" value="선택녹취E">
										</td>
									</tr>
								</tr>
							  </table>
							</td>
							<td>
					          <table class="menu-table">
								<tr>
								   <td>
									 <textarea id="status" name="status" style="width: 97%; overflow-y: scroll;" rows="9"></textarea>
								   </td>
								</tr>
								<tr>
								  <td><input type="button" id="btConn" name="btConn" value="로그인"><input type="button" id="btDisConn" name="btDisConn" value="로그아웃"></td>
								</tr>
							  </table>
							</td>
						  </tr>
                        </table>
                        <table class="menu-table">
						  <tr>
						  	<td>
						  		<table class="menu-table" id="dial-num-table">
						  			<tr>
						  				<td>&nbsp;
											<input type="button" id="btkeypad_1" name="btkeypad_1" value="1" onClick="addTelnum(this.form.btkeypad_1.value)">
										</td>
										<td>
											<input type="button"  id="btkeypad_2" name="btkeypad_2" value="2" onClick="addTelnum(this.form.btkeypad_2.value)">
										</td>
										<td>
											<input type="button" id="btkeypad_3" name="btkeypad_3" value="3" onClick="addTelnum(this.form.btkeypad_3.value)">
										</td>
						  			</tr>
						  			<tr>
						  				<td>&nbsp;
											<input type="button" id="btkeypad_4" name="btkeypad_4" value="4" onClick="addTelnum(this.form.btkeypad_4.value)">
										</td>
										<td>
											<input type="button"  id="btkeypad_5" name="btkeypad_5" value="5" onClick="addTelnum(this.form.btkeypad_5.value)">
										</td>
										<td>
											<input type="button" id="btkeypad_6" name="btkeypad_6" value="6" onClick="addTelnum(this.form.btkeypad_6.value)">
										</td>
						  			</tr>
						  			<tr>
						  				<td>&nbsp;
											<input type="button" id="btkeypad_7" name="btkeypad_7" value="7" onClick="addTelnum(this.form.btkeypad_7.value)">
										</td>
										<td>
											<input type="button"  id="btkeypad_8" name="btkeypad_8" value="8" onClick="addTelnum(this.form.btkeypad_8.value)">
										</td>
										<td>
											<input type="button" id="btkeypad_9" name="btkeypad_9" value="9" onClick="addTelnum(this.form.btkeypad_9.value)">
										</td>
						  			</tr>
						  			<tr>
						  				<td>&nbsp;
											<input type="button" id="btkeypad_010" name="btkeypad_010" value="010" onClick="addTelnum(this.form.btkeypad_010.value)">
										</td>
										<td>
											<input type="button"  id="btkeypad_0" name="btkeypad_0" value="0" onClick="addTelnum(this.form.btkeypad_0.value)">
										</td>
										<td>
											<input type="button" id="btkeypad_clear" name="btkeypad_clear" value="지우기" onClick="delTelnum()">
										</td>
						  			</tr>

						  		</table>
						  	</td>
						  </tr>
                        </table>
                    </tr>


<!--  cti module 끝  -->
                    <tr>

</form>
                    </tr>
                  </table>
				</td>
              </tr>
            </table>
		  </td>
		</tr>
	  </table>
	</td>
  </tr>
</table>

</body>
</html>
