function  validateForm(){
	var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("��Ҫ�������֡�");
		document.getElementById("message").innerHTML="��Ҫ�������֡�";
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
	//��˼����˵����������ݱ������ @ ���ź͵��(.)��ͬʱ��@ ���������ʼ���ַ�����ַ������� @ ֮����������һ����ţ�
	if (a<1||b<a+2||b+2>x.length){
		document.getElementById("message").innerHTML="�����ַ��Ч";
		return false;
	}
}