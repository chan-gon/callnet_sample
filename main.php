    <?php require_once './layouts/navbar.php'; ?>

    <div class="main-container">
        <div style="padding-left:16px">
                <h3 class="section-main-title">&#9654; 고객정보 *  필수입력 사항</h3>
                <input class="section-main-button" type="button" value="고객정보저장">
            <div>
                <table>
                    <tr>
                        <td class="input-title">고객코드</td>
                        <td style="display: flex">
                            <input type="text" id="customerCode">
                            <input type="button" value="검색" id="customer-code-search">
                        </td>
                        <td class="input-title">고객명</td>
                        <td>
                            <input type="text" id="customerName">
                        </td>
                        <td class="input-title">ID</td>
                        <td>
                            <input type="text" id="customerId">
                        </td>
                        <td class="input-title">회원등급</td>
                        <td>
                            <select id="customerGrade">
                                <option value="">-- 선택 --</option>
                                <option value="">일반</option>
                                <option value="">우수</option>
                                <option value="">VIP</option>
                            </select>
                        </td>
                        <td class="input-title">등급 진입일</td>
                        <td>
                            <input type="date" id="customerGradeSetDate">
                        </td>
                    </tr>
                    <tr>
                        <td class="input-title">전화번호</td>
                        <td style="display: flex">
                            <input type="text" id="customerTel">
                            <input type="button" value="&#9743;">
                        </td>
                        <td class="input-title">* 핸드폰</td>
                        <td style="display: flex">
                            <input type="text" id="customerPhone" placeholder="필수 입력 사항">
                            <input type="button" value="&#9743;">
                            <input type="button" value="SMS">
                        </td>
                        <td class="input-title">e메일</td>
                        <td style="display: flex; padding: 5px;">
                            <input type="text" id="email-input-one">
                            &nbsp;@&nbsp;
                            <input type="text" id="email-input-two" disabled>
                            &nbsp;
                            <select id="customerEmail">
                                <option value="0">-- 선택 --</option>
                                <option value="naver.com">naver.com</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="1">직접입력</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="input-title">주소</td>
                        <td style="display: flex">
                            <input type="button" id="customer-address" value="검색">
                            <input type="text" placeholder="우편번호" id="zonecode">
                        </td>
                        <td colspan="2">
                            <input type="text" placeholder="도로명주소" id="roadAddress">
                        </td>
                        <td colspan="2">
                            <input type="text" placeholder="지번주소" id="jibunAddress">
                        </td>
                        <td colspan="4">
                            <input type="text" placeholder="상세주소">
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="padding-left:16px">
            <h3 class="section-main-title">&#9654; 상담기록 *  필수입력 사항</h3>
            <input class="section-main-button" type="button" value="상담기록 저장">
            <div>
                <table>
                    <tr>
                        <td class="input-title">CID</td>
                        <td>
                            <input type="text">
                        </td>
                        <td class="input-title">상담일자</td>
                        <td>
                            <input type="date">
                        </td>
                        <td class="input-title">상담원</td>
                        <td>
                            <input type="text">
                        </td>
                        <td class="input-title">상담경로</td>
                        <td>
                            <input type="radio" value="">IN
                            <input type="radio" value="">OUT
                            <input type="radio" value="">홈페이지
                            <input type="radio" value="">매장
                            <input type="radio" value="">기타
                        </td>
                    </tr>
                    <tr>
                        <td class="input-title">* 대분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">* 중분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">* 소분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">매장명</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">담당DM</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">* 상담결과</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="input-title">* 상담내용</td>
                        <td colspan="11">
                            <textarea rows="5"></textarea>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="padding-left:16px">
            <h3 class="section-main-title">&#9654; 상담이력</h3>
            <input class="section-main-button" type="button" value="조회">
            <input class="section-main-button" type="button" value="엑셀변환">
            <div>
                <table>
                    <tr>
                        <td class="input-title">상담일자</td>
                        <td style="display: flex">
                            <input type="date"> - <input type="date">
                        </td>
                        <td class="input-title">고객CID</td>
                        <td><input type="text"></td>
                        <td class="input-title">고객명</td>
                        <td><input type="text"></td>
                        <td class="input-title">상담원</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">상담경로</td>
                        <td>
                            <input type="radio" value="">IN
                            <input type="radio" value="">OUT
                            <input type="radio" value="">홈페이지
                            <input type="radio" value="">매장
                            <input type="radio" value="">기타
                        </td>
                    </tr>
                    <tr>
                        <td class="input-title">* 대분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">* 중분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">* 소분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">매장명</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">담당DM</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td class="input-title">상담결과</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                    </tr>
                </table>
                <table class="section-four-table">
                    <tr>
                        <td>NO</td>
                        <td>상담경로</td>
                        <td>고객명</td>
                        <td>고객CID</td>
                        <td>고객HP</td>
                        <td>상담일자</td>
                        <td>대분류</td>
                        <td>중분류</td>
                        <td>소분류</td>
                        <td>매장명</td>
                        <td>DM</td>
                        <td>상담결과</td>
                        <td>상담원</td>
                    </tr>
                    <tr>
                        <td colspan="13"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script>

        // 공백 및 특수문자 검사용 변수
        const only_blank = /^\s+|\s+$/g; // 공백만 입력
        const between_blank = /[\s]/g; // 문자열 사이에 공백
        const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; // 특수문자

        // 고객정보 고객코드 검색
        $("#customer-code-search").click(function () {
            const customerCode = $("#customerCode").val();
           if (customerCode.replace(only_blank, '') == "") {
               alert("공백만 입력되었습니다.");
               return false;
           } else if (between_blank.test(customerCode) == true) {
               alert("코드 사이에 공백이 입력되면 안됩니다.");
               return false;
           } else if (special_pattern.test(customerCode) == true) {
               alert("특수문자가 포함될 수 없습니다.");
               return false;
           } else {
               window.open("./c_code_search_window.php", "고객 코드 검색 결과", 'width=700px,height=500px');
           }
        });

        // 고객정보 주소 검색
        $("#customer-address").click(function () {
            new daum.Postcode({
                oncomplete: function(data) {
                    $("#zonecode").val(data.zonecode);
                    $("#roadAddress").val(data.roadAddress);
                    $("#jibunAddress").val(data.jibunAddress);
                }
            }).open();
        });

        // 고객정보 이메일 입력
        $("#customerEmail").change(function () {
           $("#customerEmail option:selected").each(function () {
               if ($(this).val() == '0') {
                   $("#email-input-two").val('');
                   $("#email-input-two").attr("disabled", true);
               } else if ($(this).val() == '1') {
                  $("#email-input-two").val('');
                  $("#email-input-two").attr("disabled", false);
              } else {
                  $("#email-input-two").val($(this).text());
                  $("#email-input-two").attr("disabled", true);
              }
           });
        });

        // 고객정보 저장
        $(".section-main-button").click(function () {
            const customerCode = $("#customerCode").val();
            const customerId = $("#customerId").val();
            const customerName = $("#customerName").val();
            const customerGrade = $("#customerGrade option:selected").text();
            const customerGradeSetDate = $("#customerGradeSetDate").val();
            const customerTel = $("#customerTel").val();
            const customerPhone = $("#customerPhone").val();
            const customerEmail = $("#email-input-one").val() + "@" + $("#email-input-two").val();
            const customerAddr = $("#zonecode").val() + " " + $("#roadAddress").val() + " " + $("#jibunAddress").val();

            const formData = {
                customerCode : customerCode,
                customerId :customerId,
                customerName : customerName,
                customerGrade : customerGrade,
                customerGradeSetDate : customerGradeSetDate,
                customerTel : customerTel,
                customerPhone : customerPhone,
                customerEmail : customerEmail,
                customerAddr : customerAddr
            }

           $.ajax({
               url: "./customer/customer_save_proc.php",
               type: "post",
               data: formData,
               success: function (data) {
                   if (data == 1) {
                       alert("고객 등록 완료");
                       location.reload();
                   } else {
                       alert("다시 시도해 주세요.");
                   }
               },
               error: function (err) {
                   alert(err);
               }
           });
        });
    </script>

</body>
</html>