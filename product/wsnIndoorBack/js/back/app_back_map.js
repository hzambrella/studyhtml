$(function () {
    //var pageId = $("#pageId").html();
    var app = new Vue({
        el: "#mainbox",
        data: {
            finishLoading: true,
            title: '地图管理',
            data: commonPageData,
        },
        methods: {
            showLoc: function showLoc() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                alert(id);
            },

            toDetail: function toDetail() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                //alert(id);
                location.href = getRouter("mapdetail");
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
            app.data = getMockData('map');
            app.finishLoading = true;
        }, 200)
    }

})