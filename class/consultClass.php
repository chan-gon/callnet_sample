<?php
class consultClass extends dbConClass {
    // 상담기록 등록
    public function addConsultRecord($customerCID, $customerNum, $consultDate, $consultantName, $consultRoot, $categoryLarge, $categoryMedium, $consultResult, $consultContent) {
        try {
            $this->db->beginTransaction();
            $sql = "INSERT INTO consulting(consulting_date, consulting_rep_name, consulting_root, category_large, category_medium, consulting_result, consulting_content, customer_cid, customer_num)
                    VALUES(:consultDate, :consultantName, :consultRoot, :categoryLarge, :categoryMedium, :consultResult, :consultContent, :customerCID, :customerNum)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':customerCID', $customerCID, PDO::PARAM_STR);
            $stmt->bindValue(':customerNum', $customerNum, PDO::PARAM_STR);
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

    public function getConsultHistory($consultDateFrom, $consultDateTo, $customerCID, $customerName, $consultRoot, $categoryLarge, $categoryMedium, $consultResult) {
        $conditions = [];
        $sql = "SELECT b.consulting_root, a.customer_name, b.customer_cid, a.customer_phone, b.consulting_date, b.category_large, b.category_medium, b.consulting_result, b.consulting_rep_name
                FROM customer a JOIN consulting b ON a.customer_num = b.customer_num";
            if (!empty($consultDateFrom) && !empty($consultDateTo)) {
                $conditions[] = "b.consulting_date BETWEEN".$consultDateFrom."TO".$consultDateTo;
            }
            if ($conditions) {
                $sql."WHERE ".implode(" AND ", $conditions);
            }
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $consultHistory = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($stmt->rowCount() > 0) {
                return $consultHistory;
            } else {
                return NULL;
            }
    }
}
?>