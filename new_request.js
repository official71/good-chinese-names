function new_request() {    
    surName = document.getElementById("SurName").value;
    if (surName == '') {
        surName = '徐';
    }
    var dataStr = 'surname=' + surName;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var raw = this.responseText;
            var chars = raw.split('|');
            
            c1 = chars[0].split(' ');
            c2 = chars[1].split(' ');

            var fullName = surName.concat(c1[2], c2[2]);
            document.getElementById("retName").innerHTML = fullName;

            document.getElementById("char1").innerHTML = c1[2];
            document.getElementById("num1").innerHTML = c1[1];
            document.getElementById("attr1").innerHTML = c1[3];
            document.getElementById("ref1").innerHTML = c1[4];

            document.getElementById("char2").innerHTML = c2[2];
            document.getElementById("num2").innerHTML = c2[1];
            document.getElementById("attr2").innerHTML = c2[3];
            document.getElementById("ref2").innerHTML = c2[4];
        }
    };
    xmlhttp.open("GET", "gen_name.php?" + dataStr, true);
    xmlhttp.send();
}

var SurName = "";
var c1 = "";
var c2 = "";