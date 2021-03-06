<?php
function spec_query($db, $limit, $offset, $only) {
    $ret = "";
    if ($only == 0) {
        $sql = "SELECT * FROM ".CHAR_TBL." WHERE Banned=0 LIMIT $limit OFFSET $offset;";
    } else {
        $sql = "SELECT * FROM ".CHAR_TBL." WHERE Banned=0 AND Liked=1 LIMIT $limit OFFSET $offset;";
    }
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
        while ($row = $stmt->fetch()) {
            $fort = $row['Fortune'];
            $charid = $row['CharID'];
            $num = $row['Num'];
            $self = $row['Self'];
            $attr = $row['Attr'];
            $ref = $row['Ref'];
            $ret = $ret.$charid.' '.$num.' '.$self.' '.$attr.' '.$ref.' '.$fort.'|';
        }        
    }
    return $ret;
}

function count_query($db, $only) {
    $ret = "";
    if ($only == 0) {
        $sql = "SELECT COUNT(*) FROM ".CHAR_TBL." WHERE Banned=0;";
    } else {
        $sql = "SELECT COUNT(*) FROM ".CHAR_TBL." WHERE Banned=0 AND Liked=1;";
    }
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
        $ret = $stmt->fetch()[0];
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

$limit = $_REQUEST["lmt"];
$offset = $_REQUEST["ofs"];
$count = $_REQUEST["count"];
$only = $_REQUEST["only"];

if (empty($only)) {
    $only = 0;
}

if (empty($count)) {
    if (empty($limit)) {
        $limit = 10;
    }
    if (empty($offset)) {
        $offset = 0;
    }

    $str = spec_query($db, $limit, $offset, $only);
} else {
    $str = count_query($db, $only);
}
echo $str;
?>