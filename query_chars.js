nrQuery = 50;
nrPages = 0;
nrRows = 0;
currPage = -1;
currRow = 0;
fullStr = "";
fullList = "";
likeOnlyFlag = 0;

function get_index(button_id) {
    //assume the button id follows the format "xxx11",
    //i.e. exactly 3 letters plus the index number
    return button_id.slice(3);
}

function get_charId(button_id) {
    return fullList[get_index(button_id)].split(' ')[0];
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
    btn.value = '撤销';
    btn.className = "btn btn-warning";

    var i = get_index(id);
    document.getElementById("charc"+i).style.color = "LightGray";
    document.getElementById("fortc"+i).style.color = "LightGray";
    document.getElementById("attrc"+i).style.color = "LightGray";
    document.getElementById("refc"+i).style.color = "LightGray";
    document.getElementById("numc"+i).style.color = "LightGray";
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

    var i = get_index(id);
    document.getElementById("charc"+i).style.color = "Black";
    document.getElementById("fortc"+i).style.color = "Black";
    document.getElementById("attrc"+i).style.color = "Black";
    document.getElementById("refc"+i).style.color = "Black";
    document.getElementById("numc"+i).style.color = "Black";
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
    btn.value = '撤销';
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
    var dataStr = 'count=1&only=' + likeOnlyFlag;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "get_chars.php?" + dataStr, false);
    xmlhttp.send();
    var nrEntries = xmlhttp.responseText;
    nrPages = Math.floor(nrEntries / nrQuery) + 1;
}

function init_page() {
    var table = document.getElementById("charTbl");
    for (i = 0; i < nrQuery; i++) {
        row = table.insertRow(-1);

        // index
        cell = row.insertCell(0);
        t = document.createElement("span");
        t.innerHTML = i + 1;
        cell.appendChild(t);

        // remove button
        cell0 = row.insertCell(1);
        t0 = document.createElement("input");
        t0.id = "rmc" + i;
        t0.onclick = function() {remove_char(this.id);};
        t0.type = "button";
        t0.value = "删除";
        t0.className = "btn btn-danger";
        cell0.appendChild(t0);

        // like button
        cell1 = row.insertCell(2);
        t1 = document.createElement("input");
        t1.id = "upc" + i;
        t1.onclick = function() {like_char(this.id);};
        t1.type = "button";
        t1.value = "喜欢";
        t1.className = "btn btn-success";
        cell1.appendChild(t1);

        //character
        cell2 = row.insertCell(3);
        t2 = document.createElement("span");
        t2.id = "charc" + i;
        cell2.className = "success";
        cell2.appendChild(t2);

        //fortune
        cell3 = row.insertCell(4);
        t3 = document.createElement("span");
        t3.id = "fortc" + i;
        cell3.appendChild(t3);

        //attribute
        cell4 = row.insertCell(5);
        t4 = document.createElement("span");
        t4.id = "attrc" + i;
        cell4.appendChild(t4);

        //reference
        cell5 = row.insertCell(6);
        t5 = document.createElement("span");
        t5.style = "font-size: 80%";
        t5.id = "refc" + i;
        cell5.appendChild(t5);

        //number
        cell6 = row.insertCell(7);
        t6 = document.createElement("span");
        t6.id = "numc" + i;
        cell6.appendChild(t6);
    }
}

function show_page() {
    document.getElementById("pageNum").innerHTML = "页 "+(currPage+1)+"/"+nrPages;
    document.getElementById("pageNum1").innerHTML = "页 "+(currPage+1)+"/"+nrPages;
    var limit = nrQuery;
    var offset = currPage * nrQuery;
    var dataStr = 'lmt=' + limit + '&ofs=' + offset + '&only=' + likeOnlyFlag;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            fullStr = this.responseText;
            fullList = fullStr.split('|');
            nrRows = fullList.length;

            for (currRow = 0; currRow < nrRows-1; currRow++) {
                c = fullList[currRow].split(' ');
                if (c[0] == "") {
                    continue;
                }

                document.getElementById("charc"+currRow).innerHTML = c[2];
                document.getElementById("fortc"+currRow).innerHTML = c[5];
                document.getElementById("attrc"+currRow).innerHTML = c[3];
                document.getElementById("refc"+currRow).innerHTML = c[4];
                document.getElementById("numc"+currRow).innerHTML = c[1];                
            }

            // clean up undefined fields
            for (i = currRow; i < nrQuery; i++) {
                document.getElementById("charc"+i).innerHTML = "";
                document.getElementById("fortc"+i).innerHTML = "";
                document.getElementById("attrc"+i).innerHTML = "";
                document.getElementById("refc"+i).innerHTML = "";
                document.getElementById("numc"+i).innerHTML = "";
            }
        }
    };
    xmlhttp.open("GET", "get_chars.php?" + dataStr, true);
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

function like_only() {
    likeOnlyFlag = 1;

    var btn = document.getElementById("likeOnly");
    btn.onclick = function() { check_all(); };
    btn.value = '查看全部字库';

    num_pages();
    first_page();
}

function check_all() {
    likeOnlyFlag = 0;

    var btn = document.getElementById("likeOnly");
    btn.onclick = function() { like_only(); };
    btn.value = '仅查看喜欢字库';

    num_pages();
    first_page();
}