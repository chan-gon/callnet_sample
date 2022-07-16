<div style="padding-left:16px">
    <h3 class="section-main-title">&#9654; 상담이력</h3>
    <input class="section-main-button" id="consultHistoryReset" type="button" value="초기화">
    <input class="section-main-button" id="consultHistorySearchBtn" type="button" value="조회">
    <input class="section-main-button" type="button" value="엑셀변환" onclick="convertExcel()">
    <div>
        <form id="consult-history-form">
            <table>
                <tr>
                    <td class="input-title">상담일자</td>
                    <td style="display: flex">
                        <input type="date" id="consultDateFrom"> - <input type="date" id="consultDateTo">
                    </td>
                    <td class="input-title">고객CID</td>
                    <td><input type="text" id="customerCID"></td>
                    <td class="input-title">고객명</td>
                    <td><input type="text" id="customerName"></td>
                    <td class="input-title">상담원</td>
                    <td>
                        <input type="text" id="consultantName">
                    </td>
                    <td class="input-title">상담경로</td>
                    <td>
                        <input type="radio" name="consultRoot" value="IN">IN
                        <input type="radio" name="consultRoot" value="OUT">OUT
                        <input type="radio" name="consultRoot" value="홈페이지">홈페이지
                        <input type="radio" name="consultRoot" value="매장">매장
                        <input type="radio" name="consultRoot" value="기타">기타
                    </td>
                </tr>
                <tr>
                    <td class="input-title" id="categoryLarge">대분류</td>
                    <td>
                        <select id="categoryLarge" onchange="categorySort(this)">
                            <option value="">-- 선택 --</option>
                            <option value="a">배송문의</option>
                            <option value="b">주문/결제</option>
                            <option value="c">반품/교환/환불</option>
                            <option value="d">기타</option>
                        </select>
                    </td>
                    <td class="input-title">중분류</td>
                    <td>
                        <select id="categoryMedium" />
                    </td>
                    <td class="input-title">상담결과</td>
                    <td>
                        <select id="consultResult">
                            <option value="">-- 선택 --</option>
                            <option>처리중</option>
                            <option>보류</option>
                            <option>완료</option>
                        </select>
                    </td>
                </tr>
            </table>
        </form>
        <!--<form id="consult-history-search">
            <table class="section-four-table">
                <tr>
                    <td>고객명</td>
                    <td>고객 연락처</td>
                    <td>고객 이메일</td>
                    <td>상담경로</td>
                    <td>CID</td>
                    <td>상담일자</td>
                    <td>대분류</td>
                    <td>중분류</td>
                    <td>상담결과</td>
                    <td>상담원</td>
                </tr>
                <tr id="search-result-area"></tr>
            </table>
            <table id="temp-invisible-table" style="display: none"></table>
        </form>-->
        <!-- 엑셀 변환용 form 태그 -->
        <form id="form-excel" action="../../web/getExcel.php" method="post">
            <input type="hidden" id="sql-hidden" name="sql-hidden">
        </form>
        <!-- 페이징(Pagination) -->
        <div id="pagination-result">
            <input type="hidden" name="rowcount" id="rowcount" />
        </div>
    </div>
</div>