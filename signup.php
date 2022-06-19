<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link rel="stylesheet" type="text/css" href="./css/signup.css"/>
</head>
<?php
    include('./config/db.php');
    $id = $_POST['id'];
    $password = $_POST['password'];

    $login_query = "SELECT * FROM member WERE member_id = '$id' AND member_pwd = '$password'";

?>
<body>
<div class="register">
        <h3>회원가입</h3>
        <form action="">
            <div class="flex">
                <ul class="container">
                    <li class="item center">
                        아이디
                    </li>
                    <li class="item">
                        <input type="text" placeholder="아이디를 입력하세요." required>
                    </li>
                    <li class="item">
                        <button class="idcheck">중복확인</button>
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        비밀번호
                    </li>
                    <li class="item">
                        <input type="password" placeholder="비밀번호를 입력하세요." required>
                    </li>
                    <li class="item">
                        
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        비밀번호 확인
                    </li>
                    <li class="item">
                        <input type="password" placeholder="비밀번호를 입력하세요." required>
                    </li>
                    <li class="item">
                        
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        등급
                    </li>
                    <li class="item">
                        <select name="gender" id="">
                            <option value="선택" selected>선택</option>
                            <option value="일반">일반</option>
                            <option value="매니저">매니저</option>
                        </select>
                    </li>
                    <li class="item">
                        
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        
                    </li>
                    <li class="item">
                        <button class="submit">가입하기</button>
                    </li>
                    <li class="item">
                        
                    </li>
                </ul>
            </div>
        </form>
    </div>

    <script>
        var memberId = document.querySelector('#member_id');
        var memberPwd = document.querySelector('#member_pwd');
        var memberId = document.querySelector('#member_id');
        var memberId = document.querySelector('#member_id');
    </script>
</body>
</html>