<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link rel="stylesheet" type="text/css" href="../resources/css/signup.css"/>
</head>
<body>
<div class="register">
        <h3>회원가입</h3>
        <form>
            <input type="hidden" id="idIsCheckedOrNot" value="0">
            <div class="flex">
                <ul class="container">
                    <li class="item center">
                        아이디
                    </li>
                    <li class="item">
                        <input type="text" id="memberId" name="memberId" placeholder="아이디">
                    </li>
                    <li class="item">
                        <button class="idcheck" type="button" onclick="idCheck()">중복확인</button>
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        비밀번호
                    </li>
                    <li class="item">
                        <input type="password" id="memberPwd" name="memberPwd" placeholder="비밀번호">
                    </li>
                    <li class="item">

                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        이름
                    </li>
                    <li class="item">
                        <input type="text" id="memberName" name="memberName" placeholder="이름">
                    </li>
                    <li class="item">
                        
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        등급
                    </li>
                    <li class="item">
                        <select id="memberGrade" name="memberGrade">
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
                        <button class="submit" type="button" id="submitBtn">가입하기</button>
                    </li>
                    <li class="item">
                        
                    </li>
                </ul>
            </div>
        </form>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../resources/js/signup.js"></script>
</body>
</html>