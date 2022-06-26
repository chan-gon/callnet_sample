<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>상담사 페이지 메인</title>
    <link rel="stylesheet" type="text/css" href="./css/main.css"/>
</head>
<body>
    <div class="topnav">
        <div class="topnav-centered">
            <a href="#home" class="active">Home</a>
        </div>
        <div class="topnav-right">
            <a href="#search">홈페이지</a>
            <a href="#about">상담접수</a>
            <a href="#about">녹취조회</a>
            <a href="#about">상담원 관리</a>
            <a href="#about">코드 관리</a>
            <a href="#about">매장 관리</a>
            <a href="#about">블랙리스트 관리</a>
            <a href="#about">통계</a>
            <a href="#about">강제 로그아웃</a>
        </div>
    </div>

    <div class="main-container">
        <div style="padding-left:16px">
                <h3 class="section-main-title">&#9654; 고객정보 *  필수입력 사항</h3>
                <input class="section-main-button" type="button" value="고객정보저장">
            <div>
                <table>
                    <tr>
                        <td>고객코드</td>
                        <td style="display: flex">
                            <input type="text">
                            <input type="button" value="검색">
                        </td>
                        <td>고객명</td>
                        <td><input type="text"></td>
                        <td>ID</td>
                        <td><input type="text"></td>
                        <td>회원등급</td>
                        <td><input type="text"></td>
                        <td>등급 진입일</td>
                        <td><input type="text"></td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td style="display: flex">
                            <input type="text">
                            <input type="button" value="&#9743;">
                        </td>
                        <td>* 핸드폰</td>
                        <td style="display: flex">
                            <input type="text" placeholder="필수 입력 사항">
                            <input type="button" value="&#9743;">
                            <input type="button" value="SMS">
                        </td>
                        <td>e메일</td>
                        <td><input type="text"></td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td style="display: flex">
                            <input type="button" value="검색">
                            <input type="text">
                        </td>
                        <td colspan="2">
                            <input type="text">
                        </td>
                        <td colspan="2">
                            <input type="text">
                        </td>
                        <td colspan="4">
                            <input type="text">
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
                        <td>CID</td>
                        <td>
                            <input type="text">
                        </td>
                        <td>상담일자</td>
                        <td>
                            <input type="date">
                        </td>
                        <td>상담원</td>
                        <td>
                            <input type="text">
                        </td>
                        <td>상담경로</td>
                        <td>
                            <input type="radio" value="">IN
                            <input type="radio" value="">OUT
                            <input type="radio" value="">홈페이지
                            <input type="radio" value="">매장
                            <input type="radio" value="">기타
                        </td>
                    </tr>
                    <tr>
                        <td>* 대분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>* 중분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>* 소분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>매장명</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>담당DM</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>* 상담결과</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>* 상담내용</td>
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
                        <td>상담일자</td>
                        <td style="display: flex">
                            <input type="date"> - <input type="date">
                        </td>
                        <td>고객CID</td>
                        <td><input type="text"></td>
                        <td>고객명</td>
                        <td><input type="text"></td>
                        <td>상담원</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>상담경로</td>
                        <td>
                            <input type="radio" value="">IN
                            <input type="radio" value="">OUT
                            <input type="radio" value="">홈페이지
                            <input type="radio" value="">매장
                            <input type="radio" value="">기타
                        </td>
                    </tr>
                    <tr>
                        <td>* 대분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>* 중분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>* 소분류</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>매장명</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>담당DM</td>
                        <td>
                            <select>
                                <option value="">-- 선택 --</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </td>
                        <td>상담결과</td>
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

</body>
</html>