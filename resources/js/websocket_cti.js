/*
	본 웹소켓 모듈과 연동되는 CS 또는 웹페이지 UI 개발시
	동봉된 menu.php 파일을 참고하시는 것을 추천합니다.
*/

/* --- 전역 변수 선언 --- */
var ws;
var msg;
/* --------------------- */


/* ----- 문자열 채우기 용 함수 -----*/

/* 좌측문자열채우기
 @params - str : 원 문자열 / padLen : 최대 채우고자 하는 길이 / padStr : 채우고자하는 문자(char) */
function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str;
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

/* 우측문자열채우기
 @params - str : 원 문자열 / padLen : 최대 채우고자 하는 길이 / padStr : 채우고자하는 문자(char) */
function rpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
        return str + "";
    }
    str += ""; // 문자로
    padStr += ""; // 문자로
    while (str.length < padLen)
        str += padStr;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

/* ------------------------------ */

// 웹소켓 연결
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호, 세션아이디, 로그인타입
function doConnect(id,intel,sid,ltype)
{

	var addr = "ws://192.168.1.9:7004";

	ws = new WebSocket(addr);
	var ssid = sid;
	var logintype = ltype;
	var CtiID = rpad(id,20," ");
	var AgtIntel = rpad(intel,16," ");


	// logintype 값이 1 이면 강제로그인 실행
	if(logintype =="1")
	{
		/*
		Login-power
		로그인 시도시 정상적인 로그아웃 처리가 안됐거나
		기존 연결 커넥션을 강제적으로 끊고 로그인 할시 사용.
		메뉴얼 요청 szReqType 참조. ssid , 세션ID 자체 생성필요.
		*/

		//alert("강제로그인");
		ws.onopen = function()
		{
			var wsMessage = "1000"+"0307"+"0001"+""+CtiID+""+AgtIntel+""+"0000"+"00000038"+"0000"+"01"+ssid;
			ws.send(wsMessage);

		};
	}

	// logintype 값이 1 이외 일 경우 일반로그인 실행
	else
	{
		/*
		Login
		CTI 프로세스 기동후 최초사용or 로그아웃된 계정으로 로그인 시도시 사용
		메뉴얼 요청 szReqType 참조.	세션ID 자체 생성필요.
		ex) 세션ID 생성규칙 : YmdHis+ CtiID, Default 길이 32 byte
		*/
		
		//alert("일반로그인");
		ws.onopen = function()
		{
			
			var wsMessage = "1000"+"0307"+"0001"+""+CtiID+""+AgtIntel+""+"0000"+"00000038"+"0000"+"00"+ssid;
			ws.send(wsMessage);

		};
	}


	ws.onmessage = function (evt)
	{
		var eventData = evt.data;
		var szMsgType = eventData.substring(8,12);
		var szResult = eventData.substring(48,52);
		var szReqStatus = eventData.slice(-4);
		var szReqStatus2 = eventData.slice(-2);

		console.log('replaced_szCid = ' + eventData.substring(92,122).trim());
		console.log('replaced_szDnis = ' + eventData.substring(168,184).trim());
		
		/*
		Error-Message 처리
		WebSocket 응답메시지중 결과값 szResult 가 0000 이 아닐 경우 정상 스텝이 아니거나 데이터가 누락될시 발생
		*/

		if (szResult != "0000"){

			// 서버로 부터 받은 szResult 값에 따라 UI 페이지에서 구현된 경고메시지 표시 함수 실행
			// 오류관련 호출함수들, RET_NO_MACHINE,RET_NO_MESSAGE 를 포함한 모든 함수는 자체 생성 혹은 처리가 필요.
			if(szResult == "0001"){
				RET_NO_MACHINE();
				/* 
				잘못된 연동장치코드 : CTI,IVR 등 내부시스템 통신코드의 문제
				=>에러메시지 출력. 웹소켓 통신 데이터의 Byte길이 체크
				*/
			} else if(szResult == "0002"){
				RET_NO_MESSAGE();
				/*
				잘못된 메시지 Type : 컴파일 되지 않은 별도의 szMsgType 의 케이스가 들어올 경우 발생
				=> 에러메시지 출력. 메뉴얼 참고및 케이스 이외 szMsgType 인지 체크
				*/
			} else if(szResult == "0003"){
				RET_NOTLOGIN();
				/*
				로그인이 아닌 상태에서 로그인 이외 메시지 수신
				=> 사전 로그인시도및 성공여부 체크, 에러메시지 출력후 종료 혹은 재 로그인시도
				*/		
			} else if(szResult == "0004"){
				RET_NODEVTYPE();
				/*
				일치하는 DEVICE TYPE 없음 : 웹소켓 데이터 수신분류가 AGT,IVR 등이 아님
				=> 에러메시지 출력. szMsgType타입 확인 및 Send Data 양식 확인.
				*/
			} else if(szResult == "0005"){
				RET_LOADING_FAIL();
				/*
				DB에서 상담원 정보 Loading 실패 : 웹과 DB가아닌 CTI 프로세스와 DB간의 통신상태 체크.
				=> 에러메시지 출력후 종료. IVR, CTI 프로세스 재실행이후 작동 체크
				*/
			} else if(szResult == "0006"){
				RET_NOMACHINGSESSIONID();
				/*
				세션 ID 일치하지 않음 : 같은 내선번호, CTI ID로 이미 로그인되어있는 상담원이 있음.
				=> WebSocket 로그 확인. 로그아웃 여부 확인 및 이미 로그인되어있는 상담원의 경우 Login-power 로 강제로그인 시도
				*/
			} else if(szResult == "0007"){
				RET_FORCELOGOUT();
				/*
				다른 세션로그인으로 강제 로그아웃됨 : 기존 CTI로그인되어있는 계정에서 Login-power 로 강제로그인 할시
				기존 로그인에 해당 데이터를 수신. 에러메시지 출력후 종료.
				*/
			} else if(szResult == "0009"){
				RET_INVAILD_VERSION();
				/*
				잘못된 버전 : 맞지않는 버전의 데이터가 올 경우 해당. Default는 0307. 버전에 맞춰 수정필요.
				메뉴얼 szMsgVersion 참고. 에러메시지 출력.
				*/
			} else if(szResult == "1001"){
				RET_ID_ERR_NOT_EXIST();
				/*
				존재하지 않는 ID : CTI DB에 agent 테이블 agtid 확인.
				=> 에러메시지 출력.
				*/
			} else if(szResult == "1002"){
				RET_EXTLINE_NOT_EXIST();
				/*
				존재하지 않는 내선번호 : CTI DB에 agent 테이블 agtctiid 와 agtext 확인.
				=> 에러메시지 출력.
				*/
			} else if(szResult == "1003"){
				RET_NO_STATUS();
				/*
				잘못된 상태변경 요청 :  로그인시도 및 상태변경시 발생 가능
				=> 에러메시지 출력.
				메뉴얼 로그인 요청에서 szReqStatus, 상태 변경 요청에서 szReqStatus 확인. 이후 CTI DB agt_st 에 상태코드 확인.
				*/
			} else if(szResult == "1004"){
				RET_AGTCONN_NOCHANGE();
				/*
				통화중 상태변경 요청 : 통화중인 내선번호에 상태변경 요청이 올 경우 발생
				=> 내부 프로세스 재확인. 에러메시지 출력.
				*/
			} else if(szResult == "2001"){
				RET_MAKE_AGTALLOC();
				/*
				전화걸기 실패-상담원 배정중 : 인바운드 콜 인입과 비슷하게 아웃바운드 시도시 발생.
				=> 아웃바운드 실패후 에러미시지 출력. 혹은 incomming call 이벤트 와 연계 가능.
				*/
			} else if(szResult == "2002"){
				RET_NOCALL();
				/*
				현재 콜이 없음 : 연결된 전화가 없이 콜관련 이벤트처리시 발생.
				=> 에러메시지 출력.
				*/
			} else if(szResult == "2003"){
				RET_INVAILD_TELNUM();
				/*
				잘못된 전화번호 : 콜 이벤트시 전화번호(CID) 관련 정보의 문제. 파싱이 필요할시 자체 파싱 필요.
				=> 에러 메시지출력후 자율
				*/
			} else if(szResult == "2004"){
				RET_OUTCALL_FAIL();
				/*
				전화 걸기 실패 : 전화기 연결상태 확인 및 WebSocket 통신상태 체크
				=> 에러메시지 출력.
				*/
			} else if(szResult == "2005"){
				RET_CONSULT_FAIL();
				/*
				Consult 실패(호전환시도 실패) : 전화기 연결상태 확인 및 WebSocket 통신상태 체크
				=> 에러메시지 출력. 이후 호전환 관련 메뉴얼 참고.
				*/
			} else if(szResult == "2006"){
				RET_TRANS_FAIL();
				/*
				호전환 완료 실패
				*/
			} else if(szResult == "2007"){
				RET_RECONN_FAIL();
				/*
				호전환 취소나 Unhold 실패
				*/
			} else if(szResult == "3000"){
				RET_NO_IDLEAGENT();
				/*
				연결 가능한 상담원 없음.
				기본적으로 3000대 오류의 경우 클라이언트,즉 상담원과 CTI 서버간 발생하는게 아닌
				IVR 과 CTI 간의 통신상 발생함.
				=> 에러메시지 출력 혹은 처리 불필요.
				*/
			} else if(szResult == "3001"){
				RET_FAIL_TRANS();
				/*
				상담원에게 호전환실패 : 상담원 -> 상담원 호전환이 아닌 CTI 혹은 IVR에서 상담원에게 콜배정, 호전환 처리가 실패시 발생
				기본적으로 3000대 오류의 경우 클라이언트,즉 상담원과 CTI 서버간 발생하는게 아닌
				IVR 과 CTI 간의 통신상 발생함.
				=> 에러메시지 출력 혹은 처리 불필요.
				*/
			} else if(szResult == "3002"){
				RET_INVAILD_GROUP();
				/*
				잘못된 그룹
				기본적으로 3000대 오류의 경우 클라이언트,즉 상담원과 CTI 서버간 발생하는게 아닌
				IVR 과 CTI 간의 통신상 발생함.
				=> 에러메시지 출력 혹은 처리 불필요.
				*/
			} else {
				action_status_DisplayOn(eventData);
				/*
				기타 실패 : 분류된 에러가아닌 기타 모든 메시지 포함.
				=> 에러메시지 출력. Response가 온 eventData 그대로 로그 확인 및 메뉴얼 참조.
				*/
			}

		} else {

			// 서버로 부터 받은 szMsgType 과 szResult 값에 따라 UI 페이지에서 상태메시지 표시 함수 실행
			// 상태변경및 이벤트 처리 함수들. set_status_Idle,set_status_Breakon,기타 action 함수 를 포함한 모든 함수는 자체 생성 혹은 처리가 필요.
			// UI 관련 함수들. 해당 함수들 호출후 해당 함수내에서 스크립트 하단에 WebSocket 전문 데이터 요청하는 함수 호출 추천.
			if (szMsgType == "0018" || szMsgType == "0001") {

				if (szReqStatus == "0000" ) { //업무대기
					set_status_Idle();
				} else if (szReqStatus == "1001" ) { //휴식중
					set_status_Breakon();
				} else if (szReqStatus == "1002" ) { //점심식사중
					set_status_Lunch();
				} else if (szReqStatus == "1003" ) { //교육
					set_status_Education();
				} else if (szReqStatus == "1004" ) { //회의
					set_status_Conference();
				} else if (szReqStatus == "1005" ) { //서류업무
					set_status_Paperwork();
				} else if (szReqStatus == "1006" ) { //이석(자리비움)
					set_status_Changeseat();
				} else if (szReqStatus == "1007" ) { //아웃바운드작업
					set_status_Underoutbound();
				} else if (szReqStatus == "1050" ) { //벨울리는중
					set_status_Ringing();
				} else if (szReqStatus == "1052" ) { //통화중
					set_status_Nowcalling();
				} else if (szReqStatus == "1066" ) { //수화기 듬(OFF HOOK)
					set_status_Offhook();
				} else if (szReqStatus == "1069" ) { //후처리중
					set_status_Afterwork();
				} else if (szReqStatus == "1100" ) { //업무준비중 (미사용)
					set_status_Preparation();
				} else if (szReqStatus == "1999" ) { //상담원 배정 (미사용)
					set_status_Assignment();
				}

			} else if (szMsgType == "0004" ) { //전화걸기

				action_status_Makecall();
				//해당 함수내 MakeCall 함수 사용 추천

			} else if (szMsgType == "0009" ) { //호전환

				if (szReqStatus2 == "00" ) { //호전환시도
					action_status_Consult();
					
				} else if (szReqStatus2 == "10" ) { //호전환완료
					action_status_Consultcomplete();
				} else if (szReqStatus2 == "20" ) { //호전환취소
					action_status_Consultcancel();
				}


			} else if (szMsgType == "2001" ) {

				if (szReqStatus == "0020" ) { //수화기 듬 (OFF HOOK)
					action_status_Offhook();
				} else if (szReqStatus == "0021" ) { //수화기 놓음 (ON HOOK)
					action_status_Onhook();
				} else if (szReqStatus == "0002" ) { //통화 연결됨
					action_status_Callconnected();
				}

			} else if (szMsgType == "0050" || szMsgType == "1050" ) {
				var szCid = eventData.substring(92,122);
				var replaced_szCid = szCid.trim();

				var szDnis = eventData.substring(168,184);
				var replaced_szDnis = szDnis.trim();
				action_status_Incomingcall(replaced_szCid, replaced_szDnis);
				/*인바운드 콜 인입시 action_status_Incomingcall 함수 호출하면서 내부 변수에
				내부 변수 데이터저장. 이후 전화받기 와 연계해 Answer 함수에 데이터전달 추천*/
				
				//var szService2 = eventData.substring(184,200);
				//var replaced_szService2 = szService2.trim();				
				//action_status_Incomingcall(replaced_szCid, replaced_szDnis, replaced_szService2);

			}

			else if (szMsgType == "0005") {
				//GENEX,ubigen 버전별 전화받기.처리 불필요.
			}

			else if (szMsgType == "0007") {
				//보류하기 관련 이벤트. 해당 이벤트는 통화중에서만 작동되게 UI를 자체구현.
				if (szReqStatus2 == "00" ) { //보류해제
					//action_status_HoldOff();
					
				} else if (szReqStatus2 == "01" ) { //보류하기
					//action_status_HoldOff();
					
				}			
			}

			else {

				action_status_DisplayOn(eventData);

			}
		}
	};

	// 웹소켓 연결을 끊을 때 UI 페이지에서 로그아웃 함수 실행하여 버튼 상태값 변경
	ws.onclose = function()
	{

		CtiLogout();

	};

	// 웹소켓 에러 발생시 AliveCheck 함수를 실행
	ws.onerror = function()
	{
		//AliveCheck();
	};


}

// 클라이언트 - 서버 간 웹소켓 연결 유지 확인
function AliveCheck(){
	if(ws.readyState === WebSocket.CLOSED  || ws.readyState != 1)
	{
		//연결이 끊겼을 경우 CTI 웹 페이지에서 생성한 함수 호출 (ex: 경고창 등)
		set_Alarm_Disconnect();
	}
}

// AliveCheck 주기는 10초로 설정
var alichk = setInterval(AliveCheck,10000);

// 로그아웃
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호, 세션아이디
function LogOut(arg1,arg2,arg3)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");
	var ssid = arg3;

	var wsMessage = "1000"+"0307"+"0002"+CtiID+""+AgtIntel+""+"0000"+"00000032"+ssid+"";
	ws.send(wsMessage);
	clearInterval(alichk);
	ws.close();


}

// 전화걸기 (발신 대표번호가 여러개 일 경우 다이얼코드로 구분)
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호, 발신할 고객 전화번호, 다이얼코드
function MakeCall(arg1,arg2,arg3,arg4)
{
	var dialcode="";

	//발신용 대표번호
	if (arg4 != "")
		dialcode = arg4;
	else
		dialcode = "9";

	var telNum = dialcode+""+arg3;

	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");
	var szTelNum = rpad(telNum,30," ");

	var wsMessage = "1000"+"0307"+"0004"+CtiID+""+AgtIntel+""+"0000"+"00000032"+"02"+szTelNum;
	ws.send(wsMessage);
}

// 전화걸기 (발신 대표번호가 한개 일 경우)
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호, 발신할 고객 전화번호
function MakeCall_noDialcode(arg1,arg2,arg3)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");
	var szTelNum = rpad(arg3,30," ");

	var wsMessage = "1000"+"0307"+"0004"+CtiID+""+AgtIntel+""+"0000"+"00000032"+"02"+szTelNum;
	ws.send(wsMessage);
}

// 전화받기
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Answer(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0005"+CtiID+""+AgtIntel+""+"0000"+"00000000";
	ws.send(wsMessage);
}

// 전화끊기
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function CallDisconnect(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0006"+CtiID+""+AgtIntel+""+"0000"+"00000000";
	ws.send(wsMessage);
}

// 호전환시도
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호, 호전환 받을 상담원 내선번호
function Consult(arg1,arg2,arg3)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");
	var szTelNum = rpad(arg3,30," ");
	var szComment = rpad("",128, " ");

	var wsMessage = "1000"+"0307"+"0009"+CtiID+""+AgtIntel+""+"0000"+"00000162"+"00"+"02"+szTelNum+""+szComment;
	ws.send(wsMessage);
}

// 호전환취소
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Reconnect(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0009"+CtiID+""+AgtIntel+""+"0000"+"00000002"+"20";
	ws.send(wsMessage);
}

// 호전환완료
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Transfer(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0009"+CtiID+""+AgtIntel+""+"0000"+"00000002"+"10";
	ws.send(wsMessage);
}

// 휴식하기
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Breakon(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0003"+CtiID+""+AgtIntel+""+"0000"+"00000004"+"1001";
	ws.send(wsMessage);
}

// 업무대기
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Idle(arg1,arg2)
{

	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0003"+CtiID+""+AgtIntel+""+"0000"+"00000004"+"0000";
	ws.send(wsMessage);
}

// 점심식사
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Lunch(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0003"+CtiID+""+AgtIntel+""+"0000"+"00000004"+"1002";
	ws.send(wsMessage);
}

// 교육하기
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Education(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0003"+CtiID+""+AgtIntel+""+"0000"+"00000004"+"1003";
	ws.send(wsMessage);
}

// 서류업무
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호
function Paperwork(arg1,arg2)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");

	var wsMessage = "1000"+"0307"+"0003"+CtiID+""+AgtIntel+""+"0000"+"00000004"+"1005";
	ws.send(wsMessage);
}

// 자동로그아웃
// 매개변수: UI에서 넘어온 CTI아이디, 내선번호, 세션아이디
function AutoLogOut(arg1,arg2,arg3)
{
	var CtiID = rpad(arg1,20," ");
	var AgtIntel = rpad(arg2,16," ");
	var ssid = arg3;

	var wsMessage = "1000"+"0307"+"0002"+CtiID+""+AgtIntel+""+"0000"+"00000032"+ssid;
	ws.send(wsMessage);
	ws.close();
}


