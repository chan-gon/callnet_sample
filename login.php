<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
    <link rel="stylesheet" type="text/css" href="./css/login.css"/>
</head>
<body>
    <main id="main-holder">
        <h1 id="login-header">로그인</h1>
        <form id="login-form">
            <input type="text" name="id" id="id" class="login-form-field" placeholder="아이디">
            <input type="password" name="password" id="password" class="login-form-field" placeholder="비밀번호">
            <input type="submit" value="로그인" id="login-form-submit">
            <input type="button" value="회원가입" id="signup" onclick="location.href='signup.php'">
        </form>
    </main>
</body>
</html>