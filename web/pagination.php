<?php
require_once '../config.php';
$pdo = new PDO(dsn);

$limit = 5;
if (isset($_GET['page'])) {
    $page = $_GET['page'];
} else {
    $page = 1;
}

$star_from = ($page - 1) * $limit;

$sql = "SELECT * FROM consulting ORDER BY consulting_date LIMIT $limit OFFSET $star_from";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<table class="table table-bordered table-striped">
    <thead>
    <tr>
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
    </thead>
    <tbody>
    <?php
    foreach ($result as $row) {
        ?>
        <tr>
            <td><?php echo $row["customer_name"]; ?></td>
            <td><?php echo $row["customer_phone"]; ?></td>
            <td><?php echo $row["customer_email"]; ?></td>
            <td><?php echo $row["consulting_root"]; ?></td>
            <td><?php echo $row["customer_cid"]; ?></td>
            <td><?php echo $row["consulting_date"]; ?></td>
            <td><?php echo $row["category_large"]; ?></td>
            <td><?php echo $row["category_medium"]; ?></td>
            <td><?php echo $row["consulting_result"]; ?></td>
            <td><?php echo $row["consultant_name"]; ?></td>
        </tr>
        <?php
    };
    ?>
    </tbody>
</table>