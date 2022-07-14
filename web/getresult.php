<?php
require_once '../config.php';
$pdo = new PDO(dsn);
require_once("pagination.class.php");

$perPage = new PerPage();

$limit = 5;
$sql = "SELECT * FROM consulting ORDER BY consulting_date ";

$paginationlink = "getresult.php?page=";
$pagination_setting = $_GET["pagination_setting"];

$page = 1;
if(!empty($_GET["page"])) {
    $page = $_GET["page"];
}

$start = ($page-1)*$perPage->perpage;
if($start < 0) $start = 0;

$query =  $sql . " LIMIT " . $limit . " OFFSET " . $start;
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

if($pagination_setting == "prev-next") {
    $perpageresult = $perPage->getPrevNext($_GET["rowcount"], $paginationlink,$pagination_setting);
} else {
    $perpageresult = $perPage->getAllPageLinks($_GET["rowcount"], $paginationlink,$pagination_setting);
}


$output = '';
foreach($result as $k=>$v) {
    $output .= '<div class="question"><input type="hidden" id="rowcount" name="rowcount" value="' . $_GET["rowcount"] . '" />' . $result[$k]["consultant_name"] . '</div>';
    $output .= '<div class="answer">' . $result[$k]["consulting_date"] . '</div>';
}
if(!empty($perpageresult)) {
    $output .= '<div id="pagination">' . $perpageresult . '</div>';
}
print $output;
?>
