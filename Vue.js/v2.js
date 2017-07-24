// 注册全局组件my-component
//!!注意，在实例化之前就要注册组件，否则报错！！
Vue.component('my-component', {
    template: '<div>全局组件!</div>'
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
            template: '<div>局部组件!</div>'
        }
    }
})


 var datacomp={ counter: 0 }

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
    return { counter: 0 }
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
  data:{
      parentMsg:"hahaha",
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
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  },
  template:'<p>验证props,propC is “{{propC}}”</p>'
})

new Vue({
  el: '#father4',
  data:{
      string:"该死的驼峰，html上属性改名为v-bind:prop-c",
      int:15,
      stringint:["hi",1],
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
      this.$emit('report')//触发report事件
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