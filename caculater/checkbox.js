function checkboxed(objName){
	var objNameList=document.getElementsByName(objName);	

	if(null!=objNameList){
		alert("ȫѡ����");
		for(var i=0;i<objNameList.length;i++){
			objNameList[i].checked="checked";
		}
	}
}

function uncheckboxed(objName){
	var objNameList=document.getElementsByName(objName);	

	if(null!=objNameList){
		alert("ȡ��ѡ�����");
		for(var i=0;i<objNameList.length;i++){
			objNameList[i].checked="";
		}
	}
}