<?php
$t = time();
$fileName = "상담이력". date("Y-m-d", $t);
header( "Content-type: application/vnd.ms-excel" );
header( "Content-type: application/vnd.ms-excel; charset=utf-8");
header( "Content-Disposition: attachment; filename = $fileName.xls" );
header( "Content-Description: PHP4 Generated Data" );

require_once '../config.php';
$pdo = new PDO(dsn);

$query = $_POST['sql-hidden'];
$sql = $query;

$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$EXCEL_STR = "
<style>
#menu {background: #D5D8DC; font-weight: bold; text-align: center;}
td {border: 1px solid black; mso-number-format:'\@';}
#empty-space {border: none; background: #FFFFFF;}
</style>
<h2>상담이력 조회 결과</h2>
<table>
<tr id='menu'>
    <td id='empty-space'>&nbsp</td>
    <td>고객명</td>
    <td>고객 연락처</td>
    <td>고객 이메일</td>
    <td>상담경로</td>
    <td>CID</td>
    <td>상담일자</td>
    <td>대분류</td>
    <td>중분류</td>
    <td>상담결과</td>
    <td>상담원</td>
</tr>
";

foreach ($result as $value) {
    $EXCEL_STR .= "
   <tr>
       <td id='empty-space'>&nbsp</td>
       <td>".$value['customer_name']."</td>
       <td>".$value['customer_phone']."</td>
       <td>".$value['customer_email']."</td>
       <td>".$value['consulting_root']."</td>
       <td>".$value['customer_cid']."</td>
       <td>".$value['consulting_date']."</td>
       <td>".$value['category_large']."</td>
       <td>".$value['category_medium']."</td>
       <td>".$value['consulting_result']."</td>
       <td>".$value['consultant_name']."</td>
    </tr>
   ";
}
$EXCEL_STR .= "</table>";
echo "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
echo $EXCEL_STR;
?>