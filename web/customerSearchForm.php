<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="../resources/css/customerNumSearchForm.css" />
    <title>고객정보 검색</title>
</head>
<body>
<h1>고객정보 검색</h1>
<p id="notice"></p>
<div>
    <form>
        <input type="text" placeholder="고객명" id="customerName">
        <input type="text" placeholder="전화번호" id="customerPhone">
        <input type="button" id="customerSearchBtn" value="검색">
    </form>
</div>
<h1>검색 결과</h1>
<div>
    <table id="customerInfoTable">
        <tr>
            <td>고객 번호</td>
            <td>고객 이름</td>
            <td>고객 휴대폰</td>
            <td>고객 이메일</td>
            <td>우편번호</td>
            <td>도로명주소</td>
            <td>지번주소</td>
            <td>상세주소</td>
        </tr>
        <tr id="searchResult"></tr>
    </table>
</div>
<br>
<input type="button" value="닫기" onclick="window.close()">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    $(function () {
        createNoResultMsg();
    });

    function createNoResultMsg() {
        let searchResult = document.getElementById("searchResult");
        if (searchResult.children.length == 0) {
            let td = document.createElement("td");
            td.innerHTML = "- NO RESULTS FOUND -";
            td.setAttribute("colspan", "12");
            td.setAttribute("id", "noResult");
            searchResult.appendChild(td);
        }
    }

    // 검색 버튼 클릭
    $("#customerSearchBtn").click(function () {
        getCustomerByNameOrPhone();
    });

    // 엔터 키 검색(이름)
    $("#customerName").keypress(function (event) {
        if (event.which == 13) {
            getCustomerByNameOrPhone();
        }
    });
    // 엔터 키 검색(전화번호)
    $("#customerPhone").keypress(function (event) {
        if (event.which == 13) {
            getCustomerByNameOrPhone();
        }
    });
    // 고객정보 검색
    function getCustomerByNameOrPhone() {
        const customerName = $("#customerName");
        const customerPhone = $("#customerPhone");

        $.ajax({
            url: "getCustomerByNameOrPhone.php",
            type: "POST",
            data: {customerName : customerName.val(), customerPhone : customerPhone.val()},
            dataType: "json",
            success: function (data) {
                if (data.result == 'NOTHING_TO_SEARCH') {
                    $("*").remove("#customerInfoRow");
                    createNoResultMsg();
                    alert(data.msg);
                }
                else if (data.result == 'CUSTOMER_SEARCH_ERROR') {
                    alert(data.msg);
                }
                else {
                    $("#noResult").remove();
                    $("*").remove("#customerInfoRow");
                    for (let i = 0; i < data.result.length; i++) {
                        let tr = document.createElement("tr");
                        tr.setAttribute("id", "customerInfoRow");
                        tr.setAttribute("onclick", "sendCustomerInfo(this)");
                        tr.setAttribute("style", "cursor: pointer");
                        $.each(data.result[i], function (key, value) {
                            let td = document.createElement("td");
                            td.setAttribute("id", key);
                            td.innerHTML = value;
                            tr.appendChild(td);
                        });
                        $("#customerInfoTable>tbody:last").append(tr)
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error : " + textStatus + "\n" + errorThrown);
            }
        });
    }

    // 고객정보 전송(고객정보/상담기록/상담이력)
    function sendCustomerInfo(e) {
        const customerNum = e.children[0].innerHTML;
        $.ajax({
           url: "getCustomerByNum.php",
           type: "POST",
           data: {customerNum : customerNum},
           dataType: "json",
           success: function (data) {
               if (data.msg === 'SUCCESS') {
                   // 고객정보 필드에 값 세팅
                   window.opener.document.getElementById("customer-num-hidden").value = data.result[0].customer_num;
                   window.opener.document.getElementById("customer-name").value = data.result[0].customer_name;
                   window.opener.document.getElementById("customer-phone").value = data.result[0].customer_phone;
                   // 이메일 주소 @ 기준으로 분리
                   const temp = data.result[0].customer_email;
                   const emailAddr = temp.split('@');
                   window.opener.document.getElementById("email-input-one").value = emailAddr[0];
                   window.opener.document.getElementById("email-input-two").value = emailAddr[1];
                   window.opener.document.getElementById("zonecode").value = data.result[0].zonecode;
                   window.opener.document.getElementById("roadAddress").value = data.result[0].road_addr;
                   window.opener.document.getElementById("jibunAddress").value = data.result[0].jibun_addr;
                   window.opener.document.getElementById("specificAddress").value = data.result[0].specific_addr;
                   // 고객정보저장 버튼을 고객정보수정으로 버튼 상태 변경
                   const saveBtn = window.opener.document.getElementById("customerInfoSaveBtn");
                   saveBtn.setAttribute("value", "고객정보수정");
                   saveBtn.setAttribute("onclick", "updateUserInfo();");

                   // 상담기록 필드에 값 세팅
                   window.opener.document.getElementById("customerNum").value = data.result[0].customer_num;
                   window.opener.document.getElementById("customerName").value = data.result[0].customer_name;
                   window.opener.document.getElementById("customerPhone").value = data.result[0].customer_phone;
                   window.opener.document.getElementById("customerEmail").value = data.result[0].customer_email;

                   // 선택 고객의 상담이력 호출
                   getConsultHistoryByCustomerNum();
               } else {
                    alert("에러 발생. 다시 시도해 주세요.");
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {
               alert("error : " + textStatus + "\n" + errorThrown);
           }
        });

        // 화면 닫기
        //window.close();
    }

    /*
    고객정보 검색 윈도우의 출력된 고객 정보를 클릭하면 상담이력을 조회해서 출력하는 함수
     */
    function getConsultHistoryByCustomerNum() {
        const customerNum = window.opener.document.getElementById("customer-num-hidden");
        $.ajax({
           url: "getConsultHistoryByCustomerNum.php",
           type: "POST",
           data: {customerNum : customerNum.value},
           dataType: "json",
            success: function (data) {
               if (data.msg == 'SUCCESS') {
                   $("#noResult", opener.document).remove();
                   $("*", opener.document).remove("#consultHistoryRow");
                   for (let i = 0; i < data.result.length; i++) {
                       let tr = document.createElement("tr");
                       tr.setAttribute("title", "클릭하면 상담 세부 내용을 확인할 수 있습니다.");
                       tr.setAttribute("id", "consultHistoryRow");
                       tr.setAttribute("style", "cursor: pointer");
                       tr.setAttribute("onclick", "getConsultInfo(this)");
                       $.each(data.result[i], function (key, value) {
                           let td = document.createElement("td");
                           if (key == 'consult_num') { // consult_num 보이지 않게 처리
                               let td_hidden = document.createElement("td");
                               td_hidden.setAttribute("style", "display: none");
                               td_hidden.setAttribute("id", key);
                               td_hidden.innerHTML = value;
                               tr.appendChild(td_hidden);
                           }
                           else if (key == 'customer_num') {
                               let td_hidden = document.createElement("td");
                               td_hidden.setAttribute("style", "display: none");
                               td_hidden.setAttribute("id", key);
                               td_hidden.innerHTML = value;
                               tr.appendChild(td_hidden);
                           }
                           else {
                               td.setAttribute("id", key);
                               td.innerHTML = value;
                               tr.appendChild(td);
                           }
                       });
                       window.opener.document.getElementsByClassName("section-four-table")[0].append(tr);
                   }
               }
               else {
                   $("*", opener.document).remove("#consultHistoryRow");
                   window.opener.createNoResultMsg();
               }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error : " + textStatus + "\n" + errorThrown);
            }
        });
    }
</script>
</body>
</html>
