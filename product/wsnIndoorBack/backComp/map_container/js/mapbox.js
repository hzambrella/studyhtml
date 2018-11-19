   //需要modal插件
   var $mapModal = $("#map_modal").modal({
       clearIfClose: false
   })
   /* 测试mapContainer*/
   function testMapContainer() {
       $mapModal.show()
   }
   //testMapContainer()
   $mapModal.find(".default_cancel").bind("click", function () {
       $mapModal.hide();
   });