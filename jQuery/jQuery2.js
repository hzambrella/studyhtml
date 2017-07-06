$(document).ready(function () {
    var i = 3;
    $("#hp1b1").click(function () {
        alert("Text: " + $("#htmlp1").text());
        alert("Html: " + $("#htmlp1").html());
        alert("Val: " + $("#htmlp1").val());
    });
    $("#hp1b2").click(function () {
        alert("Text: " + $("#htmlp2").text());
        alert("Html: " + $("#htmlp2").html());
        alert("Val : " + $("#htmlp2").val());
        alert("attr(type):" + $("#htmlp2").attr("type"))
    });

    $("#chp1b1").click(function () {
        $("#htmlp1").text(function (i, originText) {
            return originText + "-元素下标-->" + i + "(我使用了callback函数)"
        });

    });

    $("#chp1b2").click(function () {

        $("#htmlp1").html("<p><input id=\"htmlp2\" type=\"text\" value=\"菜鸟教程\"><p>");

    });

    $("#chp1b3").click(function () {

        $("#htmlp2").val("runoob");
    });

    $("#btn221").click(function () {
        i++;
        $("#ol221").append("<li class=\"haha\">List item " + i + "</li>");
    });

    $("#btn222").click(function () {
         
        var txt1 = "<p id=\"p223v\">文本。</p>"; // 使用 HTML 标签创建文本
        var txt2 = $("<p></p>").text("文本。"); // 使用 jQuery 创建文本
        var txt3 = document.createElement("p"); //使用DOM创建文本
        
        txt3.innerHTML="DOM";
        $("#div222").append(txt1, txt2, txt3); // 追加新元素
        $("#p223v").before("前面添加");
    });


$("#btn223").click(function(){
    $("#div222").remove();
  });
  $("#btn224").click(function(){
    $("#div222").empty();
  });
   $("#btn225").click(function(){
    $("li").remove(".haha");
  });
});