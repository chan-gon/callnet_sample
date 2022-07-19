    <!-- navbar -->
    <?php require_once(dirname(__FILE__) . '/resources/layouts/navbar.php'); ?>

    <div style="float: left" class="outer-container">
        <div class="inner-container">
            <?php require_once(dirname(__FILE__).'/websocket/menu.php');?>
        </div>
    </div>

    <div class="outer-container">
        <div class="inner-container">
            <!-- 고객정보 -->
            <?php require_once(dirname(__FILE__) . '/resources/layouts/customerInfo.php'); ?>

            <!-- 상담기록 -->
            <?php require_once(dirname(__FILE__) . '/resources/layouts/consultRecord.php'); ?>

            <!-- 상담이력 -->
            <?php require_once(dirname(__FILE__) . '/resources/layouts/consultHistory.php'); ?>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <!-- 고객정보 JS -->
    <script src="resources/js/customerInfoJS.js"></script>
    <!-- 상담기록 JS -->
    <script src="resources/js/consultRecordJS.js"></script>
    <!-- 상담이력 JS -->
    <script src="resources/js/consultHistory.js"></script>
    <!-- 로그아웃 JS -->
    <script src="resources/js/logout.js"></script>
    <!-- menu.js -->
    <script src="resources/js/menu.js"></script>
    <!-------- CTI / REC 용 WebSocket 모듈 호출 -------->
    <script src="resources/js/websocket_cti.js"></script>
    <script src="resources/js/websocket_rec.js"></script>
</body>
</html>