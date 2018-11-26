$(function () {
    var vdata = {
        finishLoading: true, //异步请求的数据是否加载完毕
        title: getTitle(),
        data: commonPageData,
    }

    var getData = function () {
        vdata.finishLoading = false;
        //TODO:ajax
        setTimeout(function () {
            vdata.data = {};
            vdata.finishLoading = true;
        }, 200)
    }

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        mounted: function () {

        },
        methods: {
            refresh: getData
        }
    })
})