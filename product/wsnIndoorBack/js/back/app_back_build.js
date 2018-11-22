$(function () {
    var app = new Vue({
        el: "#mainbox",
        data: {
            finishLoading: true,
            hasLoadMarkerOnBmap: false,
            title: "楼宇管理",
            data: commonData,
        },
        mounted: function () {
            initBMap()
            getData(1) //首次加载页面时
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                if (BMapObj && !hasLoadMarkerOnBmap) {
                    list = data.obj.list;
                    console.log(list);
                    for (var item in list) {
                        addMarkerOnBMap(list[item].x, list[item].y, list[item].name, list[item].address)
                    }
                    hasLoadMarkerOnBmap = true;
                }
            })
        },
        methods: {
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



    function getData(page) {
        this.finishLoading = false;
        //TODO:ajax
        setTimeout(function () {
            this.data = getMockData('build');
            this.finishLoading = true;
            this.hasLoadMarkerOnBmap=false;
        }, 200)
    }

})