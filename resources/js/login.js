$("#login-form-submit").click(function () {
    checkInput();
});

function checkInput() {
    const memberId = document.querySelector("#memberId");
    const memberPwd = document.querySelector("#memberPwd");

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
                alert("로그인 성공");
                location.replace('../main.php');
            } else if (data.result == 2) {
                alert("입력된 값이 없습니다.");
            } else {
                alert("로그인 실패. 다시 시도해 주세요.");
            }
        },
        error: function (err) {
            alert(err);
        }
    });
}

// 키보드 엔터 키로 로그인
$("#memberPwd").keypress(function (event) {
   if (event.which == 13) {
       loginProc();
   }
});