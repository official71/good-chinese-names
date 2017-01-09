<?php
    header("Content-Type: text/html; charset=utf-8");
    include_once "inc/constants.inc.php";

    try {
        $auth_dsn = "mysql:host=".DB_HOST.";dbname=".AUTH_DB_NAME.";charset=".DB_CHARSET;
        $auth_db = new PDO($auth_dsn, AUTH_DB_USER, AUTH_DB_PASS);
    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
        exit;
    }

    $code = $_POST['NameCode'];
    if (empty($code)) {
        die("空白口令");
    }

    $sql = "SELECT * FROM ".AUTH_TBL." WHERE Password='$code'";
    $succ = 0;
    if($stmt = $auth_db->prepare($sql)) {
        $stmt->execute();
        $row = $stmt->fetch();
        if(!empty($row)) {
            session_start();
            $_SESSION['admin'] = true;
            $succ = 1;
        }
    }

    if($succ === 0) {
        die("错误口令");
    }

    echo '正确口令';
    header('Location: name.php');
?>