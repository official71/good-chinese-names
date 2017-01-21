function like(charID) {
    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&like=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "like.php?" + dataStr, true);
    xmlhttp.send();
}

function like1() {
    like(c1[0]);

    var btn = document.getElementById("up1");
    btn.onclick = function() { undolike1(); };
    btn.value = '取消';
    btn.className = "btn btn-warning";
}

function like2() {
    like(c2[0]);

    var btn = document.getElementById("up2");
    btn.onclick = function() { undolike2(); };
    btn.value = '取消';
    btn.className = "btn btn-warning";
}

function undolike(charID) {
    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&like=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "like.php?" + dataStr, true);
    xmlhttp.send();
}

function undolike1() {
    undolike(c1[0]);

    var btn = document.getElementById("up1");
    btn.onclick = function() { like1(); };
    btn.value = '喜欢';
    btn.className = "btn btn-success";
}

function undolike2() {
    undolike(c2[0]);

    var btn = document.getElementById("up2");
    btn.onclick = function() { like2(); };
    btn.value = '喜欢';
    btn.className = "btn btn-success";
}