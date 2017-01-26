nrQuery = 20;
nrPages = 0;
nrRows = 0;
currPage = -1;
currRow = 0;
fullStr = "";
fullList = "";

function get_index(button_id) {
    //assume the button id follows the format "xxx11",
    //i.e. exactly 3 letters plus the index number
    return button_id.slice(3);
}

function check_name(id) {
    var i = get_index(id);

    if (i == '') {
        console.log("Button ID: "+id+" <---> invalid index: "+i);
        return;
    }

    var lst = fullList[i].split('|');
    var c1 = lst[2].split(' ');
    var c2 = lst[3].split(' ');

    document.getElementById("charn1").innerHTML = c1[2];
    document.getElementById("numn1").innerHTML = c1[1];
    document.getElementById("attrn1").innerHTML = c1[3];
    document.getElementById("refn1").innerHTML = c1[4];
    document.getElementById("fortn1").innerHTML = c1[5];

    document.getElementById("charn2").innerHTML = c2[2];
    document.getElementById("numn2").innerHTML = c2[1];
    document.getElementById("attrn2").innerHTML = c2[3];
    document.getElementById("refn2").innerHTML = c2[4];
    document.getElementById("fortn2").innerHTML = c2[5];
}

function check_name_f(id) {
    console.log("Invalid check name for id: " + id);
}

function rm_name(id) {
    var i = get_index(id);

    if (i == '') {
        console.log("Button ID: "+id+" <---> invalid index: "+i);
        return;
    }

    var lst = fullList[i].split('|');
    var fullName = lst[1];
    var raw = lst[2] + '|' + lst[3];

    var btn = document.getElementById(id);
    btn.onclick = function() { resave_name(this.id); };
    btn.value = "取消";
    btn.className = "btn btn-warning";

    var dataStr = 'fullname=' + fullName + '&rawtext=' + raw + '&save=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}

function resave_name(id) {
    var i = get_index(id);

    if (i == '') {
        console.log("Button ID: "+id+" <---> invalid index: "+i);
        return;
    }

    var lst = fullList[i].split('|');
    var fullName = lst[1];
    var raw = lst[2] + '|' + lst[3];

    var btn = document.getElementById(id);
    btn.onclick = function() { rm_name(this.id); };
    btn.value = "移除";
    btn.className = "btn btn-danger";

    var dataStr = 'fullname=' + fullName + '&rawtext=' + raw + '&save=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "save.php?" + dataStr, true);
    xmlhttp.send();
}

function rm_name_f(id) {
    console.log("Invalid rm name for id: " + id);
}

function remove_char(id) {
    var charID = get_charId(id);

    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&ban=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "ban.php?" + dataStr, true);
    xmlhttp.send();

    var btn = document.getElementById(id);
    btn.onclick = function() { restore_char(this.id); };
    btn.value = '取消';
    btn.className = "btn btn-warning";
}

function restore_char(id) {
    var charID = get_charId(id);

    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&ban=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "ban.php?" + dataStr, true);
    xmlhttp.send();

    var btn = document.getElementById(id);
    btn.onclick = function() { remove_char(this.id); };
    btn.value = '删除';
    btn.className = "btn btn-danger";
}

function like_char(id) {
    var charID = get_charId(id);

    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&like=1';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "like.php?" + dataStr, true);
    xmlhttp.send();

    var btn = document.getElementById(id);
    btn.onclick = function() { undolike_char(this.id); };
    btn.value = '取消';
    btn.className = "btn btn-warning";
}

function undolike_char(id) {
    var charID = get_charId(id);

    if (charID == '') {
        return;
    }

    var dataStr = 'charid=' + charID + '&like=0';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "like.php?" + dataStr, true);
    xmlhttp.send();

    var btn = document.getElementById(id);
    btn.onclick = function() { like_char(this.id); };
    btn.value = '喜欢';
    btn.className = "btn btn-success";
}

function num_pages() {
    var dataStr = 'count=1';
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "get_names.php?" + dataStr, false);
    xmlhttp.send();
    var nrEntries = xmlhttp.responseText;
    nrPages = Math.floor(nrEntries / nrQuery) + 1;
}

function init_page() {
    var table = document.getElementById("nameTbl");
    var i = 0;
    while (i < nrQuery) {
        row = table.insertRow(-1);

        // index left
        cell = row.insertCell(0);
        t = document.createElement("span");
        t.innerHTML = i + 1;
        cell.appendChild(t);

        // check button left
        cell0 = row.insertCell(1);
        t0 = document.createElement("input");
        t0.id = "ckn" + i;
        //t0.onclick = function() {remove_char(this.id);};
        t0.type = "button";
        t0.value = "查看";
        t0.className = "btn btn-info";
        cell0.appendChild(t0);

        // like button left
        cell1 = row.insertCell(2);
        t1 = document.createElement("input");
        t1.id = "rmn" + i;
        //t1.onclick = function() {like_char(this.id);};
        t1.type = "button";
        t1.value = "移除";
        t1.className = "btn btn-danger";
        cell1.appendChild(t1);

        // name left
        cell2 = row.insertCell(3);
        t2 = document.createElement("span");
        t2.id = "name" + i;
        cell2.className = "success";
        cell2.appendChild(t2);

        i++;
        if (i >= nrQuery) {
            break;
        }
        cellb = row.insertCell(4);

        // index right
        cell3 = row.insertCell(5);
        t3 = document.createElement("span");
        t3.innerHTML = i + 1;
        cell3.appendChild(t3);

        // check button right
        cell4 = row.insertCell(6);
        t4 = document.createElement("input");
        t4.id = "ckn" + i;
        //t0.onclick = function() {remove_char(this.id);};
        t4.type = "button";
        t4.value = "查看";
        t4.className = "btn btn-info";
        cell4.appendChild(t4);

        // like button right
        cell5 = row.insertCell(7);
        t5 = document.createElement("input");
        t5.id = "rmn" + i;
        //t1.onclick = function() {like_char(this.id);};
        t5.type = "button";
        t5.value = "移除";
        t5.className = "btn btn-danger";
        cell5.appendChild(t5);

        // name right
        cell6 = row.insertCell(8);
        t6 = document.createElement("span");
        t6.id = "name" + i;
        cell6.className = "success";
        cell6.appendChild(t6);

        i++;
    }
}

function show_page() {
    document.getElementById("NpageNum").innerHTML = "页 "+(currPage+1)+"/"+nrPages;
    document.getElementById("NpageNum1").innerHTML = "页 "+(currPage+1)+"/"+nrPages;
    var limit = nrQuery;
    var offset = currPage * nrQuery;
    var dataStr = 'lmt=' + limit + '&ofs=' + offset;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            fullStr = this.responseText;
            fullList = fullStr.split('&');
            nrRows = fullList.length;

            for (currRow = 0; currRow < nrRows-1; currRow++) {
                c = fullList[currRow].split('|');
                if (c[0] == "") {
                    continue;
                }

                document.getElementById("name"+currRow).innerHTML = c[1];
                document.getElementById("ckn"+currRow).onclick = function() {check_name(this.id);};
                document.getElementById("rmn"+currRow).onclick = function() {rm_name(this.id);};
            }

            // clean up undefined fields
            for (i = currRow; i < nrQuery; i++) {
                document.getElementById("name"+i).innerHTML = "";
                document.getElementById("ckn"+i).onclick = function() {check_name_f(this.id);};
                document.getElementById("rmn"+i).onclick = function() {rm_name_f(this.id);};
            }
        }
    };
    xmlhttp.open("GET", "get_names.php?" + dataStr, true);
    xmlhttp.send();
}

function next_page() {
    currPage++;
    if (currPage < 0 || currPage >= nrPages) {
        console.log("currPage ["+currPage+"] exceeds limit: (0, "+nrPages+")");
        currPage--;
        return;
    }
    show_page();
}

function prev_page() {
    currPage--;
    if (currPage < 0 || currPage >= nrPages) {
        console.log("currPage ["+currPage+"] exceeds limit: (0, "+nrPages+")");
        currPage++;
        return;
    }
    show_page();
}

/* the following function (testing input string is a positive(>0) integer)
   is copied from T.J. Crowder's answer in StackOverflow:
   "http://stackoverflow.com/questions/10834796/
    validate-that-a-string-is-a-positive-integer"
 */
function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n > 0;
}

function goto_page() {
    var p = document.getElementById("gotoPg").value;
    if (isNormalInteger(p) != true) {
        console.log("Input ["+p+"] is not an integer");
        return;
    }
    if (p <= 0 || p > nrPages) {
        console.log("Input ["+p+"] exceeds limit: (1, "+nrPages+")");
        return;
    }

    currPage = p - 1;
    show_page();
}

function first_page() {
    currPage = 0;
    show_page();
}

function last_page() {
    currPage = nrPages - 1;
    show_page();
}
