function save_name() {
    var btn = document.getElementById("save");
    btn.onclick = function() { unsave(); };
    btn.value = "撤销";
    btn.className = "btn btn-warning";

    var dataStr = 'fullname=' + fullName + '&rawtext=' + raw + '&save=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}

function unsave() {
    var btn = document.getElementById("save");
    btn.onclick = function() { save_name(); };
    btn.value = "保存";
    btn.className = "btn btn-success";

    var dataStr = 'fullname=' + fullName + '&rawtext=' + raw + '&save=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}

function save_name_r() {
    var btn = document.getElementById("save_r");
    btn.onclick = function() { unsave_r(); };
    btn.value = "撤销";
    btn.className = "btn btn-warning";

    var dataStr = 'fullname=' + fullName_r + '&rawtext=' + raw_r + '&save=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}

function unsave_r() {
    var btn = document.getElementById("save_r");
    btn.onclick = function() { save_name_r(); };
    btn.value = "保存";
    btn.className = "btn btn-success";

    var dataStr = 'fullname=' + fullName_r + '&rawtext=' + raw_r + '&save=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}