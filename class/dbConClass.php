<?php
class dbConClass {
    protected $db;

    public function __construct() {
        $this->dbConnect();
    }

    public function dbConnect() {
        try {
            $this->db = new PDO(dsn);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        } catch (PDOException $e) {
            die("데이터베이스 연결 실패: ".$e->getMessage());
        }
    }
}
?>