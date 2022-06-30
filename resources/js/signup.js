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
                url: "signup.php",
                type: "POST",
                data: formData,
                dataType: "json",
                success: function (data) {
                    if (data.result == 0) {
                        alert("회원가입 완료");
                        location.replace('../../index.php');
                    } else if (data.result == 2) {
                        alert("입력된 값이 없습니다.");
                    } else {
                        alert("회원가입 실패. 다시 시도해 주세요.");
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
        url: "idCheck.php",
        type: "POST",
        dataType: "json",
        data: {memberId : memberId},
        success: function (data) {
            console.log(data);
            if (data.result == 0) {
                alert("사용할 수 없는 아이디.");
            } else if (data.result == 1) {
                alert("사용 가능한 아이디.");
            }
        },
        error: function (err) {
            alert(err);
        }
    });
});