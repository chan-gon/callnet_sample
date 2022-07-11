// 공백 및 특수문자 검사용 변수
const only_number = /[^0-9]/g; // 숫자만 입력

// 고객정보 저장
function saveUserInfo() {
    const customerId = $("#customer-id");
    const customerName = $("#customer-name");
    const customerGrade = $("#customer-grade option:selected");
    const customerPhone = $("#customer-phone");
    const customerEmailAddr = $("#email-input-one");
    const customerEmailDomain = $("#email-input-two");
    const zonecode = $("#zonecode");
    const roadAddr = $("#roadAddress");
    const jibunAddr = $("#jibunAddress");
    const specificAddr = $("#specificAddress");

    const formData = {
        customerNum : generateYearMonth() + customerPhone.val().replace(only_number, "").substring(3),
        customerId :customerId.val(),
        customerName : customerName.val(),
        customerGrade : customerGrade.text(),
        customerPhone : customerPhone.val().replace(only_number, ""),
        customerEmailAddr : customerEmailAddr.val() + "@" + customerEmailDomain.val(),
        zonecode : zonecode.val(),
        roadAddr : roadAddr.val(),
        jibunAddr : jibunAddr.val(),
        specificAddr : specificAddr.val()
    }

        // 고객 정보 등록
        $.ajax({
            url:  "web/addCustomerInfo.php",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (data) {
                if (data.result == 'SUCCESS') {
                    alert(data.msg);
                    $("#customer-info-form")[0].reset();
                } else if (data.result == 'DATA-NOTFOUND') {
                    alert(data.msg);
                } else if (data.result == 'FAIL') {
                    alert(data.msg);
                }
                else if (data.result == 'CUSTOMER_INFO_ERROR') {
                    alert(data.msg);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("error : " + textStatus + "\n" + errorThrown);
            }
        });
}

function generateYearMonth() {
    const now = new Date();
    const year = now.getFullYear().toString().substring(2);
    const month = now.getMonth()+1;
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
                   alert(data.msg);
               } else if (data.result == 'NOTHING_TO_UPDATE') {
                   alert(data.msg);
               } else if (data.result == 'USER_UPDATE_ERROR') {
                   alert(data.msg);
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