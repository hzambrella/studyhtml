// "custom" 命名空间中创建一个 "progressbar" 小部件。
// 第一个参数：命名空间。第二个参数：可选，父部件。第三个是原型prototype，可以选择重写父部件的方法。

//固定的方法:
//_super() 和 _superApply() 实际上等同于最初的 Function.prototype.call() 和 Function.prototype.apply() 方法。
//作用是调用父组件被重写的同名方法。两个方法区别是一个接受参数列表，另一个接受数组。

//方法调用：
//instance.widgetName(methodName,param1 ...)
//或者：instance.widgetName("instance").methodName(param1) //jqueryui 1.11新增
$.widget("custom.progressbar", {
    // Default options.
    options: {
        value: 0
    },

    //构造方法。固定写法
    _create: function (value) {
        this.options.value = this._constrain(this.options.value)
        var progress = this.options.value + "%";
        this.element
            .addClass("progressbar")
            .text(progress);

        console.log("progressbar calls:_create")
        this.refresh();
    },

    //销毁方法。这里可以用来清除dom等，固定写法
    _destroy: function () {
        // 清除绑定的所有事件
        this.element.unbind()
        this.element
            .removeClass("progressbar")
            .text("");
    },

    //规范值
    _constrain: function (value) {
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }

        return value;
    },

    //设置
    _setOption: function (key, value) {
        if (key === "value") {
            value = this._constrain(value);
        }
        //父部件重写的同名方法
        this._super(key, value);
        this.refresh();
    },

    _setOptions: function (options) {
        //父部件重写的同名方法
        this._super(options);
        this.refresh();
    },

    //刷新
    refresh: function () {
        var progress = this.options.value + "%";

        this.element.text(progress);
        console.log("progressbar calls refresh:")
        console.log(progress)

        //trigger：钩子回调
        if (this.options.value == 100) {
            //知识点：第一个参数钩子名字，第二个参数event, 是jquery的事件（不是原生的浏览器事件）,第三个参数data。这里触发complete。
            this._trigger("complete", null, {
                value: 100
            });
        }

    },

    // Create a public method.
    value: function (value) {
        // No value passed, act as a getter.
        if (value === undefined) {
            return this.options.value;
        }

        this.options.value = this._constrain(value);
        // Value passed, act as a setter.
        this.refresh()
    },


});