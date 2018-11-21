$(function () {
    var app = new Vue({
        el: "#app",
        data: {
            finishLoading:true,
            title: "楼宇管理",
            data: commonData,
        },
        methods: {
            showLoc: function showLoc() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                alert(id);
            },
            toDetail: function toDetail() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                alert(id);
            },
            toMap: function toMap() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                alert(id);
            },
            toNetwork: function toNetWork() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                alert(id);
            },
            toMonitor: function toMonitor() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                alert(id);
            },
        }
    })

    getData(1); //首次加载页面时

    function getData(page) {
        app.finishLoading=false;
        //TODO:ajax
        setTimeout(function () {
            app.data = getMockData('build');
            app.finishLoading=true;
        }, 200)
    }

})