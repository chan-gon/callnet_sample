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
            <td>고객 ID</td>
            <td>고객 이름</td>
            <td>고객 전화번호</td>
            <td>고객 휴대폰</td>
            <td>고객 이메일</td>
            <td>고객 주소</td>
            <td>고객 등급</td>
            <td>고객 등급 진입일</td>
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
                   $.each(data.result, function (key, value) {
                        $("#customerInfo").append("<td style='cursor: pointer' onclick='sendCustomerInfo()' id='"+key+"'>" + value +"</td>");
                   });
               }
           },
           error: function (err) {
               alert(err);
           }
       })
    });

    function sendCustomerInfo() {
        const customerNum = document.getElementById("customer_num").innerHTML;
        const customerName = document.getElementById("customer_name").innerHTML;
        const customerId = document.getElementById("customer_id").innerHTML;
        const customerGrade = document.getElementById("customer_grade").innerHTML;
        const customerTel = document.getElementById("customer_tel").innerHTML;
        const customerPhone = document.getElementById("customer_phone").innerHTML;

        let customerAddrArr = document.getElementById("customer_address").innerHTML.split(' ');
        const zonecode = customerAddrArr[0];
        const roadAddress = customerAddrArr[1];
        const jibunAddress = customerAddrArr[2];
        const specificAddress = customerAddrArr[3];

        let customerEmailArr = document.getElementById("customer_email").innerHTML.split('@');
        const customerEmailOne = customerEmailArr[0];
        const customerEmailTwo = customerEmailArr[1];

        window.opener.document.getElementById("customer-num").value = customerNum;
        window.opener.document.getElementById("customer-name").value = customerName;
        window.opener.document.getElementById("customer-id").value = customerId;
        window.opener.document.getElementById("customer-grade").value = customerGrade;
        window.opener.document.getElementById("customer-tel").value = customerTel;
        window.opener.document.getElementById("customer-phone").value = customerPhone;
        window.opener.document.getElementById("email-input-one").value = customerEmailOne;
        window.opener.document.getElementById("email-input-two").value = customerEmailTwo;
        window.opener.document.getElementById("zonecode").value = zonecode;
        window.opener.document.getElementById("roadAddress").value = roadAddress;
        window.opener.document.getElementById("jibunAddress").value = jibunAddress;
        window.opener.document.getElementById("specificAddress").value = specificAddress;
        window.close();
    }
</script>
</body>
</html>
