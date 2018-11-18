$(function () {
    var app = new Vue({
        el: "#app",
        data: {
            title: "楼宇管理",
            resultCount: 1,
            page: 1,
            totalPage: 1,
            data: [],
        },
        methods: {
            getData: function getData(event) {
                //TODO:ajax
            },
            showLoc: function showLoc() {
                var id = $(event.target).parent().siblings(".data-item-id").val();
                alert(id);
            },
            toDetail: function toDetail() {
                var id = $(event.target).parent().siblings(".data-item-id").val();
                alert(id);
            },
            toMap: function toMap() {
                var id = $(event.target).parent().siblings(".data-item-id").val();
                alert(id);
            },
            toNetWork: function toNetWork() {
                var id = $(event.target).parent().siblings(".data-item-id").val();
                alert(id);
            },
            toMonitor: function toMonitor() {
                var id = $(event.target).parent().siblings(".data-item-id").val();
                alert(id);
            },
        }
    })
})