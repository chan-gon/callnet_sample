// 상담이력 대분류-중분류
function categorySort(e) {
    const a = ["-- 선택 --", "배송지연", "배송지변경", "배송오류", "기타"];
    const b = ["-- 선택 --", "현금영수증", "세금계산서", "결제수단", "결제오류", "기타"];
    const c = ["-- 선택 --", "반품절차", "교환절차", "환불절차", "반품취소", "교환취소", "환불취소", "기타"];
    const categoryMedium = $("#consult-history-form").find("#categoryMedium")[0];

    let resp = null;
    if (e.value === "a") {
        resp = a;
    } else if (e.value === "b") {
        resp = b;
    } else if (e.value === "c") {
        resp = c;
    } else if (e.value === "d") {
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

// 상담이력 조회
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
                $("#sql-hidden").val(data.sql);
                getPagination("web/getPagination.php");

                // $("#noResult").remove();
                // $("*").remove("#consultHistoryRow");

                // for (let i = 0; i < data.result.length; i++) {
                //      let tr = document.createElement("tr");
                //      tr.setAttribute("title", "클릭하면 상담 세부 내용을 확인할 수 있습니다.");
                //      tr.setAttribute("id", "consultHistoryRow");
                //      tr.setAttribute("style", "cursor: pointer");
                //      tr.setAttribute("onclick", "getConsultInfo(this)");
                //     $.each(data.result[i], function (key, value) {
                //         let td = document.createElement("td");
                //         if (key === 'consult_num') { // consult_num 보이지 않게 처리
                //             let td_hidden = document.createElement("td");
                //             td_hidden.setAttribute("style", "display: none");
                //             td_hidden.setAttribute("id", key);
                //             td_hidden.innerHTML = value;
                //             tr.appendChild(td_hidden);
                //         }
                //         else if (key === 'customer_num') {
                //             let td_hidden = document.createElement("td");
                //             td_hidden.setAttribute("style", "display: none");
                //             td_hidden.setAttribute("id", key);
                //             td_hidden.innerHTML = value;
                //             tr.appendChild(td_hidden);
                //         }
                //         else {
                //             td.setAttribute("id", key);
                //             td.setAttribute("name", key);
                //             td.innerHTML = value;
                //             tr.appendChild(td);
                //         }
                //     });
                //     $(".section-four-table>tbody:last").append(tr);
                //     getPagination("web/getPagination.php");
                // }

            } else {
                if ($("#consultHistoryRow").length > 0) {
                    alert("상담이력 정보가 존재하지 않습니다.");
                    $("*").remove("#consultHistoryRow");
                    $("#pagination-list").remove();
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
    const trNums = $("#pagination-result > table > tbody > tr").length;
    const query = $("#sql-hidden").val();
    if (trNums === 0) {
        alert("변환할 데이터가 없습니다.");
        return false;
    } else {
        // $.ajax({
        //    url: "web/getExcel.php",
        //    type: "POST",
        //    data: {'sql-hidden' : query},
        //     dataType: "html",
        //     success: function (data) {
        //        console.log(data);
        //
        //     },
        //     error: function (err) {
        //
        //     }
        // });

        // document.getElementById("form-excel").submit();

        window.open('web/getExcel.php');
    }
};

// 상담이력 초기화
$("#consultHistoryReset").click(function () {
    if (confirm("상담이력 검색 입력값을 초기화 하시겠습니까?")) {
        // 상담이력 입력 폼 초기화
        $("#consult-history-form")[0].reset();
        // 출력 테이블 및 페이징 리스트 삭제
        $("*").remove("#consultHistoryRow");
        $("#pagination-table").remove();
        $("#pagination-list").remove();
    }
});

/*
    상담이력 개별 호출
    출력된 전체 상담 이력 중 하나를 클릭-호출하는 것
 */
function getConsultInfo(e) {
    const consultNum = e.children[10].innerHTML;
    const customerNum = e.children[11].innerHTML;
    window.open("web/consultHistoryInfoPage.php", "consultInfo", 'width=1550px,height=700px');
    $.ajax({
        url: "web/getSingleConsultHistory.php",
        type: "POST",
        data: {customerNum : customerNum, consultNum : consultNum},
        dataType: "json",
        success: function (data) {
            if (data.msg === 'SUCCESS') {
                // 데이터를 단 건 조회하기 위해 기존 호출 데이터 tr은 제거
                $("#row").remove();
                for (let i = 0; i < data.result.length; i++) {
                    let tr = document.createElement("tr");
                    tr.setAttribute("id", "row");
                    $.each(data.result[i], function (key, value) {
                        let td = document.createElement("td");
                        td.setAttribute("id", key);
                        td.innerHTML = value;
                        tr.appendChild(td);
                    });
                    $("#temp-invisible-table").append(tr);
                }
            } else if (data.msg === 'DATA-NOTFOUND') {
                alert("조회된 데이터가 없습니다. 다시 시도해 주세요.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
}

// 페이징(Pagination)
function getPagination(url) {
    const executedQuery = document.getElementById("sql-hidden").value;
    $.ajax({
        url: url,
        type: "GET",
        data: {rowCount : $("#rowcount").val(), executedQuery : executedQuery},
        success: function (data) {
            $("#pagination-result").html(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
}