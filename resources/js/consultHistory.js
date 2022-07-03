let searchResult = document.getElementById("search-result-area");
if (searchResult.children.length == 0) {
    let td = document.createElement("td");
    td.innerHTML = "- NO RESULTS FOUND -";
    td.setAttribute("colspan", "9");
    td.setAttribute("id", "noResult");
    searchResult.appendChild(td);
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
    const consultRoot = $('#consult-history-form').find("input[type='radio']");
    const categoryLarge = $('#consult-history-form').find("#categoryLarge option:selected");
    const categoryMedium = $('#consult-history-form').find("#categoryMedium option:selected");
    const consultResult = $('#consult-history-form').find("#consultResult option:selected");

    const formData = {
        consultDateFrom : consultDateFrom.val(),
        consultDateTo : consultDateTo.val(),
        customerCID : customerCID.val(),
        customerName : customerName.val(),
        consultantName : consultantName.val(),
        consultRoot : consultRoot.is(":checked"),
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
            if (data.result) {
                $("#noResult").remove();
                console.log(data.result);
                let tr = document.createElement("tr");
                $.each(data.result, function (key, value) {
                    let td = document.createElement("td");
                    td.setAttribute("id", key);
                    td.innerHTML = value;
                    tr.appendChild(td);
                });
                $(".section-four-table>tbody:last").append(tr);
            } else if (data.result == 'DATA-NOTFOUND') {
                alert("해당 조건에 만족하는 상담이력이 없습니다.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
});