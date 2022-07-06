// 공백 및 특수문자 검사용 변수
const only_blank = /^\s+|\s+$/g; // 공백만 입력
const between_blank = /[\s]/g; // 문자열 사이에 공백
const special_pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자
const only_number = /[^0-9]/g; // 숫자만 입력
const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;

// 고객정보 저장
function saveUserInfo() {
    const customerId = $("#customer-id");
    const customerName = $("#customer-name");
    const customerGrade = $("#customer-grade option:selected");
    const customerTel = $("#customer-tel");
    const customerPhone = $("#customer-phone");
    const customerEmailAddr = $("#email-input-one");
    const customerEmailDomain = $("#email-input-two");
    const zonecode = $("#zonecode");
    const roadAddr = $("#roadAddress");
    const jibunAddr = $("#jibunAddress");
    const specificAddr = $("#specificAddress");

    // 이름 체크
    if (customerName.val() == '') {
        alert("고객명을 입력하세요.");
        customerName.focus();
        return false;
    }
    if (special_pattern.test(customerName.val())) {
        alert("특수문자가 포홤될 수 없습니다.");
        customerName.focus();
        return false;
    }
    if (only_blank.test(customerName.val())) {
        alert("고객명에 공백이 입력될 수 없습니다.");
        customerName.focus();
        return false;
    }
    if (between_blank.test(customerName.val())) {
        alert("고객명에 공백이 입력될 수 없습니다.");
        customerName.focus();
        return false;
    }
    
    // 아이디 체크
    if (customerId.val() == '') {
        alert("고객 ID를 입력하세요.");
        customerId.focus();
        return false;
    }
    if (special_pattern.test(customerId.val())) {
        alert("고객 ID 특수문자가 포함될 수 없습니다.");
        customerId.focus();
        return false;
    }
    if (only_blank.test(customerId.val())) {
        alert("고객 ID 특수문자가 포함될 수 없습니다.");
        customerId.focus();
        return false;
    }
    if (between_blank.test(customerId.val())) {
        alert("고객 ID에 공백이 입력될 수 없습니다.");
        customerId.focus();
        return false;
    }
    if (customerId.val().length > 20) {
        alert("고객 ID에 공백이 입력될 수 없습니다.");
        customerId.focus();
        return false;
    }
    
    // 등급 체크
    if (customerGrade.text() == '-- 선택 --') {
        alert("회원등급을 선택하세요.");
        customerGrade.focus();
        return false;
    }
    
    // 전화 체크
    if (only_number.test(customerTel.val())) {
        alert("전화번호는 숫자만 입력할 수 있습니다.");
        customerTel.focus();
        return false;
    }
    
    // 휴대폰 체크
    if (customerPhone.val() == '') {
        alert("핸드폰 번호를 입력하세요.");
        customerPhone.focus();
        return false;
    } else if (regPhone.test(customerPhone.val()) == false) {
        alert("핸드폰 번호를 잘못 입력했습니다.");
        customerPhone.focus();
        return false;
    }
    
    // 이메일 체크
    if (customerEmailAddr.val() == '') {
        alert("이메일 주소를 입력하세요");
        customerEmailAddr.focus();
        return false;
    } else if (special_pattern.test(customerEmailAddr.val())) {
        alert("잘못된 이메일 주소 입력.");
        customerEmailAddr.focus();
        return false;
    }
    
    // 이메일 도메인 체크
    if (customerEmailDomain.val() == '') {
        alert("이메일 계정을 선택하세요.");
        customerEmailDomain.focus();
        return false;
    }

    const formData = {
        customerNum : generateYearMonth() + customerPhone.val().replace(only_number, "").substring(3),
        customerId :customerId.val(),
        customerName : customerName.val(),
        customerGrade : customerGrade.text(),
        customerTel : customerTel.val(),
        customerPhone : customerPhone.val().replace(only_number, ""),
        customerEmailAddr : customerEmailAddr.val() + "@" + customerEmailDomain.val(),
        zonecode : zonecode.val(),
        roadAddr : roadAddr.val(),
        jibunAddr : jibunAddr.val(),
        specificAddr : specificAddr.val()
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
}

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

function generateYearMonth() {
    const now = new Date();
    const year = now.getFullYear().toString().substring(2);
    const month = now.getMonth();
    return year + "_" +month + "_";
}

function updateUserInfo() {
    if (confirm("고객정보를 수정하시겠습니까?")) {

        const customerNum = $("#customer-num");
        const customerId = $("#customer-id");
        const customerName = $("#customer-name");
        const customerGrade = $("#customer-grade option:selected");
        const customerTel = $("#customer-tel");
        const customerPhone = $("#customer-phone");
        const customerEmailAddr = $("#email-input-one");
        const customerEmailDomain = $("#email-input-two");
        const zonecode = $("#zonecode");
        const roadAddr = $("#roadAddress");
        const jibunAddr = $("#jibunAddress");
        const specificAddr = $("#specificAddress");

        const formData = {
            customerNum : customerNum.val(),
            customerId :customerId.val(),
            customerName : customerName.val(),
            customerGrade : customerGrade.text(),
            customerTel : customerTel.val(),
            customerPhone : customerPhone.val(),
            customerEmailAddr : customerEmailAddr.val() + "@" + customerEmailDomain.val(),
            zonecode : zonecode.val(),
            roadAddr : roadAddr.val(),
            jibunAddr : jibunAddr.val(),
            specificAddr : specificAddr.val()
        }

        $.ajax({
           url: "web/updateCustomerInfo.php",
           type: "POST",
           data: formData,
           dataType: "json",
           success: function (data) {
               if (data.result == 'SUCCESS') {
                   alert("고객정보 수정 완료.");
               } else if (data.result == 'NOTHING_TO_UPDATE') {
                   alert("수정할 데이터가 없습니다.");
               }
           },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error : " + textStatus + "\n" + errorThrown);
            }
        });
    } else {
        return false;
    }
}

// 고객정보 고객코드 검색
$("#customer-num-search").click(function () {
    window.open("../../web/customerSearchForm.php", "customerInfo", 'width=1550px,height=700px');
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