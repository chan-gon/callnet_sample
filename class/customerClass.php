<?php
class customerClass extends dbConClass {
    // 고객정보 등록
    public function addCustomerInfo($customerNum, $customerId, $customerName, $customerGrade, $customerTel, $customerPhone, $customerEmailAddr, $zonecode, $roadAddr, $jibunAddr, $specificAddr) {
        try {
            $this->db->beginTransaction();
            $sql = "INSERT INTO customer(customer_num, customer_id, customer_name, customer_tel, customer_phone, customer_email, customer_grade, customer_grade_date, zonecode, road_addr, jibun_addr, specific_addr)
                    VALUES(:customerNum, :customerId, :customerName, :customerTel, :customerPhone, :customerEmailAddr, :customerGrade, to_char(current_timestamp, 'YYYY-mm-dd'), :zonecode, :roadAddr, :jibunAddr, :specificAddr)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':customerNum', $customerNum, PDO::PARAM_STR);
            $stmt->bindValue(':customerId', $customerId, PDO::PARAM_STR);
            $stmt->bindValue(':customerName', $customerName, PDO::PARAM_STR);
            $stmt->bindValue(':customerGrade', $customerGrade, PDO::PARAM_STR);
            $stmt->bindValue(':customerTel', $customerTel, PDO::PARAM_STR);
            $stmt->bindValue(':customerPhone', $customerPhone, PDO::PARAM_STR);
            $stmt->bindValue(':customerEmailAddr', $customerEmailAddr, PDO::PARAM_STR);
            $stmt->bindValue(':zonecode', $zonecode, PDO::PARAM_STR);
            $stmt->bindValue(':roadAddr', $roadAddr, PDO::PARAM_STR);
            $stmt->bindValue(':jibunAddr', $jibunAddr, PDO::PARAM_STR);
            $stmt->bindValue(':specificAddr', $specificAddr, PDO::PARAM_STR);
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

    // 고객 번호 확인
    public function isCustomerNumExisted($customerNum) {
        $stmt = $this->db->prepare("SELECT * FROM customer WHERE customer_num = :customerNum");
        $stmt->bindValue(':customerNum', $customerNum, PDO::PARAM_STR);
        $stmt->execute();
        $customerInfo = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($stmt->rowCount() > 0) {
            return $customerInfo;
        } else {
            return NULL;
        }
    }
}
?>