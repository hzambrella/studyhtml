//模态生成
//用法 <div id="#modal"></div>  var $modal=$("#modal").modal();  $modal.show();//显示  $modal.hideModal() //隐藏,同时
//添加别的，如弹框。$modal.boxAlert()  $modal.show();//boxAlert是个alert插件，相当于append();隐藏：$modal.hideModal()//会删除子元素
//参数：backgroundColor  背景颜色。z_index 
//方法：hideModal 隐藏modal并删除里面的内容
(function ($) {
    var ModalClass = function (el, opt) {
        this.$element = el
        this.defaults = {
            clearIfClose: true, // 当隐藏蒙版时是否清除蒙版里面的元素
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
    //注意！modal里面的内容会清空。
    $.fn.hideModal = function () {
        if (options.clearIfClose) {
            $(this).children().remove()
        }
        $(this).hide()
        return $(this);
    }
})(jQuery);