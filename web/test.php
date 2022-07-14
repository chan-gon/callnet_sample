<?php
require_once '../config.php';
$pdo = new PDO(dsn);

$sql_count = "SELECT count(*) AS count FROM consulting";
$stmt = $pdo->prepare($sql_count);
$stmt->execute();

$limit = 5;
$row_count = $stmt->fetch();
$total_records = $row_count['count'];
$total_pages = ceil($total_records / $limit);
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="table-wrapper">
        <div class="table-title">
            <div class="row">
                <div class="col-sm-6">
                    <h2>Manage <b>Employees</b>Add New Employee</span></a></h2>
                </div>
            </div>
        </div>
        <div id="target-content">loading...</div>

        <div class="clearfix">

            <ul class="pagination">
                <?php
                if(!empty($total_pages)){
                    for($i=1; $i<=$total_pages; $i++){
                        if($i == 1){
                            ?>
                            <li class="pageitem active" id="<?php echo $i;?>"><a href="javaScript:void(0);" data-id="<?php echo $i;?>" class="page-link" ><?php echo $i;?></a></li>

                            <?php
                        }
                        else{
                            ?>
                            <li class="pageitem" id="<?php echo $i;?>"><a href="javaScript:void(0);" class="page-link" data-id="<?php echo $i;?>"><?php echo $i;?></a></li>
                            <?php
                        }
                    }
                }
                ?>
            </ul>
            </ul>
        </div>
    </div>
</div>
<script>
    $(document).ready(function() {
        $("#target-content").load("pagination.php?page=1");
        $(".page-link").click(function(){
            var id = $(this).attr("data-id");
            var select_id = $(this).parent().attr("id");
            $.ajax({
                url: "pagination.php",
                type: "GET",
                data: {
                    page : id
                },
                cache: false,
                success: function(dataResult){
                    $("#target-content").html(dataResult);
                    $(".pageitem").removeClass("active");
                    $("#"+select_id).addClass("active");

                }
            });
        });
    });
</script>
</body>
</html>