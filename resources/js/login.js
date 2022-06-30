$("#login-form-submit").click(function () {
    checkInput();
});

function checkInput() {
    const memberId = document.querySelector("#id");
    const memberPwd = document.querySelector("#password");

    if (memberId.value == "") {
        alert("아이디 입력하세요.");
        memberId.focus();
        return false;
    } else if (memberPwd.value == "") {
        alert("비밀번호 입력하세요.");
        memberPwd.focus();
        return false;
    } else {
        return loginProc();
    }
}

function loginProc() {
    let id = $("#id").val();
    let password = $("#password").val();
    $.ajax({
        url: "controller/user/login_proc.php",
        type: "post",
        data: {id : id, password : password},
        success: function (data) {
            if (data[0].result) {
                alert(data[0].msg);
                location.replace("/main.php");
            } else {
                alert(data[0].msg);
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}