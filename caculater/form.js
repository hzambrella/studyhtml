function  validateForm(){
	var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("需要输入名字。");
		document.getElementById("message").innerHTML="需要输入名字。";
        return false;
    }else{
		document.getElementById("message").innerHTML=x;
		return true;
	}
}


function validateEmailForm(){
	
	var x=document.forms["email"]["ename"].value;
	var a=x.indexOf("@");
	var b=x.lastIndexOf(".");
	alert(a);
	alert(b);
	//意思就是说，输入的数据必须包含 @ 符号和点号(.)。同时，@ 不可以是邮件地址的首字符，并且 @ 之后需有至少一个点号：
	if (a<1||b<a+2||b+2>x.length){
		document.getElementById("message").innerHTML="邮箱地址无效";
		return false;
	}
}