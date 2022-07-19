// 상담원 통화 시간 표시 함수 시작
var clockstart = null;
var timeID = null;
function clockDisplay() {
    if (clockstart == null) return;

    var now = (new Date()).getTime();
    var diff = new Date(0, 0, 0, 0, 0, 0, now - clockstart);

    var hours = diff.getHours();
    var minutes = diff.getMinutes();
    var seconds = diff.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    parent.menuFrame.document.all["divclock"].innerHTML = "통화시간 : " + hours + ":" + minutes + ":" + seconds;

    // 메인 프레임의 상담내역 부분에 통화시간 입력
    document.fm.SdCallTime.value = hours + ":" + minutes + ":" + seconds;

    setTimeout("clockDisplay()", 1000);
}

// 통화시간 표시용 시계 시작
function clockStart() {
    clockstart = (new Date()).getTime();
    setTimeout("clockDisplay()", 1000);

    var now = new Date();//(new Date()).getTime();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var nowTime = hours + ":" + minutes + ":" + seconds;

    //parent.mainFrame.SangdamForm.call_start_time.value=nowTime;
}

// 통화시간 표시용 시계 중지
function clockStop() {
    clockstart = null;
    var now = new Date();//(new Date()).getTime();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var nowTime = hours + ":" + minutes + ":" + seconds;
}
// 상담원 통화 시간 표시 함수 끝


    window.addEventListener("beforeunload", function (event) {

    //ws.close();
    //alert("체크");
    var ctid = document.fm.CtiID.value;
    var ctintel = document.fm.AgtIntel.value;
    var ctssid = document.fm.session_id.value;

    LogOut(ctid,ctintel,ctssid);
    //ws_rec.close();
    (event || window.event).returnValue = null;

    return null;
});

    $(document).ready(function(){
    $('#btConn').on('click', function(){
        var path  = window.location.href;
        //var regi1 = document.fm.session_id.value;
        var regi1 = document.getElementById("session_id").value;
        $.post("websocket/getSsid.php",{optVal:regi1}, function(data) {
            $('#session_id').empty();

            //document.getElementById('session_id').childNodes[0].nodeValue= $('#ment2').append(data);
            $('#session_id').val(data);
            //var regi2 = document.fm.session_id.value;
            Ctilogin();
        });

    });
});


    function addTelnum(eventValue) {
    var eventValue = eventValue;
    document.getElementById("telno").value = document.getElementById("telno").value + eventValue;
}

    function delTelnum() {
    document.getElementById("telno").value = "";
}

function pause(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;

    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function sleep(ms){
    ts1 = new Date().getTime() + ms;
    do ts2 = new Date().getTime(); while (ts2<ts1);
}

function whatTime()
{
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var dateString = year + '' + month  + '' + day +''+ hours + '' + minutes  + '' + seconds;//
    return dateString;
}

<!-- websocket.js 로 부터 이벤트 받아서 처리 -->
document.addEventListener( "DOMContentLoaded", function(event) {


    //로그아웃
    document.getElementById("btDisConn").onclick = function()
    {
        var ctid = document.fm.CtiID.value;
        var ctintel = document.fm.AgtIntel.value;
        var ctssid = document.fm.session_id.value;


        LogOut(ctid,ctintel,ctssid);

    };

    //전화걸기
    document.getElementById("btMakecall").onclick = function()
    {


        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;
        var szTelNum = document.fm.telno.value;
        //var dialcode = "99";

        //MakeCall(CtiID,AgtIntel,szTelNum,dialcode);
        MakeCall_noDialcode(CtiID,AgtIntel,szTelNum);

    };

    //전화받기
    document.getElementById("btAnswer").onclick = function()
    {
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Answer(CtiID,AgtIntel);


    };

    //전화끊기
    document.getElementById("btCalldisconn").onclick = function()
    {
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        CallDisconnect(CtiID,AgtIntel);

    };

    //호전환시도
    document.getElementById("btConsult").onclick = function()
    {
        //alert('호전환 시도!');
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;
        var szTelNum = document.fm.telno.value;

        Consult(CtiID,AgtIntel,szTelNum);
    };

    //호전환취소
    document.getElementById("btReconnect").onclick = function()
    {
        //alert('호전환 취소!');
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Reconnect(CtiID,AgtIntel);
    };

    //호전환완료
    document.getElementById("btTrensfer").onclick = function()
    {
        //alert('호전환 완료!');
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Transfer(CtiID,AgtIntel);
    };

    //휴식하기
    document.getElementById("btBreakon").onclick = function()
    {
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Breakon(CtiID,AgtIntel);
    };

    //업무대기
    document.getElementById("btIdle").onclick = function()
    {

        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Idle(CtiID,AgtIntel);
    };

    //점심식사
    document.getElementById("btLunch").onclick = function()
    {
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Lunch(CtiID,AgtIntel);
    };

    //교육하기
    document.getElementById("btEducation").onclick = function()
    {
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Education(CtiID,AgtIntel);
    };

    //서류업무
    document.getElementById("btPaperwork").onclick = function()
    {
        var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        Paperwork(CtiID,AgtIntel);
    };
    //선택녹취시작
    document.getElementById("btSelrec").onclick = function()
    {
        var CtiID = document.fm.CtiID.value; //상담원ID 16byte 제한
        var AgtName = document.fm.AgtName.value; //상담원이름 20byte 제한
        var AgtIntel = document.fm.AgtIntel.value; //상담원 내선번호 16byte 제한
        var szTelNum = document.fm.telno.value; //고객전화번호 20byte제한
        var iogubun = document.fm.iogubun.value; //인콜,아웃콜 구분 3byte 제한
        var custnm = "고객이름"; //고객,고객사이름 50byte 제한
        var cust_idx = "1010"; // 고객IDX 20 byte 제한

        var call_no = whatTime()+"_"+AgtIntel; // CALL ID 생성값 , 필요시 사용
        var file_name = call_no;

        doConnect_selrec(CtiID,AgtName,AgtIntel,szTelNum,iogubun,custnm,cust_idx,call_no,file_name);
    };
    //선택녹취종료
    document.getElementById("btSelrecEnd").onclick = function()
    {
        //var CtiID = document.fm.CtiID.value;
        var AgtIntel = document.fm.AgtIntel.value;

        doConnect_selrecend(AgtIntel);
    };
} );





function Ctilogin()
{
    var ctid = document.fm.CtiID.value;
    var ctintel = document.fm.AgtIntel.value;
    var ctssid = document.fm.session_id.value;
    var ctltype = document.fm.logintype.value;
    document.getElementById("status").value = "로그인 시도" + "\n" + document.getElementById("status").value;
    doConnect(ctid,ctintel,ctssid,ctltype);
}

function CtiLogout()
{

    document.getElementById("status").value = ("로그아웃 성공\n") + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";

    var g = document.getElementById("btBreakon"); // 휴식하기 버튼
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var l = document.getElementById("btSelrec"); // 서류업무 버튼
    l.disabled = true;
    l.style.fontSize = "12px";
    l.style.fontWeight = "normal";
    l.style.color = "Grey";
    l.style.background = "";

    var m= document.getElementById("btSelrecEnd"); // 서류업무 버튼
    m.disabled = true;
    m.style.fontSize = "12px";
    m.style.fontWeight = "normal";
    m.style.color = "Grey";
    m.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼
    x.disabled = true;
    x.style.fontSize = "12px";
    x.style.fontWeight = "normal";
    x.style.color = "Grey";
    x.style.background = "";

    var y = document.getElementById("btConn"); // 로그인 버튼
    y.disabled = false;
    y.style.fontSize = "12px";
    y.style.fontWeight = "bold";
    y.style.color = "Black";
    y.style.background = "White";

}

function set_status_Idle() {
    document.getElementById("status").value = "업무대기" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼 ON
    a.disabled = false;
    a.style.fontSize = "12px";
    a.style.fontWeight = "bold";
    a.style.color = "Black";
    a.style.background = "White";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼 OFF
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼 OFF
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼 OFF
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼 OFF
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼 OFF
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";

    var g = document.getElementById("btBreakon"); // 휴식하기 버튼 ON
    g.disabled = false;
    g.style.fontSize = "12px";
    g.style.fontWeight = "bold";
    g.style.color = "Black";
    g.style.background = "White";

    var h = document.getElementById("btIdle"); // 업무대기 버튼 OFF
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼 ON
    i.disabled = false;
    i.style.fontSize = "12px";
    i.style.fontWeight = "bold";
    i.style.color = "Black";
    i.style.background = "White";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = false;
    j.style.fontSize = "12px";
    j.style.fontWeight = "bold";
    j.style.color = "Black";
    j.style.background = "White";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = false;
    k.style.fontSize = "12px";
    k.style.fontWeight = "bold";
    k.style.color = "Black";
    k.style.background = "White";

    var l = document.getElementById("btSelrec"); //로그아웃 버튼 ON
    l.disabled = false;
    l.style.fontSize = "12px";
    l.style.fontWeight = "bold";
    l.style.color = "Black";
    l.style.background = "White";

    var m = document.getElementById("btSelrecEnd"); // 로그인 버튼 OFF
    m.disabled = true;
    m.style.fontSize = "12px";
    m.style.fontWeight = "normal";
    m.style.color = "Grey";
    m.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼 ON
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";


    var y = document.getElementById("btConn"); // 로그인 버튼 OFF
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";


}

function set_status_Breakon() {
    document.getElementById("status").value = "휴식중" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";

    var d = document.getElementById("btConsult"); // 호전환시도 버튼
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼
    h.disabled = false;
    h.style.fontSize = "12px";
    h.style.fontWeight = "bold";
    h.style.color = "Black";
    h.style.background = "White";

    var i = document.getElementById("btLunch"); // 점심식사 버튼
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function set_status_Lunch() {
    document.getElementById("status").value = "점심식사중" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼
    h.disabled = false;
    h.style.fontSize = "12px";
    h.style.fontWeight = "bold";
    h.style.color = "Black";
    h.style.background = "White";

    var i = document.getElementById("btLunch"); // 점심식사 버튼
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function set_status_Education() {
    document.getElementById("status").value = "교육중" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼
    h.disabled = false;
    h.style.fontSize = "12px";
    h.style.fontWeight = "bold";
    h.style.color = "Black";
    h.style.background = "White";

    var i = document.getElementById("btLunch"); // 점심식사 버튼
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function set_status_Conference() {
    document.getElementById("status").value = "회의중" + "\n" + document.getElementById("status").value;
}

function set_status_Paperwork() {
    document.getElementById("status").value = "서류업무중" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼
    h.disabled = false;
    h.style.fontSize = "12px";
    h.style.fontWeight = "bold";
    h.style.color = "Black";
    h.style.background = "White";

    var i = document.getElementById("btLunch"); // 점심식사 버튼
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";

}

function set_status_Changeseat() {
    document.getElementById("status").value = "이석중" + "\n" + document.getElementById("status").value;
}

function set_status_Underoutbound() {
    document.getElementById("status").value = "OB작업중" + "\n" + document.getElementById("status").value;
}

function set_status_Ringing() {
    document.getElementById("status").value = "전화벨울림" + "\n" + document.getElementById("status").value;
}

function set_status_Nowcalling() {
    document.getElementById("status").value = "통화중" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼 OFF
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼 OFF
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼 ON
    c.disabled = false;
    c.style.fontSize = "12px";
    c.style.fontWeight = "bold";
    c.style.color = "Black";
    c.style.background = "White";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼 ON
    d.disabled = false;
    d.style.fontSize = "12px";
    d.style.fontWeight = "bold";
    d.style.color = "Black";
    d.style.background = "White";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼 OFF
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼 OFF
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";

    var g = document.getElementById("btBreakon"); // 휴식하기 버튼 OFF
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼 OFF
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼 OFF
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼 OFF
    x.disabled = true;
    x.style.fontSize = "12px";
    x.style.fontWeight = "normal";
    x.style.color = "Grey";
    x.style.background = "";

    var y = document.getElementById("btConn"); // 로그인 버튼 OFF
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function set_status_Offhook() {
    document.getElementById("status").value = "수화기 듬(OFF HOOK)" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼 ON
    a.disabled = false;
    a.style.fontSize = "12px";
    a.style.fontWeight = "bold";
    a.style.color = "Black";
    a.style.background = "White";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼 OFF
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼 OFF
    c.disabled = false;
    c.style.fontSize = "12px";
    c.style.fontWeight = "bold";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼 OFF
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼 OFF
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼 OFF
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼 OFF
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼 OFF
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼 OFF
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";


    var x = document.getElementById("btDisConn"); //로그아웃 버튼 OFF
    x.disabled = true;
    x.style.fontSize = "12px";
    x.style.fontWeight = "normal";
    x.style.color = "Grey";
    x.style.background = "";

    var y = document.getElementById("btConn"); // 로그인 버튼 OFF
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function set_status_Afterwork() {
    document.getElementById("status").value = "후처리중" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼
    g.disabled = false;
    g.style.fontSize = "12px";
    g.style.fontWeight = "bold";
    g.style.color = "Black";
    g.style.background = "White";

    var h = document.getElementById("btIdle"); // 업무대기 버튼
    h.disabled = false;
    h.style.fontSize = "12px";
    h.style.fontWeight = "bold";
    h.style.color = "Black";
    h.style.background = "White";

    var i = document.getElementById("btLunch"); // 점심식사 버튼
    i.disabled = false;
    i.style.fontSize = "12px";
    i.style.fontWeight = "bold";
    i.style.color = "Black";
    i.style.background = "White";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = false;
    j.style.fontSize = "12px";
    j.style.fontWeight = "bold";
    j.style.color = "Black";
    j.style.background = "White";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = false;
    k.style.fontSize = "12px";
    k.style.fontWeight = "bold";
    k.style.color = "Black";
    k.style.background = "White";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function set_status_Preparation() {
    document.getElementById("status").value = "업무준비중" + "\n" + document.getElementById("status").value;
}

function set_status_Assignment() {
    document.getElementById("status").value = "상담원 배정" + "\n" + document.getElementById("status").value;
}

function action_status_Makecall() {
    document.getElementById("status").value = "전화 걸기" + "\n" + document.getElementById("status").value;

    document.fm.iogubun.value = "O";

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = false;
    c.style.fontSize = "12px";
    c.style.fontWeight = "bold";
    c.style.color = "Black";
    c.style.background = "White";

    var d = document.getElementById("btConsult"); // 호전환시도 버튼
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼
    x.disabled = true;
    x.style.fontSize = "12px";
    x.style.fontWeight = "normal";
    x.style.color = "Grey";
    x.style.background = "";

    var y = document.getElementById("btConn"); // 로그인 버튼
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";




}

function action_status_Offhook() {
    document.getElementById("status").value = "수화기 듬" + "\n" + document.getElementById("status").value;
    document.fm.iogubun.value = "O";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼
    c.disabled = false;
    c.style.fontSize = "12px";
    c.style.fontWeight = "bold";
    c.style.color = "Black";
    c.style.background = "White";

    clockStart();


}

function action_status_Onhook() {
    document.getElementById("status").value = "수화기 놓음" + "\n" + document.getElementById("status").value;
    var CtiID = document.fm.CtiID.value; //상담원ID 16byte 제한
    var AgtName = document.fm.AgtName.value; //상담원이름 20byte 제한
    var AgtIntel = document.fm.AgtIntel.value; //상담원 내선번호 16byte 제한
    var szTelNum = document.fm.telno.value; //고객전화번호 20byte제한
    var iogubun = document.fm.iogubun.value; //인콜,아웃콜 구분 3byte 제한
    var custnm = "고객이름"; //고객,고객사이름 50byte 제한
    var cust_idx = "1010"; // 고객IDX 20 byte 제한

    var call_no = whatTime()+"_"+AgtIntel; // CALL ID 생성값 , 필요시 사용
    //var file_name = call_no;

    doConnect_rec(CtiID,AgtName,AgtIntel,szTelNum,iogubun,custnm,cust_idx,call_no);
    clockStop();
}

function action_status_Callconnected() {
    document.getElementById("status").value = "통화 연결됨" + "\n" + document.getElementById("status").value;
}

function action_status_Calldisconnected() {
    document.getElementById("status").value = "통화 종료됨" + "\n" + document.getElementById("status").value;
}

function action_status_Incomingcall(val1, val2) {
    var replaced_szCid = val1;
    var replaced_szDnis = val2;

    document.getElementById("status").value = "전화 인입" + "\n" + document.getElementById("status").value;
    document.getElementById("status").value = "CID: " + replaced_szCid + "\n" + document.getElementById("status").value;
    document.getElementById("status").value = "DNIS: " + replaced_szDnis + "\n" + document.getElementById("status").value;

    window.open("./incall.php?cid="+replaced_szCid+"&dnis="+replaced_szDnis,"popwindow", "width=900, height=500px,left=200px, menubar=no,status=no,scrollbars=no,center=yes");

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼 OFF
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼 ON
    b.disabled = false;
    b.style.fontSize = "12px";
    b.style.fontWeight = "bold";
    b.style.color = "Black";
    b.style.background = "White";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼 OFF
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼 OFF
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼 OFF
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼 OFF
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼 OFF
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼 OFF
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼 OFF
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼 ON
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼 OFF
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";

    document.fm.popchk.value = "O";
    document.fm.iogubun.value = "I";
    document.fm.telno.value = replaced_szCid;

    clockStart();

}

function action_status_Consult() {
    document.getElementById("status").value = "호전환 시도" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼 OFF
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼 OFF
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼 OFF
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼 OFF
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼 ON
    e.disabled = false;
    e.style.fontSize = "12px";
    e.style.fontWeight = "bold";
    e.style.color = "Black";
    e.style.background = "White";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼 ON
    f.disabled = false;
    f.style.fontSize = "12px";
    f.style.fontWeight = "bold";
    f.style.color = "Black";
    f.style.background = "White";

    var g = document.getElementById("btBreakon"); // 휴식하기 버튼 OFF
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼 OFF
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼 OFF
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";


    var x = document.getElementById("btDisConn"); //로그아웃 버튼 ON
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼 OFF
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function action_status_Consultcancel() {
    document.getElementById("status").value = "호전환 취소" + "\n" + document.getElementById("status").value;
    document.getElementById("status").value = "통화중" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼 OFF
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼 OFF
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼 ON
    c.disabled = false;
    c.style.fontSize = "12px";
    c.style.fontWeight = "bold";
    c.style.color = "Black";
    c.style.background = "White";


    var d = document.getElementById("btConsult"); // 호전환시도 버튼 ON
    d.disabled = false;
    d.style.fontSize = "12px";
    d.style.fontWeight = "bold";
    d.style.color = "Black";
    d.style.background = "White";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼 OFF
    e.disabled = true;
    e.style.fontSize = "12px";
    e.style.fontWeight = "normal";
    e.style.color = "Grey";
    e.style.background = "";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼 OFF
    f.disabled = true;
    f.style.fontSize = "12px";
    f.style.fontWeight = "normal";
    f.style.color = "Grey";
    f.style.background = "";

    var g = document.getElementById("btBreakon"); // 휴식하기 버튼 OFF
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼 OFF
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼 OFF
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";

    var x = document.getElementById("btDisConn"); //로그아웃 버튼 OFF
    x.disabled = true;
    x.style.fontSize = "12px";
    x.style.fontWeight = "normal";
    x.style.color = "Grey";
    x.style.background = "";

    var y = document.getElementById("btConn"); // 로그인 버튼 OFF
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function action_status_Consultcomplete() {
    document.getElementById("status").value = "호전환 완료" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btMakecall"); // 전화걸기 버튼 OFF
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btAnswer"); // 전화받기 버튼 OFF
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

    var c = document.getElementById("btCalldisconn"); // 전화끊기 버튼 OFF
    c.disabled = true;
    c.style.fontSize = "12px";
    c.style.fontWeight = "normal";
    c.style.color = "Grey";
    c.style.background = "";

    var d = document.getElementById("btConsult"); // 호전환시도 버튼 OFF
    d.disabled = true;
    d.style.fontSize = "12px";
    d.style.fontWeight = "normal";
    d.style.color = "Grey";
    d.style.background = "";

    var e = document.getElementById("btReconnect"); // 호전환취소 버튼 ON
    e.disabled = false;
    e.style.fontSize = "12px";
    e.style.fontWeight = "bold";
    e.style.color = "Black";
    e.style.background = "White";

    var f = document.getElementById("btTrensfer"); // 호전환완료 버튼 ON
    f.disabled = false;
    f.style.fontSize = "12px";
    f.style.fontWeight = "bold";
    f.style.color = "Black";
    f.style.background = "";


    var g = document.getElementById("btBreakon"); // 휴식하기 버튼 OFF
    g.disabled = true;
    g.style.fontSize = "12px";
    g.style.fontWeight = "normal";
    g.style.color = "Grey";
    g.style.background = "";

    var h = document.getElementById("btIdle"); // 업무대기 버튼 OFF
    h.disabled = true;
    h.style.fontSize = "12px";
    h.style.fontWeight = "normal";
    h.style.color = "Grey";
    h.style.background = "";

    var i = document.getElementById("btLunch"); // 점심식사 버튼 OFF
    i.disabled = true;
    i.style.fontSize = "12px";
    i.style.fontWeight = "normal";
    i.style.color = "Grey";
    i.style.background = "";

    var j = document.getElementById("btEducation"); // 교육시작 버튼
    j.disabled = true;
    j.style.fontSize = "12px";
    j.style.fontWeight = "normal";
    j.style.color = "Grey";
    j.style.background = "";

    var k = document.getElementById("btPaperwork"); // 서류업무 버튼
    k.disabled = true;
    k.style.fontSize = "12px";
    k.style.fontWeight = "normal";
    k.style.color = "Grey";
    k.style.background = "";


    var x = document.getElementById("btDisConn"); //로그아웃 버튼 ON
    x.disabled = false;
    x.style.fontSize = "12px";
    x.style.fontWeight = "bold";
    x.style.color = "Black";
    x.style.background = "White";

    var y = document.getElementById("btConn"); // 로그인 버튼 OFF
    y.disabled = true;
    y.style.fontSize = "12px";
    y.style.fontWeight = "normal";
    y.style.color = "Grey";
    y.style.background = "";
}

function action_status_SelrecOn() {
    document.getElementById("status").value = "선택녹취 시작 시도" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btSelrec"); // 선택녹취 시작 버튼 OFF
    a.disabled = true;
    a.style.fontSize = "12px";
    a.style.fontWeight = "normal";
    a.style.color = "Grey";
    a.style.background = "";

    var b = document.getElementById("btSelrecEnd"); // 선택녹취 종료 버튼 ON
    b.disabled = false;
    b.style.fontSize = "12px";
    b.style.fontWeight = "bold";
    b.style.color = "Black";
    b.style.background = "White";

}

function action_status_SelrecOff() {
    document.getElementById("status").value = "선택녹취 종료 시도" + "\n" + document.getElementById("status").value;

    var a = document.getElementById("btSelrec"); // 선택녹취 시작 버튼 ON
    a.disabled = false;
    a.style.fontSize = "12px";
    a.style.fontWeight = "bold";
    a.style.color = "Black";
    a.style.background = "White";

    var b = document.getElementById("btSelrecEnd"); // 선택녹취 종료 버튼 OFF
    b.disabled = true;
    b.style.fontSize = "12px";
    b.style.fontWeight = "normal";
    b.style.color = "Grey";
    b.style.background = "";

}

function set_Alarm_Disconnect()
{

    var ctid = document.fm.CtiID.value;
    var ctintel = document.fm.AgtIntel.value;
    var ctssid = document.fm.session_id.value;


    document.getElementById("status").value = "Socket CLOSED" + "\n" + document.getElementById("status").value;
    alert("CONNECT FAIL WEB SOCKET SERVER CLOSED");
    clearInterval(alichk);
    CtiLogout();
}

function RET_OK() {
    document.getElementById("status").value = "정상처리" + "\n" + document.getElementById("status").value;
}
function RET_NO_MACHINE() {
    document.getElementById("status").value = "잘못된 연동장치 코드" + "\n" + document.getElementById("status").value;
}
function RET_NO_MESSAGE() {
    document.getElementById("status").value = "잘못된 메시지 TYPE" + "\n" + document.getElementById("status").value;
}
function RET_NOTLOGIN() {
    document.getElementById("status").value = "로그인 아닌 상태에서 로그인 이외 메시지 수신" + "\n" + document.getElementById("status").value;
}
function RET_NODEVTYPE() {
    document.getElementById("status").value = "일치 하는 DEVICE TYPE 없음(AGT,IVR 등이 아님)" + "\n" + document.getElementById("status").value;
}
function RET_LOADING_FAIL() {
    document.getElementById("status").value = "DB에서 상담원 정보 LOADING 실패" + "\n" + document.getElementById("status").value;
}
function RET_NOMACHINGSESSIONID() {
    document.getElementById("status").value = "세션 ID 일치 하지 않음 (다른 로그인된 상담원 있음)" + "\n" + document.getElementById("status").value;
    CtiLogout();
    var forcelogin = confirm("강제로그인 하시겠습니까?");
    if(forcelogin)
    {
        document.fm.logintype.value="1";
        document.getElementById("status").value = "강제 로그인 설정 완료" + "\n" + document.getElementById("status").value;

    }
    else
    {
        document.getElementById("status").value = "강제 로그인 취소" + "\n" + document.getElementById("status").value;
    }


}
function RET_FORCELOGOUT() {
    document.getElementById("status").value = "다른 세션 로그인으로 강제 로그아웃됨" + "\n" + document.getElementById("status").value;

    CtiLogout();
    document.fm.logintype.value = "0";
    alert("Force Logout");
}
function RET_INVAILD_VERSION() {
    document.getElementById("status").value = "잘못된 버전" + "\n" + document.getElementById("status").value;
}
function RET_ID_ERR_NOT_EXIST() {
    document.getElementById("status").value = "존재하지 않는 ID" + "\n" + document.getElementById("status").value;
}
function RET_EXTLINE_NOT_EXIST() {
    document.getElementById("status").value = "존재하지 않는 내선 번호" + "\n" + document.getElementById("status").value;
}
function RET_NO_STATUS() {
    document.getElementById("status").value = "잘못된 상태 변경 요청" + "\n" + document.getElementById("status").value;
}
function RET_AGTCONN_NOCHANGE() {
    document.getElementById("status").value = "통화중 상태 변경 요청( 통화중 휴식등의 상태 변경 안됨 )" + "\n" + document.getElementById("status").value;
}
function RET_MAKE_AGTALLOC() {
    document.getElementById("status").value = "전화 걸기 실패, 상담원 배정중" + "\n" + document.getElementById("status").value;
}
function RET_NOCALL() {
    document.getElementById("status").value = "현재 콜이 없음" + "\n" + document.getElementById("status").value;
}
function RET_INVAILD_TELNUM() {
    document.getElementById("status").value = "잘못된 전화 번호" + "\n" + document.getElementById("status").value;
}
function RET_OUTCALL_FAIL() {
    document.getElementById("status").value = "전화 걸기 실패" + "\n" + document.getElementById("status").value;
}
function RET_CONSULT_FAIL() {
    document.getElementById("status").value = "CONSULT 실패" + "\n" + document.getElementById("status").value;
}
function RET_TRANS_FAIL() {
    document.getElementById("status").value = "호전환 완료 실패" + "\n" + document.getElementById("status").value;
}

function RET_RECONN_FAIL() {
    document.getElementById("status").value = "호전환 취소나, UnHold 실패" + "\n" + document.getElementById("status").value;
}

function RET_NO_IDLEAGENT() {
    document.getElementById("status").value = "연결 가능한 상담원 없음" + "\n" + document.getElementById("status").value;
}
function RET_FAIL_TRANS() {
    document.getElementById("status").value = "상담원에게 호전환 실패" + "\n" + document.getElementById("status").value;
}
function RET_INVAILD_GROUP() {
    document.getElementById("status").value = "잘못된 그룹번호" + "\n" + document.getElementById("status").value;
}
function RET_NOT_MSTTYPE() {
    document.getElementById("status").value = "잘못된 메시지 TYPE" + "\n" + document.getElementById("status").value;
}
function RET_NOT_CHNOT_FIND() {
    document.getElementById("status").value = "내선 찾지 못함" + "\n" + document.getElementById("status").value;
}
function RET_FILE_CREATE_FAIL() {
    document.getElementById("status").value = "녹취시작 실패" + "\n" + document.getElementById("status").value;
}
function RET_NOT_RECORDING() {
    document.getElementById("status").value = "녹취 중 아님" + "\n" + document.getElementById("status").value;
}
function RET_SEL_RECORDING() {
    document.getElementById("status").value = "이미 선택 녹취중" + "\n" + document.getElementById("status").value;
}
function RET_NOT_EXIST_FILE() {
    document.getElementById("status").value = "기존 녹취 파일 없음" + "\n" + document.getElementById("status").value;
}
function RET_DB_IN_FAIL() {
    document.getElementById("status").value = "DB 입력 실패" + "\n" + document.getElementById("status").value;
}
function RET_NOT_SEL_RECORDING() {
    document.getElementById("status").value = "선택 녹취중 아님" + "\n" + document.getElementById("status").value;
}
function RET_ETC_ERROR() {
    document.getElementById("status").value = "기타실패" + "\n" + document.getElementById("status").value;
}

function action_status_DisplayOn(arg1) {
    document.getElementById("status").value = "" + "\n"+(arg1 + "\n") + document.getElementById("status").value;
}