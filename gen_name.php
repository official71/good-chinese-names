<?php
function rand_query($db) {
    $ret = "";
    $sql = "SELECT * FROM name_char WHERE Banned=0 ORDER BY RAND() LIMIT 1;";
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
        $row = $stmt->fetch();

        $charid = $row['CharID'];
        $num = $row['Num'];
        $self = $row['Self'];
        $attr = $row['Attr'];
        $ref = $row['Ref'];
        //$encoding = mb_detect_encoding($str);
        //$str = mb_convert_encoding($str, "UTF-8", "auto");

        $ret = $charid . ' ' . $num . ' ' . $self . ' ' . $attr . ' ' . $ref . '|';
    }
    return $ret;
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

$sur = $_REQUEST["surname"];
$str = "";
for ($i = 0; $i < 2; $i++) {
    $str = $str . rand_query($db);
}
echo $str;
?>