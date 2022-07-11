$(function () {
    createNoResultMsg();
});

function createNoResultMsg() {
    let searchResult = document.getElementById("search-result-area");
    if (searchResult.children.length == 0) {
        let td = document.createElement("td");
        td.innerHTML = "- NO RESULTS FOUND -";
        td.setAttribute("colspan", "9");
        td.setAttribute("id", "noResult");
        searchResult.appendChild(td);
    }
}

function categorySort(e) {
    const a = ["-- 선택 --", "배송지연", "배송지변경", "배송오류", "기타"];
    const b = ["-- 선택 --", "현금영수증", "세금계산서", "결제수단", "결제오류", "기타"];
    const c = ["-- 선택 --", "반품절차", "교환절차", "환불절차", "반품취소", "교환취소", "환불취소", "기타"];
    const categoryMedium = $("#consult-history-form").find("#categoryMedium")[0];

    let resp = null;
    if (e.value == "a") {
        resp = a;
    } else if (e.value == "b") {
        resp = b;
    } else if (e.value == "c") {
        resp = c;
    } else if (e.value == "d") {
        resp = "";
    }

    categoryMedium.options.length = 0;

    for (i in resp) {
        let opt = document.createElement("option");
        opt.value = resp[i];
        opt.innerHTML = resp[i];
        opt.setAttribute("value", i);
        categoryMedium.appendChild(opt);
    }
}

$("#consultHistorySearchBtn").click(function () {
    const consultDateFrom = $('#consult-history-form').find("#consultDateFrom");
    const consultDateTo = $('#consult-history-form').find("#consultDateTo");
    const customerCID = $('#consult-history-form').find("#customerCID");
    const customerName = $('#consult-history-form').find("#customerName");
    const consultantName = $('#consult-history-form').find("#consultantName");
    const categoryLarge = $('#consult-history-form').find("#categoryLarge option:selected");
    const categoryMedium = $('#consult-history-form').find("#categoryMedium option:selected");
    const consultResult = $('#consult-history-form').find("#consultResult option:selected");

    const formData = {
        consultDateFrom : consultDateFrom.val(),
        consultDateTo : consultDateTo.val(),
        customerCID : customerCID.val(),
        customerName : customerName.val(),
        consultantName : consultantName.val(),
        consultRoot :  $("input:radio[name='consultRoot']:checked").val(),
        categoryLarge : categoryLarge.val(),
        categoryMedium : categoryMedium.val(),
        consultResult : consultResult.val()
    }

    $.ajax({
        url: "web/getConsultHistory.php",
        type: "POST",
        data: formData,
        dataType: "json",
        success: function (data) {
            if (data.msg == 'SUCCESS') {
                $("#noResult").remove();
                $("*").remove("#consultHistoryRow");
                for (let i = 0; i < data.result.length; i++) {
                     let tr = document.createElement("tr");
                     tr.setAttribute("id", "consultHistoryRow");
                     tr.setAttribute("style", "cursor: pointer");
                     tr.setAttribute("onclick", "getConsultInfo(this)");
                    $.each(data.result[i], function (key, value) {
                        let td = document.createElement("td");
                        td.setAttribute("id", key);
                        td.innerHTML = value;
                        tr.appendChild(td);
                    });
                    $(".section-four-table>tbody:last").append(tr);
                }
            } else {
                if ($("#consultHistoryRow").length > 0) {
                    alert("상담이력 정보가 존재하지 않습니다.");
                    $("*").remove("#consultHistoryRow");
                    createNoResultMsg();
                } else {
                    alert("상담이력 정보가 존재하지 않습니다.");
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
});

// 엑셀 변환
function convertExcel() {
    if ($("#consultHistoryRow").length == 0) {
        alert("변환할 데이터가 없습니다.");
        return false;
    } else {
        const currentTime = new Date().toISOString().split('T')[0];
        $(".section-four-table").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: "상담이력_" + currentTime +'.xls', //확장자를 여기서 붙여줘야한다.
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    }
};

// 초기화
$("#consultHistoryReset").click(function () {
    if (confirm("상담이력 검색 입력값을 초기화 하시겠습니까?")) {
        $("#consult-history-form")[0].reset();
    }
});

// 상담이력 호출
function getConsultInfo(e) {
    const customerCID = e.children[2].innerHTML;
    $.ajax({
        url: "web/getConsultHistory.php",
        type: "POST",
        data: {customerCID : customerCID},
        dataType: "json",
        success: function (data) {
            window.open("web/consultInfo.php", "consultInfo", 'width=1550px,height=700px');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
}