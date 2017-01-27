function remove(charID) {
    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&ban=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "ban.php?" + dataStr, true);
    xmlhttp.send();
}

function remove1() {
    remove(c1[0]);

    var btn = document.getElementById("rm1");
    btn.onclick = function() { restore1(); };
    btn.value = '撤销';
    btn.className = "btn btn-warning";
    document.getElementById("char1").style.color = "LightGray";
    document.getElementById("fort1").style.color = "LightGray";
    document.getElementById("attr1").style.color = "LightGray";
    document.getElementById("ref1").style.color = "LightGray";
    document.getElementById("num1").style.color = "LightGray";
}

function remove2() {
    remove(c2[0]);

    var btn = document.getElementById("rm2");
    btn.onclick = function() { restore2(); };
    btn.value = '撤销';
    btn.className = "btn btn-warning";
    document.getElementById("char2").style.color = "LightGray";
    document.getElementById("fort2").style.color = "LightGray";
    document.getElementById("attr2").style.color = "LightGray";
    document.getElementById("ref2").style.color = "LightGray";
    document.getElementById("num2").style.color = "LightGray";
}

function restore(charID) {
    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&ban=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "ban.php?" + dataStr, true);
    xmlhttp.send();
}

function restore1() {
    restore(c1[0]);

    var btn = document.getElementById("rm1");
    btn.onclick = function() { remove1(); };
    btn.value = '删除';
    btn.className = "btn btn-danger";
    document.getElementById("char1").style.color = "Black";
    document.getElementById("fort1").style.color = "Black";
    document.getElementById("attr1").style.color = "Black";
    document.getElementById("ref1").style.color = "Black";
    document.getElementById("num1").style.color = "Black";
}

function restore2() {
    restore(c2[0]);

    var btn = document.getElementById("rm2");
    btn.onclick = function() { remove2(); };
    btn.value = '删除';
    btn.className = "btn btn-danger";
    document.getElementById("char2").style.color = "Black";
    document.getElementById("fort2").style.color = "Black";
    document.getElementById("attr2").style.color = "Black";
    document.getElementById("ref2").style.color = "Black";
    document.getElementById("num2").style.color = "Black";
}