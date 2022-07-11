function catLarge(e) {
    const a = ["-- 선택 --", "배송지연", "배송지변경", "배송오류", "기타"];
    const b = ["-- 선택 --", "현금영수증", "세금계산서", "결제수단", "결제오류", "기타"];
    const c = ["-- 선택 --", "반품절차", "교환절차", "환불절차", "반품취소", "교환취소", "환불취소", "기타"];
    const categoryMedium = document.getElementById("categoryMedium");

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

/*
function catMedium(e) {
    const a = ["취소처리"];
    const b = [""];
    const c = ["교환", "반품"];
    const categorySmall = document.getElementById("categorySmall");

    let resp = null;
    if (e.value ==  "0") {
        resp = a;
    }

    categorySmall.options.length = 0;
    for (i in resp) {
        let opt = document.createElement("option");
        opt.value = resp[i];
        opt.innerHTML = resp[i];
        opt.setAttribute("value", i);
        categorySmall.appendChild(opt);
    }

}*/

$("#consultRecordSaveBtn").click(function () {

   const customerCID = $("#customerCID");
   const customerNum = $("#customerNum");
   const consultDate = $("#consultDate");
   const consultantName = $("#consultantName");
   const categoryLarge = $("#categoryLarge option:selected");
   const categoryMedium = $("#categoryMedium option:selected");
   const consultResult = $("#consultResult option:selected");
   const consultContent = $("#consultContent");

   const formData = {
       customerCID : customerCID.val(),
       customerNum : customerNum.val(),
       consultDate : consultDate.val(),
       consultantName : consultantName.val(),
       consultRoot : $("input:radio[name='consultRoot']:checked").val(),
       categoryLarge : categoryLarge.text(),
       categoryMedium : categoryMedium.text(),
       consultResult : consultResult.text(),
       consultContent : consultContent.val()
   }

   if (customerNum.val() == "") {
       alert("고객번호를 입력하세요.");
       customerNum.focus();
       return false;
   }
   else {
       if (customerNumChk()) {
           // 고객번호가 존재하면 상담기록 저장
           $.ajax({
               url: "web/addConsultRecord.php",
               type: "POST",
               data: formData,
               dataType: "json",
               success: function (data) {
                   if (data.result == 'SUCCESS') {
                       alert("상담기록 등록 완료");
                       $("#consult-record-form")[0].reset();
                   }
                   else if (data.result == 'FAIL') {
                       alert(data.msg);
                   }
                   else if (data.result == 'DATA-NOTFOUND') {
                       alert(data.msg);
                   }
               },
               error: function (jqXHR, textStatus, errorThrown) {
                   alert("error : " + textStatus + "\n" + errorThrown);
               }
           });
       } else {
           // 고객번호가 존재하지 않음
           alert("존재하지 않는 고객번호 입니다.");
           customerNum.focus();
       }
   }
});

// 고객번호 유무 확인
function customerNumChk() {
    const customerNum = $("#customerNum").val();

    let result;
    $.ajax({
        url: "web/customerNumChk.php",
        type: "POST",
        data: {customerNum : customerNum},
        dataType: "json",
        async: false, // 처리 방식을 동기식으로 처리하도록 설정(return 값을 받아야 하기 때문에)
        success: function (data) {
            if (data.result == 'EXISTED') {
                result = true;
            } else if (data.result == 'NOT_EXISTED') {
                result = false;
            } else if (data.result == 'DATA-NOTFOUND') {
                alert(data.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
    return result;
}