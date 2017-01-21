<?php
function rand_query($db) {
    $ret = "";
    $sql = "SELECT * FROM ".CHAR_TBL." WHERE Banned=0 ORDER BY RAND() LIMIT 1;";
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
        $row = $stmt->fetch();

        $fort = $row['Fortune'];
        $charid = $row['CharID'];
        $num = $row['Num'];
        $self = $row['Self'];
        $attr = $row['Attr'];
        $ref = $row['Ref'];
        //$encoding = mb_detect_encoding($str);
        //$str = mb_convert_encoding($str, "UTF-8", "auto");

        $ret = $charid.' '.$num.' '.$self.' '.$attr.' '.$ref.' '.$fort.'|';
    }
    return $ret;
}

function spec_query($db, $c) {
    $ret = "";
    $sql = "SELECT * FROM ".CHAR_TBL." WHERE Self='$c';";
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
        $row = $stmt->fetch();

        if (empty($row)) {
            $ret = '|';
        } else {
            $fort = $row['Fortune'];
            $charid = $row['CharID'];
            $num = $row['Num'];
            $self = $row['Self'];
            $attr = $row['Attr'];
            $ref = $row['Ref'];
            //$encoding = mb_detect_encoding($str);
            //$str = mb_convert_encoding($str, "UTF-8", "auto");

            $ret = $charid.' '.$num.' '.$self.' '.$attr.' '.$ref.' '.$fort.'|';
        }
    }

    if ($ret != '|') {
        return $ret;
    }

    $sql = "SELECT * FROM ".ALLCHAR_TBL." WHERE Self='$c';";
    if($stmt = $db->prepare($sql)) {
        $stmt->execute();
        $row = $stmt->fetch();

        if (empty($row)) {
            $ret = 'N/A N/A '.$c.' N/A N/A N/A|';
        } else {
            $fort = $row['Fortune'];
            $charid = $row['CharID'];
            $num = $row['Num'];
            $self = $row['Self'];
            $attr = $row['Attr'];
            $ref = $row['Ref'];
            //$encoding = mb_detect_encoding($str);
            //$str = mb_convert_encoding($str, "UTF-8", "auto");

            $ret = $charid.' '.$num.' '.$self.' '.$attr.' '.$ref.' '.$fort.'|';
        }
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
$n1 = $_REQUEST["n1"];
$n2 = $_REQUEST["n2"];
$str = "";
if (empty($n1)) {
    $str = $str . rand_query($db);
} else {
    $str = $str. spec_query($db, $n1);
}
if (empty($n2)) {
    $str = $str . rand_query($db);
} else {
    $str = $str. spec_query($db, $n2);
}
echo $str;
?>