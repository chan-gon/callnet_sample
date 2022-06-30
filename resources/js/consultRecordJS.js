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

   let flag = true;
   const customerNum = $("#customerCode");
   const customerCID = $("#customerCID");
   const consultDate = $("#consultDate");
   const consultantName = $("#consultantName");
   const consultRoot = radioChked();
   const categoryLarge = $("#categoryLarge option:selected").text();
   const categoryMedium = $("#categoryMedium option:selected").text();
   const consultResult = $("#consultantName option:selected").text();
   const consultContent = $("#consultContent");

   const formData = {
       customerNum : customerNum.val(),
       customerCID : customerCID.val(),
       consultDate : consultDate.val(),
       consultantName : consultantName.val(),
       consultRoot : consultRoot,
       categoryLarge : categoryLarge,
       categoryMedium : categoryMedium,
       consultResult : consultResult,
       consultContent : consultContent.val()
   }

   // 빈칸 체크
    if (customerCID.val() == '' || customerNum.val() == '' || consultDate.val() == '' || consultantName.val() == '') {
        alert("빈칸을 입력해주세요.");
        return false;
    } else {
        return true;
    }

    flag = isConsultRootChecked();
    flag = isConsultContentNull();
    flag = isCategoryLargeSelected();
    flag = isCategoryMediumSelected();

   $.ajax({
      url: "../../controller/consult/consult_record_save_proc.php",
       type: "post",
       data: formData,
       success: function (data) {
           alert(data[0].result);
       },
       error: function (err) {
          alert(err);
       }
   });
});


// 상담경로 체크 값
function radioChked() {
    $("input[type='radio']").click(function () {
        const chkedValue = $("input[name='consultRoot']:checked").val();
        return chkedValue;
    });
}
// 상담경로 체크 유무
function isConsultRootChecked() {
    const consultRoot = $("input[type='radio']");
    if (!consultRoot.is(':checked')) {
        alert("상담경로를 체크하세요.");
        return false;
    } else {
        return true;
    }
}
// 상담내용 작성 유무
function isConsultContentNull() {
    const consultContent = $("#consultContent");
    if (consultContent.val().length == 0) {
        alert("상담내용을 입력하세요.");
        return false;
    } else {
        return true;
    }
}
// 대분류 체크
function isCategoryLargeSelected() {
    const categoryLarge = $("#categoryLarge option:selected").val();
    if (categoryLarge == '') {
        alert("대분류를 선택하세요.");
        return false;
    } else {
        return true;
    }
}
// 중분류 체크
function isCategoryMediumSelected() {
    const categoryMedium = $("#categoryMedium option:selected").val();
    if (categoryMedium == '0') {
        alert("중분류를 선택하세요.");
        return false;
    } else {
        return true;
    }
}

