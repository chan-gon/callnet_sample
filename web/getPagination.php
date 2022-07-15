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
foreach($result as $k=>$v) {
    $output .= '<div class="question"><input type="hidden" id="rowcount" name="rowcount" value="' . $_GET["rowcount"] . '" />' . $result[$k]["customer_name"] . '</div>';
    $output .= '<div class="answer">' . $result[$k]["consulting_date"] . '</div>';
}
if(!empty($perpageresult)) {
    $output .= '<div id="pagination">' . $perpageresult . '</div>';
}
print $output;
?>