function save_name() {
    var btn = document.getElementById("save");
    btn.onclick = function() { unsave(); };
    btn.value = "取消";

    var dataStr = 'fullname=' + fullName + '&rawtext=' + raw + '&save=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}

function unsave() {
    var btn = document.getElementById("save");
    btn.onclick = function() { save_name(); };
    btn.value = "保存";

    var dataStr = 'fullname=' + fullName + '&rawtext=' + raw + '&save=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}