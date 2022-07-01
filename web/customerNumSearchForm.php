<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="../resources/css/customerNumSearchForm.css" />
    <title>고객코드 검색</title>
</head>
<body>
<h1>고객코드 검색 결과</h1>
<p id="notice"></p>
<div>
    <table id="customerInfoTable">
        <tr>
            <td>고객번호</td>
            <td>고객명</td>
            <td>고객 ID</td>
            <td>회원등급</td>
            <td>등급진입일</td>
            <td>전화번호</td>
            <td>핸드폰</td>
            <td>e메일</td>
            <td>주소</td>
        </tr>
        <tr id="customerInfo"></tr>
    </table>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    const customerNum = window.opener.document.getElementById( "customer-num" ).value;
    $(document).ready(function () {
       $.ajax({
           url: "customerNumSearch.php",
           type: "POST",
           data: {customerNum : customerNum},
           dataType: "json",
           success: function (data) {
               if (data.result == 'FAIL') {
                   $("#notice").html("해당 고객번호의 고객 정보를 찾을 수 없습니다.");
                   $("#customerInfoTable").remove();
               } else if (data.result == 'DATA-NOTFOUND') {
                   $("#notice").html("데이터가 제대로 전송되지 않았습니다.");
               } else {
                   $("#customerNum").html(data.result.customer_num);
                   $.each(data.result, function (key, value) {
                        $("#customerInfo").append("<td>" + value +"</td>");
                   });
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
