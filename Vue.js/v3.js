//全局指令
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.value="全局自定义指令focus"
  }
})
// 创建根实例
new Vue({
  el: '#custom-order',
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus2: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        //el.focus()
        el.value="局部自定义指令focus2"
      }
    }
  }
})

Vue.directive('gouzi', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#gouzi',
  data: {
    message: '菜鸟教程!'
  }
})