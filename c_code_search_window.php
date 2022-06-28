<?php

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>고객코드 검색</title>
</head>
<body>
<h1>고객코드 검색 결과</h1>
<p>
    <input type="text" id="childValue">

</p>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    const customerCode = window.opener.document.getElementById( "customerCode" ).value;
    $(document).ready(function () {
       $.ajax({
           type: "post",
           url: "./customer/c_code_search.php",
           data: {customerCode : customerCode},
           success: function (data) {
               if (data[0].result) {
                   alert(data[0].msg);
               } else {
                   alert(data[0].msg);
               }
           },
           error: function (err) {
               alert(err);
           }
       })
    });
</script>
</body>
</html>
