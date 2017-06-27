//获取表单中的表单域 
var txt=document.forms[0].elements["txt1"]; 
var btnStart=document.forms[0].elements["btnStart"]; 
var btnReset=document.forms[0].elements["btnReset"] 
//定义定时器的id 
var id; 
//每10毫秒该值增加1 
var seed=0; 
btnStart.onclick=function(){ 
  //根据按钮文本来判断当前操作 
  if(this.value=="start"){ 
    //使按钮文本变为停止 
    this.value="stop"; 
    //使重置按钮不可用 
    btnReset.disabled=true; 
    //设置定时器，每0.01s跳一次 
    id=window.setInterval(tip,10); 
  }else{ 
    //使按钮文本变为开始 
    this.value="start"; 
    //使重置按钮可用 
    btnReset.disabled=false; 
    //取消定时 
    window.clearInterval(id); 
  } 
} 
//重置按钮 
btnReset.onclick=function(){ 
  seed=0; 
  txt.value=0;
} 
//让秒表跳一格 
function tip(){ 
  seed++; 
  txt.value=seed/100; 
} 
 

