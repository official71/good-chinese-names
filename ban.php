<?php
function ban_char($db, $charid, $ban) {
    $sql = "UPDATE name_char SET Banned=".$ban." WHERE CharID=".$charid;
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
        //$row = $stmt->fetch();
    }
}

header("Content-Type: text/html; charset=utf-8");
include_once "inc/constants.inc.php";

try {
    $dsn = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=".DB_CHARSET;
    $db = new PDO($dsn, DB_USER, DB_PASS);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit;
}

$charid = $_REQUEST["charid"];
$ban = $_REQUEST["ban"];
ban_char($db, $charid, $ban);

?>