<?php
// DB 정보
define('db_host', 'localhost');
define('db_username', 'changon');
define('db_name', 'postgres');
define('db_password', '9154');
define('db_type', 'pgsql');
define('dsn', db_type.':host='.db_host.' dbname='.db_name.' user='.db_username.' password='.db_password);

// 파일 디렉토리
define('config_dir', __DIR__);
define('class_dir', config_dir.'/class/');

// 클래스 파일 불러오기
require_once class_dir.'dbConClass.php'; // DB 연결 클래스
require_once class_dir.'userClass.php';
require_once class_dir.'customerClass.php';
require_once class_dir.'consultClass.php';
?>