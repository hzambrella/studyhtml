//如果存在依赖，define的第一个参数传数组，数组的内容是依赖。
define(function() {
    return {
       hello:function(){document.getElementById("change_name").innerHTML="require.js:hello world"}
    };
});