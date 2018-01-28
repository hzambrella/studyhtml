//第一种插件
//$.extend
$.extend({
    log: function (message) {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1, //！JavaScript中月分是从0开始的
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
        console.log(time + ' My App: ' + message);
    },
    time: function () {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1, //！JavaScript中月分是从0开始的
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
        return time
    }
})
$.log('initializing...'); //调用

//第二种插件：.fn。当需要选择的时候。
//$.fn4
//example: $("p").green()
//文字变绿插件
$.fn.green = function () {
    //this指代jQuery选择器返回的集合。return的目的是支持链式调用。
    return this.css("color", "green")

}


//带默认参数的
// example:
// $('a').myPlugin({
//     'color': '#2C9929'
// });
/*option:
color:颜色
fontsize:字体
*/

$.fn.changeTextStyle = function (options) {
    var defaults = {
        'color': 'green',
        'fontSize': '2.5em'
    };
    //如果有对应的属性，覆盖，extend的第一个参数传{}目的在于保护默认值。
    var settings = $.extend({}, defaults, options);
    return this.css({
        'color': settings.color,
        'fontSize': settings.fontSize
    });
}

//第三种插件：面向对象：为了更好的维护代码。
 //分号防止别人的代码结尾不加分号导致报错。
 //function形成代码域，防止作用域冲突。
 //传入windows等参数。系统变量在插件内部就有了一个局部的引用，可以提高访问速度，会有些许性能的提升。
 //undefined是个名字叫undefined的形参，不是系统的undefined。但是真正的用时，形参所传确实是个系统的undefined，就弄假成真了。
;(function ($,window,document,undefined) {
    //首先定义构造函数
    var changTextStyleObj = function (el, opt) {
        this.$element = el
        this.defaults = {
            'color': 'green',
            'fontSize': '2.5em',
            'fontStyle': 'italic',
        };
        this.options = $.extend({}, this.defaults, opt)
    }

    //然后定义方法
    changTextStyleObj.prototype = {
        beautify: function () {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'font-style': this.options.fontStyle,
            });
        }
    }

    //最后定义对外接口
    /*
    opt:
    color:颜色
    fontSize:字体大小
    fontStyle:粗体斜体
    */
    $.fn.beautify = function (options) {
        //创建Beautifier的实体
        var changTextStyleIns = new changTextStyleObj(this, options);
        //调用其方法
        return changTextStyleIns.beautify();
    }
})(jQuery,window,document);
