// 공백 및 특수문자 검사용 변수
const only_blank = /^\s+|\s+$/g; // 공백만 입력
const between_blank = /[\s]/g; // 문자열 사이에 공백
const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; // 특수문자
const only_number = /[^0-9]/g; // 숫자만 입력

const customerNum = $("#customer-num");
const customerId = $("#customer-id");
const customerName = $("#customer-name");
const customerGrade = $("#customer-grade option:selected");
const customerTel = $("#customer-tel");
const customerPhone = $("#customer-phone");
const customerEmailAddr = $("#email-input-one");
const customerEmailDomain = $("#email-input-two");
const zonecode = $("#zonecode").val();
const roadAddr = $("#roadAddress").val();
const jibunAddr = $("#jibunAddress").val();
const specificAddr = $("#specificAddress").val();

// 고객정보 고객코드 검색
$("#customer-num-search").click(function () {
    const customerNum = $("#customer-num").val();
    if (customerNum.replace(only_blank, '') == "") {
        alert("공백만 입력되었습니다.");
        return false;
    } else if (between_blank.test(customerNum) == true) {
        alert("코드 사이에 공백이 입력되면 안됩니다.");
        return false;
    } else if (special_pattern.test(customerNum) == true) {
        alert("특수문자가 포함될 수 없습니다.");
        return false;
    } else if (only_number.test(customerNum) == true) {
        alert("숫자만 입력 가능합니다.");
        return false;
    } else {
        window.open("../../web/customerNumSearchForm.php", "customerInfo", 'width=1550px,height=300px');
    }

});

// 고객정보 주소 검색
$("#customer-address").click(function () {
    new daum.Postcode({
        oncomplete: function(data) {
            $("#zonecode").val(data.zonecode);
            $("#roadAddress").val(data.roadAddress);
            $("#jibunAddress").val(data.jibunAddress);
        }
    }).open();
});

// 고객정보 이메일 입력
$("#customer-email").change(function () {
    $("#customer-email option:selected").each(function () {
        if ($(this).val() == '0') {
            $("#email-input-two").val('');
            $("#email-input-two").attr("disabled", true);
        } else if ($(this).val() == '1') {
            $("#email-input-two").val('');
            $("#email-input-two").attr("disabled", false);
        } else {
            $("#email-input-two").val($(this).text());
            $("#email-input-two").attr("readonly", true);
        }
    });
});

// 고객정보 저장
$("#customerInfoSaveBtn").click(function () {
    if (customerNum.val() == '') {
        alert("고객코드를 입력하세요.");
        customerNum.focus();
        return false;
    }
    if (customerName.val() == '') {
        alert("고객명을 입력하세요.");
        customerName.focus();
        return false;
    }
    if (customerId.val() == '') {
        alert("고객 ID를 입력하세요.");
        customerId.focus();
        return false;
    }
    if (customerGrade.text() == '-- 선택 --') {
        alert("회원등급을 선택하세요.");
        customerGrade.focus();
        return false;
    }
    if (only_number.test(customerTel.val())) {
        alert("전화번호는 숫자만 입력할 수 있습니다.");
        customerTel.focus();
        return false;
    }
    if (customerPhone.val() == '') {
        alert("핸드폰 번호를 입력하세요.");
        customerPhone.focus();
        return false;
    } else if (only_number.test(customerPhone.val())) {
        alert("핸드폰 번호는 숫자만 입력할 수 있습니다.");
        customerPhone.focus();
        return false;
    }
    if (customerEmailAddr.val() == '') {
        alert("이메일 주소를 입력하세요");
        customerEmailAddr.focus();
        return false;
    } else if (special_pattern.test(customerEmailAddr.val())) {
        alert("잘못된 이메일 주소 입력.");
        customerEmailAddr.focus();
        return false;
    }

    if (customerEmailDomain.val() == '') {
        alert("이메일 계정을 선택하세요.");
        customerEmailDomain.focus();
        return false;
    }

    const formData = {
        customerNum : customerNum.val(),
        customerId :customerId.val(),
        customerName : customerName.val(),
        customerGrade : customerGrade.text(),
        customerTel : customerTel.val(),
        customerPhone : customerPhone.val(),
        customerEmailAddr : customerEmailAddr.val() + "@" + customerEmailDomain.val(),
        zonecode : zonecode,
        roadAddr : roadAddr,
        jibunAddr : jibunAddr,
        specificAddr : specificAddr
    }

    if (isCustomerNumExisted()) {
        // 고객 정보 등록
        $.ajax({
            url:  "web/addCustomerInfo.php",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (data) {
                if (data.result == 'SUCCESS') {
                    alert("고객정보 등록 완료");
                    $("#customer-info-form")[0].reset();
                } else if (data.result == 'DATA-NOTFOUND') {
                    alert("데이터가 제대로 전송되지 않았습니다.");
                } else {
                    alert("고객정보 등록 실패. 다시 시도해 주세요.");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error : " + textStatus + "\n" + errorThrown);
            }
        });
    } else {
        alert("이미 존재하는 고객번호");
        customerNum.focus();
    }

});

function isCustomerNumExisted() {
    const customerNum = $("#customer-num").val();
    let result;
    $.ajax({
        url: "web/customerNumChk.php",
        type: "POST",
        data: {customerNum : customerNum},
        dataType: "json",
        async: false, // 처리 방식을 동기식으로 처리하도록 설정(return 값을 받아야 하기 때문에)
        success: function (data) {
            if (data.result == 'EXISTED') {
                result = false;
            } else if (data.result == 'NOT_EXISTED') {
                result = true;
            } else {
                alert("데이터가 제대로 전송되지 않았습니다.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
    return result;
}

function updateUserInfo() {
    if (confirm("고객정보를 수정하시겠습니까?")) {
        const formData = {
            customerNum : customerNum.val(),
            customerId :customerId.val(),
            customerName : customerName.val(),
            customerGrade : customerGrade.text(),
            customerTel : customerTel.val(),
            customerPhone : customerPhone.val(),
            customerEmailAddr : customerEmailAddr.val() + "@" + customerEmailDomain.val(),
            zonecode : zonecode,
            roadAddr : roadAddr,
            jibunAddr : jibunAddr,
            specificAddr : specificAddr
        }

        $.ajax({
           url: "web/updateCustomerInfo.php",
           type: "POST",
           data: formData,
           dataType: "json",
           success: function (data) {

           },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error : " + textStatus + "\n" + errorThrown);
            }
        });
    } else {
        return false;
    }
}

