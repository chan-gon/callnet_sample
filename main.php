    <!-- navbar -->
    <?php require_once(dirname(__FILE__) . '/resources/layouts/navbar.php'); ?>

    <div class="main-container">
        <!-- 고객정보 -->
        <?php require_once(dirname(__FILE__) . '/resources/layouts/customerInfo.php'); ?>

        <!-- 상담기록 -->
        <?php require_once(dirname(__FILE__) . '/resources/layouts/consultRecord.php'); ?>

        <!-- 상담이력 -->
        <?php require_once(dirname(__FILE__) . '/resources/layouts/consultHistory.php'); ?>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <!-- 고객정보 JS -->
    <script src="resources/js/customerInfoJS.js"></script>
    <!-- 상담기록 JS -->
    <script src="resources/js/consultRecordJS.js"></script>
    <!-- 상담이력 JS -->
    <script src="resources/js/consultHistory.js"></script>

</body>
</html>