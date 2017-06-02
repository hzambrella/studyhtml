function checkboxed(objName){
	var objNameList=document.getElementsByName(objName);	

	if(null!=objNameList){
		alert("全选操作");
		for(var i=0;i<objNameList.length;i++){
			objNameList[i].checked="checked";
		}
	}
}

function uncheckboxed(objName){
	var objNameList=document.getElementsByName(objName);	

	if(null!=objNameList){
		alert("取消选则操作");
		for(var i=0;i<objNameList.length;i++){
			objNameList[i].checked="";
		}
	}
}