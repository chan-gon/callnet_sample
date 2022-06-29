function catLarge(e) {
    const a = ["배송지연", "배송지변경", "배송오류", "기타"];
    const b = ["현금영수증", "세금계산서", "결제수단", "결제오류", "기타"];
    const c = ["반품절차", "교환절차", "환불절차", "반품취소", "교환취소", "환불취소", "기타"];
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

}