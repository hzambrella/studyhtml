var data1 = {
    a: 1
}
var vm1 = new Vue({ // Vue是构造函数，会创建vue 实例
    el: "#p1",
    data: data1, //这里是个对象类型。每个 Vue 实例都会代理其 data 对象里所有的属性：
    /*
    created: function () {
        alert("我是vm1,这是created钩子的响应.")
    }
    */
})

//改变a
function changenihao2() {
    vm1.a++ //这些被代理的属性是响应的，也就是说值的任何改变都是触发视图的重新渲染。
}

vm1.$watch('a', function (newVal, oldVal) {
    // 这个回调将在 `vm.a`  改变后调用
    alert("vue.watch 方法监视的a:" + oldVal + "变成了" + newVal)
})

var vm1a = vm1.$data.a
var vm2 = new Vue({
    el: "#ans11",
    data: {
        ans11list: ["vm1.$el==document.getElementById\(\"p1\"\)?",
            vm1.$el == document.getElementById("p1"),
            "vm1.$data?",
            vm1.$data
        ],
        seen: true,
    }
})

function hideans() {
    vm2.seen = !vm2.seen //这些被代理的属性是响应的，也就是说值的任何改变都是触发视图的重新渲染。
    if (vm2.seen) {
        document.getElementById("btn111").value = "隐藏"
    } else {
        document.getElementById("btn111").value = "显示"
    }
}

data2 = {
    a: 1
}
var vm3 = new Vue({ // Vue是构造函数，会创建vue 实例
    el: "#p121",
    data: data2, //这里是个对象类型。每个 Vue 实例都会代理其 data 对象里所有的属性：
})


//改变a
function changenihaovonce() {
    vm3.a++ //这些被代理的属性是响应的，也就是说值的任何改变都是触发视图的重新渲染。
        alert("data2.a变成了" + data2.a)
    alert("vm3.a变成了" + vm3.a)
    alert("nihaov-once还是1")
}


var vm4 = new Vue({ // Vue是构造函数，会创建vue 实例
    el: "#p122",
    data: {
        ok: true,
        seen: true
    }, //这里是个对象类型。每个 Vue 实例都会代理其 data 对象里所有的属性：
})

//改变ok
function changeok() {
    vm4.ok = !vm4.ok
    if (vm4.ok) {
        document.getElementById("btn13").value = "change NO"
    } else {
        document.getElementById("btn13").value = "change YES"
    }

}

function changevif() {
    vm4.seen = !vm4.seen
    if (vm4.seen) {
        document.getElementById("btn14").value = "change v-if 隐藏"
    } else {
        document.getElementById("btn14").value = "change v-if 显示"
    }
}

//computed
var comp1 = new Vue({
    el: '#comp1',
    data: {
        message: 'Hello vue!'
    },
    computed: {
        // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        }
    }
})


//computed 的getter和setter
var v1name = new Vue({
    el: '#v1name',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        //  fullName: 'Foo Bar'
    },
    /*
      watch: {
        firstName: function (val) {
          this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
          this.fullName = this.firstName + ' ' + val
        }
      }
      */

    computed: {
        fullName: { // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    },

    methods: {
        v1setname: function (event) {
            this.fullName = document.getElementById("v1firstname").value + ' ' + document.getElementById("v1lastname").value;
        }
    }
})

var logintypelist = new Array("user", "QQemail", "sinaemail")
var connectlist = new Array("phone", "email")
v1login = new Vue({
    el: "#v1login",
    data: {
        indexlogin: 0,
        indexconn: 0,
        logintype: logintypelist[0],
        connect: connectlist[0],
    },
    methods: {
        changelogintype: function (event) {
            if (this.indexlogin < logintypelist.length - 1) {
                this.indexlogin++;
            } else {
                this.indexlogin = 0;
            }

            this.logintype = logintypelist[this.indexlogin];
            //alert(this.logintype)
        },

        changeconnect: function (event) {
            if (this.indexconn < connectlist.length - 1) {
                this.indexconn++;
            } else {
                this.indexconn = 0;
            }

            this.connect = connectlist[this.indexconn];
            //alert(this.logintype)
        }
    }

})

v1neilian = new Vue({
    el: "#v1neilian",
    methods: {
        say: function (content) {
            alert(content)
        },

        warn: function (message, event) {
            // 现在我们可以访问原生事件对象 
            if (event) event.preventDefault()
            alert(message)
        }
    }
})

