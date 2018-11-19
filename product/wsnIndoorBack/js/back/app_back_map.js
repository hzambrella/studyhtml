$(function () {
    var pageInfo = {
        resultCount: 1,
        page: 1,
        totalPage: 1,
    }
    var app = new Vue({
        el: "#app",
        data: {
            finishLoading: true,
            title: '地图管理',
            pageInfo: pageInfo,
            items: {},
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
            deleteMap: function toMonitor() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                alert(id);
            },

        }
    })

    getData(1); //首次加载页面时

    function getData(page) {
        app.finishLoading = false;
        //TODO:ajax
        setTimeout(function () {
            app.items = getMockData('map').obj.list;
            app.finishLoading = true;
        }, 200)
    }

})