<?php
class consultClass extends dbConClass {
    // 상담기록 등록
    public function addConsultRecord($customerCID, $consultDate, $consultantName, $consultRoot, $categoryLarge, $categoryMedium, $consultResult, $consultContent) {
        try {
            $this->db->beginTransaction();
            $sql = "INSERT INTO consulting(consulting_date, consulting_rep_name, consulting_root, category_large, category_medium, consulting_result, consulting_content, customer_cid)
                    VALUES(:consultDate, :consultantName, :consultRoot, :categoryLarge, :categoryMedium, :consultResult, :consultContent, :customerCID)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':customerCID', $customerCID, PDO::PARAM_STR);
            $stmt->bindValue(':consultDate', $consultDate, PDO::PARAM_STR);
            $stmt->bindValue(':consultantName', $consultantName, PDO::PARAM_STR);
            $stmt->bindValue(':consultRoot', $consultRoot, PDO::PARAM_STR);
            $stmt->bindValue(':categoryLarge', $categoryLarge, PDO::PARAM_STR);
            $stmt->bindValue(':categoryMedium', $categoryMedium, PDO::PARAM_STR);
            $stmt->bindValue(':consultResult', $consultResult, PDO::PARAM_STR);
            $stmt->bindValue(':consultContent', $consultContent, PDO::PARAM_STR);
            $result = $stmt->execute();
            $this->db->commit();
        } catch (PDOException $e) {
            $this->db->rollback();
            echo "에러 : ".$e->getMessage();
        }
        // 등록 확인
        if ($result) {
            $stmt = $this->db->prepare("SELECT * FROM consulting WHERE customer_cid = :customerCID");
            $stmt->bindValue(':customerCID', $customerCID, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }
}

?>