// 我是子组件，全局定义
//自定义事件完成子组件与父组件的通信
//props属性完成父组件到子组件的通信
childc1 = Vue.extend({
  props: ['chirdid'],
  template: '<div>\
            <button v-on:click=click>子组件{{chirdid}}</button>\
            <span>click  num: {{counter}}</span>\
            </div>', //click事件触发click方法

  data: function () {
    return {
      counter: 0
    }
  },

  methods: {
    click: function () {
      this.counter += 1
      this.$emit('pcreport') //emit触发器，触发pcreport事件
    }
  }
})

//注册子组件
Vue.component('childc1', childc1)

Vue.component('parentc1', {
  props: ['parentid'],
  template: '<div style="border:1px solid #FFA500;" >\
  <p>父组件{{parentid}}  total:{{total}}</p>\
  <p>(若想结合多个子组件。父组件用div标签，不能直接结合，否则报错。还有js行尾加上斜杠"\")</p>\
          <childc1 v-for="n in 2" v-bind:chirdid=n key=n   v-on:pcreport="fathertotal"></childc1>\
          </div>', //pcreport事件触发fathertotal方法
  data: function () {
    return {
      total: 0,
    }
  },

  methods: {
    fathertotal: function () {
      this.total += 1
      this.$emit('sumreport') //触发sumreport事件。sumreport事件触发 sumtotal
    }
  }
})

//parentchild实例
parentandchild = new Vue({
  el: "#parentandchild",
  data: {
    "sum": 0,
  },
  methods: {
    sumtotal: function () {
      this.sum += 1;
    }
  }
})

//end

// 注册全局组件my-component
//!!注意，在实例化之前就要注册组件，否则报错！！
Vue.component('my-component', {
  template: '<div>全局组件!请看v2.js</div>'
})


//父实例1全局组件
var father1 = new Vue({
  el: '#father1'
})

//父实例2局部组件
var father2 = new Vue({
  // ...
  el: '#father2',
  components: {
    // <my-component> 将只在父模板可用
    'jubu-comp': {
      template: '<div>局部组件!请看v2.js</div>'
    }
  }
})


var datacomp = {
  counter: 0
}

Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
  // 但是我们返回给每个组件的实例的却引用了同一个data对象datacomp
  data: function () {
    return datacomp //共用一个对象
  }
  /*
  data:{
      counter:0
  }
  */ //会报错：data必须是函数
})



Vue.component('simple-counter2', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  //现在每个 counter 都有它自己内部的状态了：
  data: function () {
    return {
      counter: 0
    }
  }
})

new Vue({
  el: '#v2-compdata'
})


Vue.component('v2child1', {
  // camelCase in JavaScript
  props: ['mymessage'],
  template: '<span>{{mymessage }}</span>'
})

new Vue({
  el: '#father3',
  data: {
    parentMsg: "hahaha",
  }
})

//规则组件
Vue.component('yanzheng', {
  //这时不能用字符串数组[propA,propB,....]
  props: {
    // 基础类型检测 (`null` 意思是任何类型都可以)
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    //Prop "propc" is passed to component <Yanzheng>, but the declared prop name is "propC". 
    //Note that HTML attributes are case-insensitive and camelCased props need to use their 
    //kebab-case equivalents when using in-DOM templates. You should probably use "prop-c" instead of "propC".
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return {
          message: 'hello'
        }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  },
  template: '<p>验证props,propC is “{{propC}}”</p>'
})

new Vue({
  el: '#father4',
  data: {
    string: "该死的驼峰，html上属性改名为v-bind:prop-c",
    int: 15,
    stringint: ["hi", 1],
  }
})


//自定义事件
Vue.component('button-counter', {
  template: '<button v-on:click="increment">子组件{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('report') //触发report事件
    }
  },
})

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})

//slot
//slot有什么用呢？比方下面的，slot中填入的，可能是不同样式的文字，可能是表格、图片，甚至是按钮
//和 implements一样，子组件只是定义一个interface{},父组件具体的实现它。
Vue.component('stchild1', {
  template: '<div class="container">\
  <header>\
    <slot name="header"></slot>\
  </header>\
  <main>\
    <slot></slot>\
  </main>\
  <footer>\
    <slot name="footer"></slot>\
  </footer>\
</div>'
})
//第一种实现
stdiv1 = new Vue({
  el: "#stdiv1",
  components: {
    'stfather1': {
      template: '<stchild1>\
      <h1 slot="header">(stchild1第一种实现)这里可能是一个页面标题</h1>\
      <p>主要内容的一个段落。</p>\
      <p>另一个主要段落。</p>\
      <p slot="footer">这里有一些联系信息</p>\
      </stchild1>'
    }
  }
})
//第二种实现
stdiv2 = new Vue({
  el: "#stdiv2",
  components: {
    'stfather1': {
      template: '<stchild1>\
      <h1 slot="header" style="color:blue">(stchild1第二种实现)这里可能是一个页面标题</h1>\
      <p style="color:blue">主要内容的一个段落。</p>\
      <button>偏偏是个按钮</button>\
      <input slot="footer" value="这里有一些联系信息">\
      </stchild1>'
    }
  }
})

//作用域插槽,template的scope属性
//子组件
//:是v-bind
Vue.component('my-awesome-list', {
  props:['itemschild'],
  template: '<ul>\
  <slot name="itemname"\
    v-for="item in itemschild"\
    :text="item.text">\
    <!-- 这里写入备用内容 -->\
  </slot>\
</ul>'
})//slot  name:具名slot  itemschild:props选项。   :text  bind text属性至item.text

//实例，父组件是局部组件
divsc1 = new Vue({
  el: "#divsc1",
  data:{
    itemsdata:[
      {
        text:"haha"
      },
      {
        text:"hehe"
      },
      {
        text:"hiehie"
      },
      ]
  },


  components: {
    //第一种实现
    'scfather1': {
       props:['itemsparent'],
      template: '<my-awesome-list :itemschild="itemsparent">\
  <!-- 作用域插槽也可以是具名的 -->\
  <template slot="itemname" scope="props">\
    <li class="my-fancy-item">{{ props.text }}</li>\
  </template>\
</my-awesome-list>'
    },//将子组件itemschild 绑到itemsparent  slot="itemname"具名。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 props 对象
    //html上的scfather1标签  v-bind:itemsparent=itemsdata
  
   //第二种实现
    'scfather2': {
       props:['itemsparent'],
      template: '<my-awesome-list :itemschild="itemsparent">\
  <!-- 作用域插槽也可以是具名的 -->\
  <template slot="itemname" scope="props">\
    <button>{{ props.text }}</button>\
  </template>\
</my-awesome-list>'
    }//将子组件itemschild 绑到itemsparent  slot="itemname"具名。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 props 对象
    //html上的scfather1标签  v-bind:itemsparent=itemsdata
   }
})



