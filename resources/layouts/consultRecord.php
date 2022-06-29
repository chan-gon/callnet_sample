<div style="padding-left:16px">
    <h3 class="section-main-title">&#9654; 상담기록 *  필수입력 사항</h3>
    <input class="section-main-button" type="button" value="상담기록 저장">
    <div>
        <table>
            <tr>
                <td class="input-title">CID</td>
                <td>
                    <input type="text" id="customerCID">
                </td>
                <td class="input-title">상담일자</td>
                <td>
                    <input type="date" id="consultDate">
                </td>
                <td class="input-title">상담원</td>
                <td>
                    <input type="text" id="consultantName">
                </td>
                <td class="input-title">상담경로</td>
                <td>
                    <input type="radio" name="consultRoot">IN
                    <input type="radio" name="consultRoot">OUT
                    <input type="radio" name="consultRoot">홈페이지
                    <input type="radio" name="consultRoot">매장
                    <input type="radio" name="consultRoot">기타
                </td>
            </tr>
            <tr>
                <td class="input-title">* 대분류</td>
                <td>
                    <select id="categoryLarge" onchange="catLarge(this)">
                        <option value="">-- 선택 --</option>
                        <option value="a">배송문의</option>
                        <option value="b">주문/결제</option>
                        <option value="c">반품/교환/환불</option>
                        <option value="d">기타</option>
                    </select>
                </td>
                <td class="input-title">* 중분류</td>
                <td>
                    <select id="categoryMedium" onchange="catMedium(this)" />
                </td>
                <td class="input-title">* 소분류</td>
                <td>
                    <select id="categorySmall" />
                </td>
                <td class="input-title">담당DM</td>
                <td>
                    <select id="">
                        <option value="">-- 선택 --</option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </td>
                <td class="input-title">* 상담결과</td>
                <td>
                    <select id="consultResult">
                        <option value="">-- 선택 --</option>
                        <option>처리중</option>
                        <option>보류</option>
                        <option>완료</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="input-title">* 상담내용</td>
                <td colspan="11">
                    <textarea rows="5" id="consultContent"></textarea>
                </td>
            </tr>
        </table>
    </div>
</div>
