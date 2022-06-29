<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>
    <link rel="stylesheet" type="text/css" href="resources/css/signup.css"/>
</head>
<body>
<div class="register">
        <h3>회원가입</h3>
        <form>
            <div class="flex">
                <ul class="container">
                    <li class="item center">
                        아이디
                    </li>
                    <li class="item">
                        <input type="text" id="memberId" name="memberId" placeholder="아이디" required>
                    </li>
                    <li class="item">
                        <button class="idcheck" id="idcheck" name="idcheck">중복확인</button>
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        비밀번호
                    </li>
                    <li class="item">
                        <input type="password" id="memberPwd" name="memberPwd" placeholder="비밀번호" required>
                    </li>
                    <li class="item">
                        
                    </li>
                </ul>
                <ul class="container">
                    <li class="item center">
                        이름
                    </li>
                    <li class="item">
                        <input type="text" id="memberName" name="memberName" placeholder="이름" required>
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
    <script>

        $(function() {
            $("#submitBtn").click(function() {
                var isSignable = true;

                const memberId = document.querySelector('#memberId');
                const memberPwd = document.querySelector('#memberPwd');
                const memberName = document.querySelector('#memberName');
                
                const elementArr = [
                    memberId, memberPwd, memberName
                ];

                // 아이디, 비밀번호, 이름 빈칸 체크
                elementArr.forEach(function(inputTag) {
                    if (inputTag.value == null || inputTag.value == "") {
                        alert(inputTag.placeholder + " 입력하세요.");
                        isSignable = false;
                        return false;
                    }
                });
                // 등급 미선택 체크
                const memberGradeVal = $("#memberGrade option:selected").text();
                if (memberGradeVal == "선택") {
                    alert("등급을 선택하세요.");
                    isSignable = false;
                    return false;
                }

                isSignable = true;

                if (isSignable == true) {

                    const formData = {
                        memberId : memberId.value,
                        memberPwd : memberPwd.value,
                        memberName : memberName.value,
                        memberGrade : memberGradeVal
                    }

                    $.ajax({
                        url: "/controller/user/signup_proc.php",
                        type: "post",
                        data: formData,
                        dataType: "text",
                        success: function (data) {
                            if (data == 1) {
                                alert("회원 가입 완료");
                                location.replace("../index.php");
                            } else {
                                alert("회원 가입 실패");
                                location.replace("../signup.php");
                            }
                        },
                        error: function (err) {
                            alert(err);
                        }
                    });
                }
            });
        });

        // 아이디 중복 체크
        $('#idcheck').on('click', function() {
            const memberId = $('#memberId').val();
            if (memberId == null || memberId == "") {
                alert("아이디를 입력하세요.");
                return;
            }
            $.ajax({
                url: "/controller/user/id_check.php?memberId="+memberId,
                type: "get",
                dataType: "text",
                success: function (data) {
                    alert(data);
                },
                error: function (err) {
                    alert(err);
                }
            });
        });

    </script>
</body>
</html>