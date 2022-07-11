$("#login-form-submit").click(function () {
    loginProc();
});

// 키보드 엔터 키로 로그인
$("#memberPwd").keypress(function (event) {
    if (event.which == 13) {
        loginProc();
    }
});

function loginProc() {
    let memberId = $("#memberId").val();
    let memberPwd = $("#memberPwd").val();
    $.ajax({
        url: "web/loginChk.php",
        type: "POST",
        data: {memberId : memberId, memberPwd : memberPwd},
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.result == 0) {
                alert(data.msg);
                location.replace('../main.php');
            } else if (data.result == 1) {
                alert(data.msg);
            } else if (data.result == 'LOGIN_ERROR') {
                alert(data.msg);
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}