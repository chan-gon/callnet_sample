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
}
?>