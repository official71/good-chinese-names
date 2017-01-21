<?php
function like_char($db, $charid, $like) {
    $sql = "UPDATE ".CHAR_TBL." SET Liked=".$like." WHERE CharID=".$charid;
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
$like = $_REQUEST["like"];
like_char($db, $charid, $like);

?>