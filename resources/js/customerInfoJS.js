// 공백 및 특수문자 검사용 변수
const only_blank = /^\s+|\s+$/g; // 공백만 입력
const between_blank = /[\s]/g; // 문자열 사이에 공백
const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; // 특수문자

// 고객정보 고객코드 검색
$("#customer-code-search").click(function () {
    const customerCode = $("#customerCode").val();
    if (customerCode.replace(only_blank, '') == "") {
        alert("공백만 입력되었습니다.");
        return false;
    } else if (between_blank.test(customerCode) == true) {
        alert("코드 사이에 공백이 입력되면 안됩니다.");
        return false;
    } else if (special_pattern.test(customerCode) == true) {
        alert("특수문자가 포함될 수 없습니다.");
        return false;
    } else {
        window.open("./c_code_search_window.php", "고객 코드 검색 결과", 'width=700px,height=500px');
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
$("#customerEmail").change(function () {
    $("#customerEmail option:selected").each(function () {
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
    const customerCode = $("#customerCode").val();
    const customerId = $("#customerId").val();
    const customerName = $("#customerName").val();
    const customerGrade = $("#customerGrade option:selected").text();
    const customerGradeSetDate = $("#customerGradeSetDate").val();
    const customerTel = $("#customerTel").val();
    const customerPhone = $("#customerPhone").val();
    const customerEmail = $("#email-input-one").val() + "@" + $("#email-input-two").val();
    const customerAddr = $("#zonecode").val() + " " + $("#roadAddress").val() + " " + $("#jibunAddress").val();

    const formData = {
        customerCode : customerCode,
        customerId :customerId,
        customerName : customerName,
        customerGrade : customerGrade,
        customerGradeSetDate : customerGradeSetDate,
        customerTel : customerTel,
        customerPhone : customerPhone,
        customerEmail : customerEmail,
        customerAddr : customerAddr
    }

    $.ajax({
        url:  "../../controller/customer/customer_save_proc.php",
        type: "post",
        data: formData,
        success: function (data) {
            if (data == 1) {
                alert("고객 등록 완료");
                location.reload();
            } else {
                alert("다시 시도해 주세요.");
            }
        },
        error: function (err) {
            alert(err);
        }
    });
});