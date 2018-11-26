$(function () {
    var vdata = {
        finishLoading: true, //异步请求的数据是否加载完毕
        title: getTitle("buildInfo")+"/"+getTitle(),
        data: commonData,
    }

    var getData = function () {
        vdata.finishLoading = false;
        //TODO:ajax
        setTimeout(function () {
            vdata.data = getMockData('build');
            vdata.finishLoading = true;
        }, 200)
    }

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        mounted: function () {
        },
        methods: {
            refresh: getData,
            showLoc: function showLoc() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                if (id);
                alert(id);
            },
            toDetail: function toDetail() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                if (id);
                alert(id);
            },
            toMap: function toMap() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                if (id);
                alert(id);
            },
            toNetwork: function toNetWork() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                if (id);
                alert(id);
            },
            toMonitor: function toMonitor() {
                var id = $(event.target).parent().siblings(".data-item-id").html();
                if (id);
                alert(id);
            },
        }
    })

    app.refresh(app, 1);
})