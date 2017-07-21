    var showMessage1 = function showMessage1(message) {
        alert(message)
    }

    var showMessage2 = function showMessage2() {
        alert('hello define in dom.js')

    }

    function showEvent(event){
        alert(event)
    }
    //html级
    //js报错，Uncaught TypeError: Cannot read property 'addEventListener' of null;
    //你好，你把代码放到window.onload=function(){...}里面试试看，如果页面还没加载到go按钮
    //而且你代码是放在go按钮的前面，你就调用了getElementById,返回的对象是undefined
    window.onload = function () {
        //dom0
        var btn1 = document.getElementById("btn1")
        btn1.onclick = function () {
            showMessage2();
        }

        // dom2


        var btn2 = document.getElementById("btn2")
        btn2.addEventListener('click', showMessage2, false);
        //btn2.removeEventListener('click',showMessage2,false);//删除事件



        //浏览器兼容
        //将添加和删除事件处理程序封装到对象中并赋值给变量'eventUtil';
        var eventUtil = {
            //添加句柄
            addHandler: function (element, type, handler) {
                //判断DOM2级事件处理程序;
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                    //判断IE浏览器;
                } else if (element.attachEvent) {
                    element.attachEvent("on" + type, handler);
                    //使用DOM0级事件处理程序;
                } else {
                    element['on' + type] = handler;
                }
            },
            //删除句柄
            removeHandler: function (element, type, handler) {
                //判断DOM2级事件处理程序;
                if (element.removeEventListener) {
                    element.removeEventListener(type, handler, false);
                    //判断IE浏览器;
                } else if (element.detachEvent) {
                    element.detachEvent("on" + type, handler);
                    //使用DOM0级事件处理程序;
                } else {
                    element['on' + type] = null;
                };
            }

        };
        //跨浏览器添加事件处理程序;
        eventUtil.addHandler(btn3, 'click', showMessage2);

        
    }