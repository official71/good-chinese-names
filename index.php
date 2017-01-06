<html>
<head>
    <title>好名字</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="new_request.js"></script>
    <script src="remove_char.js"></script>

</head>
<body>
    <h2>随机名字</h2>
    <form id="request_form" name="request_form">
        <table>
            <tr>
                <td>姓氏：</td>
                <td><input type="text" id="SurName"/></td>
                <td><input id="submit" onclick="submit_func()" 
                    type="button" value="提交"/></td>
            </tr>
        </table>
    </form>
    <p>随机姓名：<span id="retName"></span></p>
    <form id="result_form" name="result_form">
        <table>
            <tr>
                <td>名字</td>
                <td>笔划</td>
                <td>属性</td>
                <td>解读</td>
                <td></td>
            </tr>
            <tr>
                <td><span id="char1"></span></td>
                <td><span id="num1"></span></td>
                <td><span id="attr1"></span></td>
                <td><span id="ref1"></span></td>
                <td><input id="rm1" onclick="remove1()" 
                    type="button" value="Dislike"/></td>
            </tr>
            <tr>
                <td><span id="char2"></span></td>
                <td><span id="num2"></span></td>
                <td><span id="attr2"></span></td>
                <td><span id="ref2"></span></td>
                <td><input id="rm2" onclick="remove2()" 
                    type="button" value="Dislike"/></td>
            </tr>
        </table>
    </form>

    <script>
        function submit_func() {            
            document.getElementById("rm1").onclick = function() {remove1();};
            document.getElementById("rm1").value = 'Dislike';
            document.getElementById("rm2").onclick = function() {remove2();};
            document.getElementById("rm2").value = 'Dislike';
            new_request();
        }
    </script>
</body>
</html>