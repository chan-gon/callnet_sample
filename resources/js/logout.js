$("#logout").click(function () {
   if (confirm("로그아웃 하시겠습니까?")) {
       location.href = "web/logout.php";
   } else {
       return false;
   }
});