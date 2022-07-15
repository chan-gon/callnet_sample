<?php
require_once '../config.php';
$pdo = new PDO(dsn);
require_once("../class/paginationClass.php");

$perPage = new PerPage();
$executedQuery = $_GET['executedQuery'];

$limit = 5;
$sql = $executedQuery;
$paginationlink = "web/getPagination.php?page=";

$page = 1;
if(!empty($_GET["page"])) {
    $page = $_GET["page"];
}
$start = ($page-1)*$perPage->perpage;
if($start < 0) $start = 0;

$query = $sql . " LIMIT " . $limit . " OFFSET " . $start;
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// row_count
$sql_count = "SELECT count(*) AS count FROM consulting";
$stmt = $pdo->prepare($sql_count);
$stmt->execute();
$row_count = $stmt->fetch();

if(empty($_GET["rowcount"])) {
    $_GET["rowcount"] = $row_count['count'];
}
$perpageresult = $perPage->getAllPageLinks($_GET["rowcount"], $paginationlink);
$output = '';
$output .= "<table>
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
</tr>";

foreach($result as $k=>$v) {
    $output .= "<tr>
       <td id='empty-space'>&nbsp</td>
       <td>".$result[$k]['customer_name']."</td>
       <td>".$result[$k]['customer_phone']."</td>
       <td>".$result[$k]['customer_email']."</td>
       <td>".$result[$k]['consulting_root']."</td>
       <td>".$result[$k]['customer_cid']."</td>
       <td>".$result[$k]['consulting_date']."</td>
       <td>".$result[$k]['category_large']."</td>
       <td>".$result[$k]['category_medium']."</td>
       <td>".$result[$k]['consulting_result']."</td>
       <td>".$result[$k]['consultant_name']."</td>
    </tr>";

    $output .= '<div class="question"><input type="hidden" id="rowcount" name="rowcount" value="' . $_GET["rowcount"] . '" /></div>';
}
$output .= '</table>';
if(!empty($perpageresult)) {
    $output .= $perpageresult .'<div id="pagination"></div>';
}

print $output;
?>