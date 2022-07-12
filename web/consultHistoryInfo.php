<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>상담이력 세부 조회</title>
    <style>
        table, td{
            border: 1px solid black;
        }
    </style>
</head>
<body>
<h1>상담이력 세부 조회</h1>
    <table id="consultHistoryInfoTable">
        <tr style="background: #D5D8DC">
            <td>상담경로</td>
            <td>고객명</td>
            <td>고객 CID</td>
            <td>고객 연락처</td>
            <td>상담원</td>
            <td>상담일자</td>
            <td>대분류</td>
            <td>중분류</td>
            <td>상담결과</td>
            <td>상담내용</td>
        </tr>
        <tr>
            <td id="consultRoot"></td>
            <td id="customerName"></td>
            <td id="customerCID"></td>
            <td id="customerPhone"></td>
            <td id="consultantName"></td>
            <td id="consultDate"></td>
            <td id="categoryLarge"></td>
            <td id="categoryMedium"></td>
            <td id="consultResult"></td>
            <td id="consultContent"></td>
        </tr>
    </table>
    <br>
    <input type="button" value="닫기" onclick="window.close()">
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    const consultRoot = opener.$("#temp-invisible-table").find("#consulting_root").text();
    const customerName = opener.$("#temp-invisible-table").find("#customer_name").text();
    const customerCID = opener.$("#temp-invisible-table").find("#customer_cid").text();
    const customerPhone = opener.$("#temp-invisible-table").find("#customer_phone").text();
    const consultDate = opener.$("#temp-invisible-table").find("#consulting_date").text();
    const categoryLarge = opener.$("#temp-invisible-table").find("#category_large").text();
    const categoryMedium = opener.$("#temp-invisible-table").find("#category_medium").text();
    const consultResult = opener.$("#temp-invisible-table").find("#consulting_result").text();
    const consultantName = opener.$("#temp-invisible-table").find("#consulting_rep_name").text();
    const consultContent = opener.$("#temp-invisible-table").find("#consulting_content").text();

    $("#consultRoot").text(consultRoot);
    $("#customerName").text(customerName);
    $("#customerCID").text(customerCID);
    $("#customerPhone").text(customerPhone);
    $("#consultantName").text(consultantName);
    $("#consultDate").text(consultDate);
    $("#categoryLarge").text(categoryLarge);
    $("#categoryMedium").text(categoryMedium);
    $("#consultResult").text(consultResult);
    $("#consultContent").text(consultContent);

</script>
</html>