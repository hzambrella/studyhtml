//模态生成
//用法 <div id="#modal"></div>  var $modal=$("#modal").modal();  $modal.show()   $modal.hide() 
//参数：backgroundColor  背景颜色。z_index 
(function ($) {
    var ModalClass = function (el, opt) {
        this.$element = el
        this.defaults = {
            backgroundColor: "rgba(0,0,0,0.2)",
            z_index: 300,
        };
        this.options = $.extend({}, this.defaults, opt)
    }

    // ModalClass.prototype = {
    //     sf: function () {
    //         return $(this.$element).css("display", "none");
    //     },
    //     hf: function () {
    //         return $(this.$element).css("display", "block");
    //     },

   // }

    $.fn.modal = function (options) {
        var ModalInstance = new ModalClass(this, options);
        $(this).addClass("modal").css("background-color", ModalInstance.options.backgroundColor);
        $(this).css("z-index", ModalInstance.options.z_index);
        return $(this);
    }
})(jQuery);