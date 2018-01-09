var haha = new Vue({
    el: '#haha',
    data: {
        message: 'hello vue'
    }
})



Vue.component('fmao', {
    props: ['anchor', 'title','fuhao'],
    template: '<div >\
     <a  v-bind:href=anchor>{{anchor}}:{{title}}</a>\
     </br>\
     </div>'
})

var br = new Vue({
    el: "#mao",
    data: {
        fuhao:'#',
        char: 'chapter',
        brlist: ['学习vue', 'vue基础','vue组件','vue自定义指令','vue路由']
    },

})

//自定义组件
/*
Vue.component('maos', {
    // maos 组件现在接受一个
    // "prop"，类似于一个自定义属性
    // 这个属性名为 mao。
    props: ['mao','char'],
    template: ' <a>{{char}}{{mao.id}} :{{mao.title}}</a> </br>'
})


var br2 = new Vue({
    el: "#mao2",
    data: {
        char: 'chapter',
        brlist: [{
            id: 1,
            title: '学习vue'
        }, {
            id: 2,
            title: '学习vue2'
        }]
    },

})
*/

Vue.component('pre2', {
    // maos 组件现在接受一个
    // "prop"，类似于一个自定义属性
    // 这个属性名为 mao。
    props: ['mao'],
    template: ' <pre>{{mao.title}}</pre>'
})

var pre2 = new Vue({
    el: "#pre2",
    data: {
        pre2list: [{
            id: 1,
            title: '学习vue'
        }, {
            id: 2,
            title: '学习vue2'
        }]
    },

})