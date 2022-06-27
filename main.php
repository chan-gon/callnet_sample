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
                            <input type="text">
                            <input type="button" value="검색">
                        </td>
                        <td class="input-title">고객명</td>
                        <td><input type="text"></td>
                        <td class="input-title">ID</td>
                        <td><input type="text"></td>
                        <td class="input-title">회원등급</td>
                        <td><input type="text"></td>
                        <td class="input-title">등급 진입일</td>
                        <td><input type="text"></td>
                    </tr>
                    <tr>
                        <td class="input-title">전화번호</td>
                        <td style="display: flex">
                            <input type="text">
                            <input type="button" value="&#9743;">
                        </td>
                        <td class="input-title">* 핸드폰</td>
                        <td style="display: flex">
                            <input type="text" placeholder="필수 입력 사항">
                            <input type="button" value="&#9743;">
                            <input type="button" value="SMS">
                        </td>
                        <td class="input-title">e메일</td>
                        <td><input type="text"></td>
                    </tr>
                    <tr>
                        <td class="input-title">주소</td>
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

</body>
</html>