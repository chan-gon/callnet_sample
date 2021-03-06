<div>
    <h3 class="section-main-title" id="section-main-title">&#9654; 고객정보 *  필수입력 사항</h3>
    <input class="section-main-button" type="button" value="초기화" id="customerInfoReset">
    <input class="section-main-button" type="button" value="검색" id="customer-num-search">
    <input class="section-main-button" id="customerInfoSaveBtn" type="button" value="고객정보저장" onclick="saveUserInfo()">
    <div>
        <form id="customer-info-form">
            <!-- 고객정보 검색 시 고객번호 저장용으로 사용됨. 고객정보 수정 시 필요 -->
            <input id="customer-num-hidden" type="hidden">
            <table>
                <tr>
                    <td class="input-title">* 고객명</td>
                    <td>
                        <input type="text" id="customer-name">
                    </td>
                    <td class="input-title">* 전화번호</td>
                    <td style="display: flex">
                        <input type="text" id="customer-phone" placeholder="전화번호">
                        <input type="button" value="&#9743;">
                        <input type="button" value="SMS">
                    </td>
                    <td class="input-title">* e메일</td>
                    <td style="display: flex; padding: 5px;">
                        <input type="text" id="email-input-one">
                        &nbsp;@&nbsp;
                        <input type="text" id="email-input-two" disabled>
                        &nbsp;
                        <select id="customer-email">
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
                    <td colspan="2">
                        <input type="text" placeholder="상세주소" id="specificAddress">
                    </td>
                </tr>
            </table>
        </form>

    </div>
</div>