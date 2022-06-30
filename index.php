<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
    <link rel="stylesheet" type="text/css" href="resources/css/index.css"/>
</head>
<body>
    <main id="main-holder">
        <h1 id="login-header">로그인</h1>
        <form role="form" id="login-form" name="login-form" onsubmit="return checkInput()">
            <input type="text" name="memberId" id="memberId" class="login-form-field" placeholder="아이디" autofocus>
            <input type="password" name="memberPwd" id="memberPwd" class="login-form-field" placeholder="비밀번호">
            <input type="button" value="로그인" id="login-form-submit">
            <input type="button" value="회원가입" id="signup" onclick="location.href='web/signupForm.php'">
        </form>
    </main>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="resources/js/login.js"></script>
</body>
</html>