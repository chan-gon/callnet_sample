$(function() {

    // 아이디 중복체크 실행 여부 확인값 초기화
    idCheckInit();
    function idCheckInit() {
        if (document.getElementById("idIsCheckedOrNot").value == "1") {
            document.getElementById("idIsCheckedOrNot").value = "0";
        }
    }

    $("#submitBtn").click(function() {
        let isSignable;
        const memberId = document.querySelector('#memberId');
        const memberPwd = document.querySelector('#memberPwd');
        const memberName = document.querySelector('#memberName');
        const memberGrade = document.querySelector('#memberGrade');

        if ($("#idIsCheckedOrNot").val() == "0") {
            alert("아이디 중복체크를 반드시 해주세요.");
            isSignable = false;
            return false;
        }

        isSignable = true;

        if (isSignable) {

            const formData = {
                memberId : memberId.value,
                memberPwd : memberPwd.value,
                memberName : memberName.value,
                memberGrade : memberGrade.value
            }

            $.ajax({
                url: "signup.php",
                type: "POST",
                data: formData,
                dataType: "json",
                success: function (data) {
                    if (data.result == 0) {
                        alert("회원가입 완료");
                        location.replace('../../index.php');
                    } else if (data.result == 1) {
                        alert("회원가입 실패. 다시 시도해 주세요.");
                    }
                    if (data.result == 'SIGNUP_ERROR') {
                        alert(data.msg);
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        } else {
            alert("")
        }
    });
});

// 아이디 중복 체크
function idCheck() {
    const memberId = $('#memberId');
    $.ajax({
        url: "idCheck.php",
        type: "POST",
        dataType: "json",
        data: {memberId : memberId.val()},
        success: function (data) {
            if (data.result == 0) {
                alert("사용할 수 없는 아이디.");
                memberId.focus();
                $("#idIsCheckedOrNot").val("0");
            }
            if (data.result == 1) {
                alert("사용 가능한 아이디.");
                $("#idIsCheckedOrNot").val("1");
            }
            if (data.result == 'FORMAT_ERROR') {
                alert(data.msg);
                memberId.focus();
                $("#idIsCheckedOrNot").val("0");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("error : " + textStatus + "\n" + errorThrown);
        }
    });
}