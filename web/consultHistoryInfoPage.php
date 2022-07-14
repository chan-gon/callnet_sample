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
        table {
            width: calc(100% - 1em);
            text-align: center;
        }
        tr:first-child {
            background: #D5D8DC;
            text-align: center;
        }
        textarea {
            width: calc(100% - 0.4em);
            resize: none;
        }
    </style>
</head>
<body>
<h1>상담이력 세부 조회</h1>
<form id="ttt">
    <table id="consultHistoryInfoTable">
        <tr style="background: #D5D8DC">
            
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
        <tr id="consult-data-row">
            <td id="customerName"></td>
            <td id="customerPhone"></td>
            <td id="customerEmail"></td>
            <td id="consultRoot"></td>
            <td id="customerCID"></td>
            <td id="consultDate"></td>
            <td id="categoryLarge"></td>
            <td id="categoryMedium"></td>
            <td id="consultResult"></td>
            <td id="consultantName"></td>
        </tr>
    </table>
    <br/>
    <table>
        <tr>
            <td>상담내용</td>
        </tr>
        <tr>
            <td colspan="11">
                <textarea rows="10" id="consultContent" readonly></textarea>
            </td>
        </tr>
    </table>
</form>
    <br>
    <input type="button" value="닫기" onclick="window.close()">
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    const consultRoot = opener.$("#temp-invisible-table").find("#consulting_root").text();
    const customerName = opener.$("#temp-invisible-table").find("#customer_name").text();
    const customerCID = opener.$("#temp-invisible-table").find("#customer_cid").text();
    const customerEmail = opener.$("#temp-invisible-table").find("#customer_email").text();
    const customerPhone = opener.$("#temp-invisible-table").find("#customer_phone").text();
    const consultDate = opener.$("#temp-invisible-table").find("#consulting_date").text();
    const categoryLarge = opener.$("#temp-invisible-table").find("#category_large").text();
    const categoryMedium = opener.$("#temp-invisible-table").find("#category_medium").text();
    const consultResult = opener.$("#temp-invisible-table").find("#consulting_result").text();
    const consultantName = opener.$("#temp-invisible-table").find("#consultant_name").text();
    const consultContent = opener.$("#temp-invisible-table").find("#consulting_content").text();

    $("#consultRoot").text(consultRoot);
    $("#customerName").text(customerName);
    $("#customerCID").text(customerCID);
    $("#customerEmail").text(customerEmail);
    $("#customerPhone").text(customerPhone);
    $("#consultantName").text(consultantName);
    $("#consultDate").text(consultDate);
    $("#categoryLarge").text(categoryLarge);
    $("#categoryMedium").text(categoryMedium);
    $("#consultResult").text(consultResult);
    $("#consultContent").text(consultContent);
</script>
</html>