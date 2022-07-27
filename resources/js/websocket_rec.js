/* 전역 변수 선언 */
var ws_rec;	
var msg_rec;

String.prototype.byteLength = function() {
    var iLen= 0;
     
    for(var idx=0; idx < this.length; idx++) {
        var c = escape(this.charAt(idx));
         
        if( c.length==1 ) iLen++;
        else if( c.indexOf("%u")!=-1 ) iLen+= 2;
        else if( c.indexOf("%")!=-1 ) iLen+= c.length/3;
    }
     
    return iLen;
};

function getByteLength(s) {
	if(s != undefined && s != "") {
		for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
		return b;
	} else {
		return 0;
	}
}



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



/* 
SEND CUST DATA : rec-1001
녹취 종료시 녹취 데이터 업데이트.
*/
function doConnect_rec(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8)
{
	var addr = "ws://192.168.1.9:8534"; //WebSocket 접속 IP. Port는 고정 IP는 접속정보에 따라 변경필요.
	
	ws_rec = new WebSocket(addr);

	ws_rec.onopen = function() 
	{
		var AgtID = arg1; //상담원ID 16byte 제한
		var AgtName = arg2; //상담원이름 50byte 제한
		var AgtIntel = arg3; //상담원 내선번호 16byte 제한
		var telno = arg4; //고객전화번호 20byte제한
		var iogubun = arg5; //인콜,아웃콜 구분 3byte 제한
		var custnm = arg6; //고객,고객사이름 50byte 제한
		var cust_idx = arg7; // 고객IDX 20 byte 제한
		var call_no = arg8; // CALL ID 생성된 값 , 필요시 사용 25byte 제한

		var szMsgLen = "0249"; //데이터 BYTE 길이. 고정
		var szMsgVersion = "0307"; // 고정
		var szMsgType = "1001"; // 고정
		var szMsgLineNum = rpad(AgtIntel, 16, " ");
		var szCallID = rpad(call_no, 25, " "); 
		//var szCallID = rpad("", 25, " "); //CALL ID, 필요시 사용
		var szAgentId = rpad(AgtID, 20, " ");
		var szAgentName = rpad(AgtName,  AgtName.length-getByteLength(AgtName)+50, " "); // 한글 데이터 넘길시 Byte 깨지면 사용.Prototype 함수 최상단에 지정
		//var szAgentName = rpad(AgtName, 20, " ");
		var szInOut = rpad(iogubun, 3, " ");
		var szCustTelNum = rpad(telno, 20, " ");
		var Cid = rpad(telno, 20, " ");
		var CustId = rpad(cust_idx, 20, " ");
		var CustName = rpad(custnm, custnm.length-getByteLength(custnm)+50, " ");
		//var CustName = rpad(custnm,  custnm.length-custnm.byteLength()+50, " "); // 한글 데이터 넘길시 Byte 깨지면 사용.Prototype 함수 최상단에 지정
		var CustJumin = rpad("", 13, " "); //주민번호, 필요시 사용
		var count = "0000"; // 고정

		var wsMessage = szMsgLen+szMsgVersion+szMsgType+szMsgLineNum+szCallID+szAgentId+szAgentName+szInOut+szCustTelNum+Cid+CustId+CustName+CustJumin+count;
		ws_rec.send(wsMessage);
		//ws_rec.close();
	};
	
	ws_rec.onmessage = function (evt)
	{
		var eventData = evt.data;
		var evt_msgLen = eventData.substring(0,4);
		var evt_Version = eventData.substring(4,8);
		var evt_msgType = eventData.substring(8,12);
		var evt_msgRet = eventData.substring(12,16);
		
		/*
		Error-Message 처리
		WebSocket 응답메시지중 결과값 evt_msgRet 가 0000,0001 이 아닐 경우 정상 스텝이 아니거나 데이터가 누락될시 발생
		*/

		if (evt_msgRet != "0000" && evt_msgRet != "0001")
		{

			// 서버로 부터 받은 evt_msgRet 값에 따라 UI 페이지에서 구현된 경고메시지 표시 함수 실행
			// 오류관련 호출함수들, RET_NOT_MSTTYPE,RET_CHNOT_FIND 를 포함한 모든 함수는 자체 생성 혹은 처리가 필요.
			if(evt_msgRet == "0010")
			{
				RET_NOT_MSTTYPE();
				/* 
				잘못된 메시지 타입 : 케이스에 맞지않는 msgType이 전송될 시 발생
				=> 에러메시지 출력. 메뉴얼 참고및 케이스 이외 szMsgType 인지 체크
				*/
			} else if(evt_msgRet == "0011")
			{
				RET_CHNOT_FIND();
				/*
				내선 찾지 못함 : 녹취시 등록이 안되어 있는 내선정보로 이벤트 처리시 발생.
				=> 에러메시지 출력. 메뉴얼 참고 및 CTI+녹취 DB 내선관련 설정 테이블 정보확인.
				*/
			} else if(evt_msgRet == "1001")
			{
				RET_FILE_CREATE_FAIL();
				/*
				녹취 시작 실패 : 시스템에서 해당 내선번호의 전화기를 찾지 못한 상태에서 녹취시작시 발생.
				=> 에러메시지 출력. 전화기 연결상태 확인. 설정파일 내 전화기 설정확인.
				*/		
			} else if(evt_msgRet == "1002")
			{
				RET_NOT_RECORDING();
				/*
				녹취중 아님 : 녹취 자체가 시작되지 않은 상태에서 선택 녹취시작 이벤트가 올시 발생.
				=> 에러메시지 출력. 전화기 연결상태 확인. WebSocket 로그 확인
				*/
			} else if(evt_msgRet == "1003")
			{
				RET_SEL_RECORDING();
				/*
				이미 선택 녹취중 : 같은 CTI ID  내선번호로 선택녹취 이벤트 시작후 종료 이전에 선택녹취 시작시 발생.
				=> WebSocket 로그 확인. 선택녹취관련 이벤트 로그 확인.
				*/
			} else if(evt_msgRet == "2001")
			{
				RET_NOT_EXIST_FILE();
				/*
				기존 녹취 파일 없음 : 녹취종료 후 SendCustData 업데이트시 해당 녹취파일이 생성전에 이벤트 발생시 발생.
				=> WebSocket 로그 확인. 로그아웃 여부 확인 및 이미 로그인되어있는 상담원의 경우 Login-power 로 강제로그인 시도
				*/
			} else if(evt_msgRet == "2002")
			{
				RET_DB_IN_FAIL();
				/*
				DB 입력 실패 : 녹취 프로그램과 DB서버 간의 통신상태 혹은 저장시 문자열 인코딩 확인
				=> DB 연결 상태 확인. 녹취쪽 DB 설정 파일체크. 솔루션 재실행 필요.
				*/
			} else if(evt_msgRet == "2003")
			{
				RET_NOT_SEL_RECORDING();
				/*
				선택 녹취중 아님 : 선택 녹취 시작 이벤트 이후 종료 이벤트 전에 시작이벤트가 다시 올 경우 발생.
				=> WebSocket 로그 확인. 선택녹취관련 이벤트 로그 확인.
				*/
			} else if(evt_msgRet == "9999")
			{
				RET_ID_ERR_NOT_EXIST();
				/*
				기타 실패.
				=> 에러메시지 출력.
				*/ 
			} else {
				action_status_DisplayOn(eventData);
				/*
				그외 실패 : 분류된 에러가아닌 기타 모든 메시지 포함.
				=> 에러메시지 출력. Response가 온 eventData 그대로 로그 확인 및 메뉴얼 참조.
				*/
			}

		}
		else
		{
			//정상 처리
			//alert(eventData);
			action_status_DisplayOn("SendCustData완료");
		}
	};

	ws_rec.onclose = function() 
	{
		//연결 종료.
	};		
}

/* 
선택 녹취 시작 : rec-1002
기본 녹취외 추가 선택 녹취파일 생성, 파일별 300KB 생성.
Body 값에 생성될 파일명 필요. 이후 300KB 초과시 동일파일명 뒤에 Sequence 생성으로 자동구분.
** 동일파일 명으로 선택녹취 파일 생성시 자동 덮어쓰기.
*/
function doConnect_selrec(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9)
{
	/*
		WebSocket 접속 IP. Port는 고정 IP는 접속정보에 따라 변경필요.
		녹취 DB의 recording_env 테이블의 websock_port 컬럼의 값과 동일하게 설정.
	 */
	var addr = "ws://192.168.1.9:7301";

	ws_rec = new WebSocket(addr);

	ws_rec.onopen = function() 
	{
		var AgtID = arg1; //상담원ID 16byte 제한
		var AgtName = arg2; //상담원이름 50byte 제한
		var AgtIntel = arg3; //상담원 내선번호 16byte 제한
		var telno = arg4; //고객전화번호 20byte제한
		var iogubun = arg5; //인콜,아웃콜 구분 3byte 제한
		var custnm = arg6; //고객,고객사이름 50byte 제한
		var cust_idx = arg7; // 고객IDX 20 byte 제한
		var call_no = arg8; // CALL ID 생성값 , 필요시 사용


		//var szMsgLen = "0249";
		var szMsgLen = "0268"; //** 데이터 BYTE 길이. 생성될 파일명을 Body 값으로 앞에 0 + 219 + BODY 길이 만큼 더해 지정.
		var szMsgVersion = "0307"; // 고정
		var szMsgType = "1002"; // 고정
		var szMsgLineNum = rpad(AgtIntel, 16, " ");
		var szCallID = rpad(call_no, 25, " "); 
		//var szCallID = rpad("", 25, " "); //CALL ID, 필요시 사용
		var szAgentId = rpad(AgtID, 20, " ");
		var szAgentName = rpad(AgtName,  AgtName.length-getByteLength(AgtName)+50, " "); // 한글 데이터 넘길시 Byte 깨지면 사용.Prototype 함수 최상단에 지정
		//var szAgentName = rpad(AgtName, 50, " ");
		var szInOut = rpad(iogubun, 3, " ");
		var szCustTelNum = rpad(telno, 20, " ");
		var Cid = rpad(telno, 20, " ");
		var CustId = rpad(cust_idx, 20, " ");
		var CustName = rpad(custnm, custnm.length-getByteLength(custnm)+50, " ");
		//var CustName = rpad(custnm,  custnm.length-custnm.byteLength()+50, " "); // 한글 데이터 넘길시 Byte 깨지면 사용.Prototype 함수 최상단에 지정
		var CustJumin = rpad("", 13, " "); //주민번호, 필요시 사용
		var count = "0001"; //고정
		
		var body = arg9; // 선택녹취시 저장될 파일명, 확장자 .wav는 자동생성
		
		var wsMessage = szMsgLen+szMsgVersion+szMsgType+szMsgLineNum+szCallID+szAgentId+szAgentName+szInOut+szCustTelNum+Cid+CustId+CustName+CustJumin+count+body;
		ws_rec.send(wsMessage);
		//ws_rec.close();
	};
	
	ws_rec.onmessage = function (evt)
	{
		var eventData = evt.data;
		var evt_msgLen = eventData.substring(0,4);
		var evt_Version = eventData.substring(4,8);
		var evt_msgType = eventData.substring(8,12);
		var evt_msgRet = eventData.substring(12,16);
		//var evt_RecFileName = eventData.slice(-100); 선택녹취 파일명, 선택녹취 시작 이벤트에서 사용가능.
		
		/*
		Error-Message 처리
		WebSocket 응답메시지중 결과값 evt_msgRet 가 0000,0001 이 아닐 경우 정상 스텝이 아니거나 데이터가 누락될시 발생
		*/

		if (evt_msgRet != "0000" && evt_msgRet != "0001")
		{
			
			// 서버로 부터 받은 evt_msgRet 값에 따라 UI 페이지에서 구현된 경고메시지 표시 함수 실행
			// 오류관련 호출함수들, RET_NOT_MSTTYPE,RET_CHNOT_FIND 를 포함한 모든 함수는 자체 생성 혹은 처리가 필요.
			if(evt_msgRet == "0010")
			{
				RET_NOT_MSTTYPE();
				/* 
				잘못된 메시지 타입 : 케이스에 맞지않는 msgType이 전송될 시 발생
				=> 에러메시지 출력. 메뉴얼 참고및 케이스 이외 szMsgType 인지 체크
				*/
			} else if(evt_msgRet == "0011")
			{
				RET_CHNOT_FIND();
				/*
				내선 찾지 못함 : 녹취시 등록이 안되어 있는 내선정보로 이벤트 처리시 발생.
				=> 에러메시지 출력. 메뉴얼 참고 및 CTI+녹취 DB 내선관련 설정 테이블 정보확인.
				*/
			} else if(evt_msgRet == "1001")
			{
				RET_FILE_CREATE_FAIL();
				/*
				녹취 시작 실패 : 시스템에서 해당 내선번호의 전화기를 찾지 못한 상태에서 녹취시작시 발생.
				=> 에러메시지 출력. 전화기 연결상태 확인. 설정파일 내 전화기 설정확인.
				*/		
			} else if(evt_msgRet == "1002")
			{
				RET_NOT_RECORDING();
				/*
				녹취중 아님 : 녹취 자체가 시작되지 않은 상태에서 선택 녹취시작 이벤트가 올시 발생.
				=> 에러메시지 출력. 전화기 연결상태 확인. WebSocket 로그 확인
				*/
			} else if(evt_msgRet == "1003")
			{
				RET_SEL_RECORDING();
				/*
				이미 선택 녹취중 : 같은 CTI ID  내선번호로 선택녹취 이벤트 시작후 종료 이전에 선택녹취 시작시 발생.
				=> WebSocket 로그 확인. 선택녹취관련 이벤트 로그 확인.
				*/
			} else if(evt_msgRet == "2001")
			{
				RET_NOT_EXIST_FILE();
				/*
				기존 녹취 파일 없음 : 녹취종료 후 SendCustData 업데이트시 해당 녹취파일이 생성전에 이벤트 발생시 발생.
				=> WebSocket 로그 확인. 로그아웃 여부 확인 및 이미 로그인되어있는 상담원의 경우 Login-power 로 강제로그인 시도
				*/
			} else if(evt_msgRet == "2002")
			{
				RET_DB_IN_FAIL();
				/*
				DB 입력 실패 : 녹취 프로그램과 DB서버 간의 통신상태 혹은 저장시 문자열 인코딩 확인
				=> DB 연결 상태 확인. 녹취쪽 DB 설정 파일체크. 솔루션 재실행 필요.
				*/
			} else if(evt_msgRet == "2003")
			{
				RET_NOT_SEL_RECORDING();
				/*
				선택 녹취중 아님 : 선택 녹취 시작 이벤트 이후 종료 이벤트 전에 시작이벤트가 다시 올 경우 발생.
				=> WebSocket 로그 확인. 선택녹취관련 이벤트 로그 확인.
				*/
			} else if(evt_msgRet == "9999")
			{
				RET_ID_ERR_NOT_EXIST();
				/*
				기타 실패.
				=> 에러메시지 출력.
				*/ 
			} else {
				action_status_DisplayOn(eventData);
				/*
				그외 실패 : 분류된 에러가아닌 기타 모든 메시지 포함.
				=> 에러메시지 출력. Response가 온 eventData 그대로 로그 확인 및 메뉴얼 참조.
				*/
			}

		}
		else
		{
			//정상 처리
			//alert(eventData);
			action_status_SelrecOn();
			//action_status_DisplayOn("선택녹취시작:"+eventData);
		}
	};

	ws_rec.onclose = function() 
	{
	
	};		
}


/*
선택 녹취 종료 : rec-1003
선택녹취 시작이후 선택녹취 종료.
상담원 내선번호를 Key 로 구분.
*/
function doConnect_selrecend(arg3)
{
	var addr = "ws://192.168.1.24:7301"; //WebSocket 접속 IP. Port는 고정 IP는 접속정보에 따라 변경필요.
	ws_rec = new WebSocket(addr);

	ws_rec.onopen = function() 
	{
		//var AgtID = arg1; //상담원ID 16byte 제한
		//var AgtName = arg2; //상담원이름 50byte 제한
		var AgtIntel = arg3; //상담원 내선번호 16byte 제한
		//var telno = arg4; //고객전화번호 20byte제한
		//var iogubun = arg5; //인콜,아웃콜 구분 3byte 제한
		//var custnm = arg6; //고객,고객사이름 50byte 제한
		//var cust_idx = arg7; // 고객IDX 20 byte 제한
		//var call_no = arg8; // CALL ID 생성값 , 필요시 사용

				
		var szMsgLen = "0024"; //데이터 BYTE 길이. 고정
		var szMsgVersion = "0307"; //고정
		var szMsgType = "1003"; //고정
		var szMsgLineNum = rpad(AgtIntel, 16, " ");
		//var szCallID = rpad(call_no, 25, " "); 
		//var szCallID = rpad("", 25, " "); //CALL ID, 필요시 사용
		//var szAgentId = rpad(AgtID, 20, " ");
		//var szAgentName = rpad(AgtName,  AgtName.length-AgtName.byteLength()+20, " "); // 한글 데이터 넘길시 Byte 깨지면 사용.Prototype 함수 최상단에 지정
		//var szAgentName = rpad(AgtName, 20, " ");
		//var szInOut = rpad(iogubun, 3, " ");
		//var szCustTelNum = rpad(telno, 20, " ");
		//var Cid = rpad(telno, 20, " ");
		//var CustId = rpad(cust_idx, 20, " ");
		//var CustName = rpad(custnm, 50, " ");
		//var CustName = rpad(custnm,  custnm.length-custnm.byteLength()+50, " "); // 한글 데이터 넘길시 Byte 깨지면 사용.Prototype 함수 최상단에 지정
		//var CustJumin = rpad("", 13, " "); //주민번호, 필요시 사용
		//var count = "0000"; // 고정
		
		//var wsMessage = szMsgLen+szMsgVersion+szMsgType+szMsgLineNum+szCallID+szAgentId+szAgentName+szInOut+szCustTelNum+Cid+CustId+CustName+CustJumin+count;
		var wsMessage = szMsgLen+szMsgVersion+szMsgType+szMsgLineNum;
		ws_rec.send(wsMessage);
		//ws_rec.close();
	};
	
	ws_rec.onmessage = function (evt)
	{
		var eventData = evt.data;
		var evt_msgLen = eventData.substring(0,4);
		var evt_Version = eventData.substring(4,8);
		var evt_msgType = eventData.substring(8,12);
		var evt_msgRet = eventData.substring(12,16);
		
		/*
		Error-Message 처리
		WebSocket 응답메시지중 결과값 evt_msgRet 가 0000,0001 이 아닐 경우 정상 스텝이 아니거나 데이터가 누락될시 발생
		*/

		if (evt_msgRet != "0000" && evt_msgRet != "0001")
		{

			// 서버로 부터 받은 evt_msgRet 값에 따라 UI 페이지에서 구현된 경고메시지 표시 함수 실행
			// 오류관련 호출함수들, RET_NOT_MSTTYPE,RET_CHNOT_FIND 를 포함한 모든 함수는 자체 생성 혹은 처리가 필요.
			if(evt_msgRet == "0010")
			{
				RET_NOT_MSTTYPE();
				/* 
				잘못된 메시지 타입 : 케이스에 맞지않는 msgType이 전송될 시 발생
				=> 에러메시지 출력. 메뉴얼 참고및 케이스 이외 szMsgType 인지 체크
				*/
			} else if(evt_msgRet == "0011")
			{
				RET_CHNOT_FIND();
				/*
				내선 찾지 못함 : 녹취시 등록이 안되어 있는 내선정보로 이벤트 처리시 발생.
				=> 에러메시지 출력. 메뉴얼 참고 및 CTI+녹취 DB 내선관련 설정 테이블 정보확인.
				*/
			} else if(evt_msgRet == "1001")
			{
				RET_FILE_CREATE_FAIL();
				/*
				녹취 시작 실패 : 시스템에서 해당 내선번호의 전화기를 찾지 못한 상태에서 녹취시작시 발생.
				=> 에러메시지 출력. 전화기 연결상태 확인. 설정파일 내 전화기 설정확인.
				*/		
			} else if(evt_msgRet == "1002")
			{
				RET_NOT_RECORDING();
				/*
				녹취중 아님 : 녹취 자체가 시작되지 않은 상태에서 선택 녹취시작 이벤트가 올시 발생.
				=> 에러메시지 출력. 전화기 연결상태 확인. WebSocket 로그 확인
				*/
			} else if(evt_msgRet == "1003")
			{
				RET_SEL_RECORDING();
				/*
				이미 선택 녹취중 : 같은 CTI ID  내선번호로 선택녹취 이벤트 시작후 종료 이전에 선택녹취 시작시 발생.
				=> WebSocket 로그 확인. 선택녹취관련 이벤트 로그 확인.
				*/
			} else if(evt_msgRet == "2001")
			{
				RET_NOT_EXIST_FILE();
				/*
				기존 녹취 파일 없음 : 녹취종료 후 SendCustData 업데이트시 해당 녹취파일이 생성전에 이벤트 발생시 발생.
				=> WebSocket 로그 확인. 로그아웃 여부 확인 및 이미 로그인되어있는 상담원의 경우 Login-power 로 강제로그인 시도
				*/
			} else if(evt_msgRet == "2002")
			{
				RET_DB_IN_FAIL();
				/*
				DB 입력 실패 : 녹취 프로그램과 DB서버 간의 통신상태 혹은 저장시 문자열 인코딩 확인
				=> DB 연결 상태 확인. 녹취쪽 DB 설정 파일체크. 솔루션 재실행 필요.
				*/
			} else if(evt_msgRet == "2003")
			{
				RET_NOT_SEL_RECORDING();
				/*
				선택 녹취중 아님 : 선택 녹취 시작 이벤트 이후 종료 이벤트 전에 시작이벤트가 다시 올 경우 발생.
				=> WebSocket 로그 확인. 선택녹취관련 이벤트 로그 확인.
				*/
			} else if(evt_msgRet == "9999")
			{
				RET_ID_ERR_NOT_EXIST();
				/*
				기타 실패.
				=> 에러메시지 출력.
				*/ 
			} else {
				action_status_DisplayOn(eventData);
				/*
				그외 실패 : 분류된 에러가아닌 기타 모든 메시지 포함.
				=> 에러메시지 출력. Response가 온 eventData 그대로 로그 확인 및 메뉴얼 참조.
				*/
			}

		}
		else
		{
			//정상 처리
			//action_status_DisplayOn("선택녹취종료");
			action_status_SelrecOff();
		}
	};
	
	ws_rec.onclose = function() 
	{
	
	};		
}
