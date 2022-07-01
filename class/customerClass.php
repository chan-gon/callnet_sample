<?php
class customerClass extends dbConClass {
    // 고객정보 등록
    public function addCustomerInfo($customerNum, $customerId, $customerName, $customerGrade, $customerGradeDate, $customerTel, $customerPhone, $customerEmailAddr, $customerAddr) {
        try {
            $this->db->beginTransaction();
            $sql = "INSERT INTO customer(customer_num, customer_id, customer_name, customer_tel, customer_phone, customer_email, customer_address, customer_grade, customer_grade_date)
                    VALUES(:customerNum, :customerId, :customerName, :customerTel, :customerPhone, :customerEmailAddr, :customerAddr, :customerGrade, current_timestamp)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':customerNum', $customerNum, PDO::PARAM_STR);
            $stmt->bindValue(':customerId', $customerId, PDO::PARAM_STR);
            $stmt->bindValue(':customerName', $customerName, PDO::PARAM_STR);
            $stmt->bindValue(':customerGrade', $customerGrade, PDO::PARAM_STR);
            //$stmt->bindValue(':customerGradeDate', date("Y-m-d H:i:s", strtotime($customerGradeDate)), PDO::PARAM_STR);
            $stmt->bindValue(':customerTel', $customerTel, PDO::PARAM_STR);
            $stmt->bindValue(':customerPhone', $customerPhone, PDO::PARAM_STR);
            $stmt->bindValue(':customerEmailAddr', $customerEmailAddr, PDO::PARAM_STR);
            $stmt->bindValue(':customerAddr', $customerAddr, PDO::PARAM_STR);
            $result = $stmt->execute();
            $this->db->commit();
        } catch (PDOException $e) {
            $this->db->rollBack();
            echo "에러 : ".$e->getMessage();
        }
        // 등록 확인
        if ($result) {
            $stmt = $this->db->prepare("SELECT * FROM customer WHERE customer_num = :customerNum");
            $stmt->bindValue(':customerNum', $customerNum, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return false;
        }
    }
}
?>