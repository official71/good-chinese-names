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
    btn.value = 'Undo';
}

function remove2() {
    remove(c2[0]);

    var btn = document.getElementById("rm2");
    btn.onclick = function() { restore2(); };
    btn.value = 'Undo';
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
    btn.value = 'Dislike';
}

function restore2() {
    restore(c2[0]);

    var btn = document.getElementById("rm2");
    btn.onclick = function() { remove2(); };
    btn.value = 'Dislike';
}