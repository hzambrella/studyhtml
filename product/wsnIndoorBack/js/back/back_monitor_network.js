$(function () {
    var vdata = {
        finishLoading: true, //异步请求的数据是否加载完毕
        title: getTitle(),
        data: commonPageData,
        bid: document.getElementById("bid").innerHTML,
        bname:document.getElementById("bname").innerHTML,
    }

    var getData = function () {
        vdata.finishLoading = false;
        //TODO:ajax
        setTimeout(function () {
            vdata.data = getNetworksMock()
            vdata.finishLoading = true;
        }, 200)
    }

    function changeCoor(event) {
        $target = $(event.target)
        //$target.parent().attr('nid')
    }

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        mounted: function () {
            getData()
        },
        methods: {
            refresh: getData,
            changeCoor: changeCoor,
        }
    })
})