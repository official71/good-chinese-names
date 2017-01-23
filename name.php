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
    <link rel="stylesheet" href="main.css">

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="new_request.js"></script>
    <script src="remove_char.js"></script>
    <script src="like_char.js"></script>
    <script src="save_name.js"></script>
</head>
<body>
    <div class="container"><h2>好名字</h2></div>
    <div class="container">
        <div class="row toffset3">
            <div class="col-md-2">
                <a href="show_char.html" class="btn btn-info">管理字库</a>
            </div>
            <div class="col-md-2">
                <a href="show_name.html" class="btn btn-info">保存的姓名</a>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row toffset3 boffset3">
            <div class="col-md-1">
                <input id="submit" onclick="submit_func()" class="btn btn-primary" 
                    type="button" value="提交"/>
            </div>
            <div class="col-md-2">
                <input type="text" id="SurName" class="form-control" 
                    placeholder="姓氏"/>
            </div>
            <div class="col-md-2">
                <input type="text" id="Name1" class="form-control" 
                    placeholder="名字一"/>
            </div>
            <div class="col-md-2">
                <input type="text" id="Name2" class="form-control" 
                    placeholder="名字二"/>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
            <div class="col-md-1"></div>
        </div>
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
        <table class="table">
            <tr class="info">
                <td width="10%"><input id="save_r" onclick="save_name_r()" 
                    type="button" value="保存" class="btn btn-success"/></td>
                <td width="30%">随机姓名：</td>
                <td width="60%"><span id="retName_r"></span></td>
            </tr>
        </table>
    </div>
    <div class="container">
        <table class="table table-bordered">
            <tr>
                <th width="5%"></th>
                <th width="5%"></th>
                <th width="10%" class="success">文字</th>
                <th width="10%">占吉</th>
                <th width="10%">属行</th>
                <th width="50%">解读</th>
                <th width="10%">笔划</th>
            </tr>
            <tr>
                <td width="5%"><input id="rm1" onclick="remove1()" 
                    type="button" value="删除" class="btn btn-danger"/></td>
                <td width="5%"><input id="up1" onclick="like1()" 
                    type="button" value="喜欢" class="btn btn-success"/></td>
                <td width="10%" class="success"><span id="char1"></span></td>
                <td width="10%"><span id="fort1"></span></td>
                <td width="10%"><span id="attr1"></span></td>
                <td width="50%" style="font-size: 80%"><span id="ref1"></span></td>
                <td width="10%"><span id="num1"></span></td>
            </tr>
            <tr>
                <td width="5%"><input id="rm2" onclick="remove2()" 
                    type="button" value="删除" class="btn btn-danger"/></td>
                <td width="5%"><input id="up2" onclick="like2()" 
                    type="button" value="喜欢" class="btn btn-success"/></td>
                <td width="10%" class="success"><span id="char2"></span></td>
                <td width="10%"><span id="fort2"></span></td>
                <td width="10%"><span id="attr2"></span></td>
                <td width="50%" style="font-size: 80%"><span id="ref2"></span></td>
                <td width="10%"><span id="num2"></span></td>
            </tr>
        </table>
    </div>

    <script>
        function submit_func() {
            document.getElementById("rm1").onclick = function() {remove1();};
            document.getElementById("rm1").value = '删除';
            document.getElementById("rm1").className = "btn btn-danger";
            document.getElementById("rm2").onclick = function() {remove2();};
            document.getElementById("rm2").value = '删除';
            document.getElementById("rm2").className = "btn btn-danger";
            document.getElementById("up1").onclick = function() {like1();};
            document.getElementById("up1").value = '喜欢';
            document.getElementById("up1").className = "btn btn-success";
            document.getElementById("up2").onclick = function() {like2();};
            document.getElementById("up2").value = '喜欢';
            document.getElementById("up2").className = "btn btn-success";
            document.getElementById("save").onclick = function() { save_name(); };
            document.getElementById("save").value = '保存';
            document.getElementById("save").className = "btn btn-success";
            document.getElementById("save_r").onclick = function() { save_name_r(); };
            document.getElementById("save_r").value = '保存';
            document.getElementById("save_r").className = "btn btn-success";
            var c1 = "";
            var c2 = "";
            var fullName = "";
            var raw = "";
            var fullName_r = "";
            var raw_r = "";
            new_request();
        }
    </script>

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" 
    integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" 
    crossorigin="anonymous"></script>
</body>
</html>