<?php
class userClass extends dbConClass {
    // 아이디 중복 확인
    public function isUserExisted($memberId) {
        $stmt = $this->db->prepare("SELECT member_id FROM member WHERE member_id = :memberId");
        $stmt->bindValue(':memberId', $memberId, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    // 회원가입
    public function signUpUser($memberNum, $memberId, $memberPwd, $memberName, $memberGrade) {
        $encrypted_pwd = password_hash($memberPwd, PASSWORD_DEFAULT);
        $currentNumOfUser = $this->getNumOfUser();
        $num = $currentNumOfUser+1;
        $agtid = '0100000'.$num;
        try {
            /*
             * 자동 커밋 모드 해제하여 PDO::commit()을 호출하여 트랜잭션을 종료할 때까지
             * PDO 개체 인스턴스를 통해 DB 변경 내용이 커밋되지 않도록 설정
             *  */
            $this->db->beginTransaction();
            $sql = "INSERT INTO member(member_num, member_id, member_pwd, member_name, member_grade, agtid)
                    VALUES(:memberNum, :memberId, :memberPwd, :memberName, :memberGrade, :agtid)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':memberNum', $memberNum, PDO::PARAM_STR);
            $stmt->bindValue(':memberId', $memberId, PDO::PARAM_STR);
            $stmt->bindValue(':memberPwd', $encrypted_pwd, PDO::PARAM_STR);
            $stmt->bindValue(':memberName', $memberName, PDO::PARAM_STR);
            $stmt->bindValue(':memberGrade', $memberGrade, PDO::PARAM_STR);
            $stmt->bindValue(':agtid', $agtid, PDO::PARAM_STR);
            $result = $stmt->execute();
            $this->db->commit();
        } catch (PDOException $e) {
            $this->db->rollBack();
            echo "에러 : ".$e->getMessage();
        }
        // 제대로 저장 되었는지 확인
        if ($result) {
            $stmt = $this->db->prepare("SELECT * FROM member WHERE member_id = :memberId");
            $stmt->bindValue(':memberId', $memberId, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }

    // 로그인 체크
    public function getUser($memberId, $memberPwd) {
        $sql = "SELECT * FROM member WHERE member_id = :memberId";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':memberId', $memberId);
        $stmt->execute();

        if ($member=$stmt->fetch()) {
            $encrypted_pwd = $member['member_pwd'];
            if (password_verify($memberPwd, $encrypted_pwd)) {
                return $member;
            } else {
                return NULL;
            }
        }
    }

    // 멤버 숫자
    public function getNumOfUser() {
        $sql = "SELECT COUNT(*) FROM member";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchColumn();
    }

}
?>