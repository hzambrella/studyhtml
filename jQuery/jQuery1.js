 $(document).ready(function () {
     $("#id1").click(function () {
         $("p:first").toggle();
     });

     $("#id2").click(function () {
         $("p").toggle(1000); //缓慢
     });
     //获得焦点
     $("input").focus(function () {
         $(this).css("background-color", "#cccccc");
     });
     //失去焦点
     $("input").blur(function () {
         $(this).css("background-color", "#ffffff");
     });

     //淡入淡出
     $("#id3").click(function () {
         $("#div1").fadeToggle();
         $("#div2").fadeToggle("slow");
         $("#div3").fadeToggle(3000);
     });


     $("#flip").click(function () {
         $("#panel").slideToggle("slow");
     });

     //动画
     $("#id4").click(function () {
         /*
         $("div").animate({
           left: '250px',
           opacity: '0.5',
           height: '150px',
           width: '+=150px'  //这是个相对值。您甚至可以把属性的动画值设置为 "show"、"hide" 或 "toggle"。
         });
         */
         var div = $("#fang1")
         div.animate({
             left: '250px',
             opacity: '0.5',
             height: '150px',
             width: '+=150px' //这是个相对值。您甚至可以把属性的动画值设置为 "show"、"hide" 或 "toggle"。
         });
         div.animate({
             height: '300px',
             opacity: '0.4'
         }, "slow");
         div.animate({
             width: '300px',
             opacity: '0.8'
         }, "slow");
         div.animate({
             height: '100px',
             opacity: '0.4'
         }, "slow");
         div.animate({
             fontSize: '3em'
         }, "slow");
         div.animate({
             width: '100px',
             opacity: '0.8'
         }, "slow");
         div.animate({
             height: 'toggle'
         });
         div.animate({
             height: 'toggle'
         });
     }); //id4 end

     //停止动画
     $("#stopb1").click(function () {
         $("#fang1").stop();
     });
     $("#stopb2").click(function () {
         $("#fang1").stop(true);
     });

     $("#stopb3").click(function () {
         $("#fang1").stop(true, true);
     });

     $("#cbb1").click(function () {
         $("#cbp1").toggle(1000, function () {
             alert("哈哈callback!  alert");
         });
     });
     $("#lianb1").click(function () {
         $("#lian1").hide(1000).show(1000).css("color", "red").slideUp(1000).slideDown(1000, function () {
             alert("链")
         });
     });

//第一章end


 }); //end