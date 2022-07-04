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
            <td>고객 등급</td>
            <td>고객 등급 진입일</td>
            <td>우편번호</td>
            <td>도로명주소</td>
            <td>지번주소</td>
            <td>상세주소</td>
        </tr>
        <tr id="customerInfo"></tr>
    </table>
    <br>
    <input type="button" value="닫기" onclick="window.close()">
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

        const zonecode = document.getElementById("zonecode").innerHTML;
        const roadAddr = document.getElementById("road_addr").innerHTML;
        const jibunAddr = document.getElementById("jibun_addr").innerHTML;
        const specificAddr = document.getElementById("specific_addr").innerHTML;

        const customerEmailArr = document.getElementById("customer_email").innerHTML.split('@');
        const customerEmailOne = customerEmailArr[0];
        const customerEmailTwo = customerEmailArr[1];

        window.opener.document.getElementById("customer-num").value = customerNum;
        window.opener.document.getElementById("customer-name").value = customerName;
        window.opener.document.getElementById("customer-id").value = customerId;

        // 회원등급 입력값에 따른 option 태그 변경 설정
        if (customerGrade == '일반') {
            window.opener.document.getElementById("customer-grade").selectedIndex = 1;
        } else if (customerGrade == '우수') {
            window.opener.document.getElementById("customer-grade").selectedIndex = 2;
        } else {
            window.opener.document.getElementById("customer-grade").selectedIndex = 3;
        }

        window.opener.document.getElementById("customer-tel").value = customerTel;
        window.opener.document.getElementById("customer-phone").value = customerPhone;
        window.opener.document.getElementById("email-input-one").value = customerEmailOne;
        window.opener.document.getElementById("email-input-two").value = customerEmailTwo;
        window.opener.document.getElementById("zonecode").value = zonecode;
        window.opener.document.getElementById("roadAddress").value = roadAddr;
        window.opener.document.getElementById("jibunAddress").value = jibunAddr;
        window.opener.document.getElementById("specificAddress").value = specificAddr;

        // 고객정보입력>고객정보수정으로 버튼 상태 변경
        window.opener.document.getElementById("customerInfoSaveBtn").remove();
        const updateBtn = document.createElement("input");
        updateBtn.setAttribute("class", "section-main-button")
        updateBtn.setAttribute("id", "customerInfoUpdateBtn");
        updateBtn.setAttribute("type", "button");
        updateBtn.setAttribute("value", "고객정보수정");
        updateBtn.setAttribute("onclick", "updateUserInfo();");
        window.opener.document.getElementById("section-main-title").after(updateBtn);

        window.close();
    }
</script>
</body>
</html>
