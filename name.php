<?php
    $admin = false;
    session_start();
    if (!isset($_SESSION["admin"]) || $_SESSION["admin"] === false) {
        $_SESSION["admin"] = false;
        die("无口令，无权访问");
    }
?>

<html>
<head>
    <title>好名字</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" 
    crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" 
    integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" 
    crossorigin="anonymous">

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="new_request.js"></script>
    <script src="remove_char.js"></script>
    <script src="save_name.js"></script>
</head>
<body>
    <div class="container"><h2>好名字</h2></div>
    <div class="container">
        <form class="form-inline">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-addon">姓氏：</div>
                    <input type="text" id="SurName" class="form-control" 
                    placeholder="请输入姓氏"/>
                </div>
            </div>
            <div class="form-group">
                <input id="submit" onclick="submit_func()" class="btn btn-primary" 
                    type="button" value="提交"/>
            </div>
        </form>
    </div>
    <div class="container">
        <table class="table">
            <tr class="info">
                <td width="10%"><input id="save" onclick="save_name()" 
                    type="button" value="保存" class="btn btn-success"/></td>
                <td width="30%">随机姓名：</td>
                <td width="60%"><span id="retName"></span></td>
            </tr>
        </table>
    </div>
    <div class="container">
        <table class="table table-bordered">
            <tr>
                <td width="10%"></td>
                <td width="10%" class="success">名字</td>
                <td width="10%">笔划</td>
                <td width="10%">属性</td>
                <td width="60%">解读</td>
            </tr>
            <tr>
                <td width="10%"><input id="rm1" onclick="remove1()" 
                    type="button" value="删除" class="btn btn-danger"/></td>
                <td width="10%" class="success"><span id="char1"></span></td>
                <td width="10%"><span id="num1"></span></td>
                <td width="10%"><span id="attr1"></span></td>
                <td width="60%" style="font-size: 80%"><span id="ref1"></span></td>
            </tr>
            <tr>
                <td width="10%"><input id="rm2" onclick="remove2()" 
                    type="button" value="删除" class="btn btn-danger"/></td>
                <td width="10%" class="success"><span id="char2"></span></td>
                <td width="10%"><span id="num2"></span></td>
                <td width="10%"><span id="attr2"></span></td>
                <td width="60%" style="font-size: 80%"><span id="ref2"></span></td>
            </tr>
        </table>
    </div>

    <script>
        function submit_func() {
            document.getElementById("rm1").onclick = function() {remove1();};
            document.getElementById("rm1").value = '删除';
            document.getElementById("rm2").onclick = function() {remove2();};
            document.getElementById("rm2").value = '删除';
            document.getElementById("save").onclick = function() { save_name(); };
            document.getElementById("save").value = '保存';
            var c1 = "";
            var c2 = "";
            var fullName = "";
            var raw = "";
            new_request();
        }
    </script>

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" 
    integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" 
    crossorigin="anonymous"></script>
</body>
</html>