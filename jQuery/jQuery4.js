$(document).ready(function(){
 $(btn41).click(function () {
      $(div41).load("http://www.runoob.com//try/ajax/demo_test.txt", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
          alert("外部内容加载成功!");
        if (statusTxt == "error")
          alert("Error: " + xhr.status + ": " + xhr.statusText);
      })
    });

    $("#btn422").click(function () {

      $.ajax({
        async: true,
        url: 'http://www.runoob.com/try/ajax/demo_test.txt',
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
          //q: '参数,不多说'
        },
        timeout: 5000,
        success: function (data) {
          //客户端jquery预先定义好的callback函数,
          //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
          alert("google浏览器，unexpect token");
          $("#div41").append("<p>" + data + "</p>");
        }
      });

    });

    $("#btn421").click(function () {
      $.get("https://github.com/", function (data, status) {
        alert("跨域问题")
      });
    });

    $("#btn423").click(function () {
      $.getJSON("http://e.hnce.com.cn/tools/ajax.aspx?jsoncallback=?", {
        id: 0,
        action: 'jobcategoryjson'
      }, function (json) {
        alert(json[0].pid);
        alert(json[0].items[0]._name);
      });
    })


    $.getJSON("http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?", function(data) {
    
    var html = '<ul>';
    for(var i = 0; i < data.length; i++)
    {
        html += '<li>' + data[i] + '</li>';
    }
    html += '</ul>';
    
    $('#divCustomers').html(html); 
});
});