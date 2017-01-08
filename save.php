<?php
function save_name($db, $fullname, $rawtext) {
    $sql = "INSERT INTO saved (Fullname, Rawtext) VALUES ('".$fullname."','".$rawtext."');";
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
    }
}

function del_name($db, $fullname) {
    $sql = "DELETE FROM saved WHERE Fullname='".$fullname."';";
    echo $sql;
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
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

$fullname = $_REQUEST["fullname"];
$rawtext = $_REQUEST["rawtext"];
$save = $_REQUEST["save"];

if($save === "1") {
    save_name($db, $fullname, $rawtext);
} else {
    del_name($db, $fullname);
}

?>