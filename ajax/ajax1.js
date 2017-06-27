//ajax框架
var xmlhttp
var data
function loadXMLDOC(url, method, datain) {
    xmlhttp = null;

    //浏览器兼容
    if (window.XMLHttpRequest) { // code for Firefox, Opera, IE7, etc.
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //

    // 请求
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = state_change;
        if (method =="GET") {
            xmlhttp.open("GET", url, true);
            xmlhttp.send(null);
        } else if(method=="POST") {
            xmlhttp.open("POST", url, true);
            xmlhttp.send(datain);
        }

    } else {
        alert("Your browser does not support XMLHTTP.");
    }

    //响应
    function state_Change() {
        if (xmlhttp.readyState == 4) { // 4 = "loaded"
            if (xmlhttp.status == 200) { // 200 = "OK"
                document.getElementById('T1').innerHTML = xmlhttp.responseText;  //TODO 响应
            } else {
                alert("Problem retrieving data:" + xmlhttp.statusText);
            }
        }
    }

}