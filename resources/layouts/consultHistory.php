<div style="padding-left:16px">
    <h3 class="section-main-title">&#9654; 상담이력</h3>
    <input class="section-main-button" type="button" value="조회">
    <input class="section-main-button" type="button" value="엑셀변환">
    <div>
        <form>
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
                    <td class="input-title">대분류</td>
                    <td>
                        <select>
                            <option value="">-- 선택 --</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </td>
                    <td class="input-title">중분류</td>
                    <td>
                        <select>
                            <option value="">-- 선택 --</option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </td>
                    <td class="input-title">소분류</td>
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
                            <option>처리중</option>
                            <option>보류</option>
                            <option>완료</option>
                        </select>
                    </td>
                </tr>
            </table>
        </form>

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
                <td colspan="13" id="search-result-area"></td>
            </tr>
        </table>
    </div>
</div>