<?php
/**
 * Timezone
 */
date_default_timezone_set('Asia/Seoul');

/**
 * Database Connection(PostgreSQL)
 */
// $GLOBALS is a PHP super global variable which is used to access global variables from anywhere in the PHP script (also from within functions or methods).
$GLOBALS['DB_CONNECTION'] = pg_connect("host=localhost dbname=postgres user=changon password=9154");
    //or die("Can't connect to database".pg_last_error());

if (!$GLOBALS['DB_CONNECTION']) {
    exit;
}
register_shutdown_function(function () {
   if (array_key_exists('DB_CONNECTION', $GLOBALS) && $GLOBALS['DB_CONNECTION']) {
       pg_close($GLOBALS['DB_CONNECTION']);
   }
});

?>