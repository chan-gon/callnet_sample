<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
    <link rel="stylesheet" type="text/css" href="./css/index.css"/>
</head>
<body>
    <main id="main-holder">
        <h1 id="login-header">로그인</h1>
        <form role="form" id="login-form" name="login-form" onsubmit="return checkInput()">
            <input type="text" name="id" id="id" class="login-form-field" placeholder="아이디" autofocus>
            <input type="password" name="password" id="password" class="login-form-field" placeholder="비밀번호">
            <input type="button" value="로그인" id="login-form-submit">
            <input type="button" value="회원가입" id="signup" onclick="location.href='signup.php'">
        </form>
    </main>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript">

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
                url: "./user/login_proc.php",
                type: "post",
                data: {id : id, password : password},
                success: function (data) {
                    if (data[0].result) {
                        alert(data[0].msg);
                    } else {
                        alert(data[0].msg);
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
    </script>
</body>
</html>