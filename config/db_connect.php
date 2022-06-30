<?php

/*$pg_db_host = 'localhost';
$pg_db_username = 'changon';
$pg_db_name = 'postgres';
$pg_db_password = '9154';

try {
    $pdo = new PDO("pgsql:host=$pg_db_host dbname=$pg_db_name user=$pg_db_username password=$pg_db_password"); // PDO 객체 생성.
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}*/

class db_connect {
    private $pg_db_host = 'localhost';
    private $pg_db_username = 'changon';
    private $pg_db_name = 'postgres';
    private $pg_db_password = '9154';

    private $pdo = null;

    public function getPdo()  {
        return $this->pdo;
    }

    public function __construct() {
        try {
            $this->pdo = new PDO("pgsql:host=$this->pg_db_host dbname=$this->pg_db_name user=$this->pg_db_username password=$this->pg_db_password");
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}

?>