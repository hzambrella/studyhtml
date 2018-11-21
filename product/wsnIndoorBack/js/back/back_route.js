var router = {
    "buildInfo": "back_building.html",
    "mapInfo": "back_map.html",
    "netInfo": "",
    "monitorInfo": "",
    "mapdetail": "back_mapdetail.html",
}

function getRouter(pageId) {
    return router[pageId]
}

function routerBack(pageId) {
    var h = getRouter(pageId);
    if (h && h != '') {
        location.href = h
    }
}

//左侧导航栏
$(function () {
    var viewH = document.documentElement.clientHeight;
    var right = document.getElementById("right");
    right.style.height = (viewH - 95) + "px";

    //控制hover的显示
    var userDetailIsHover = false;

    $("#user_info_detail").hoverDelay({
        hoverEvent: function () {
            userDetailIsHover = true;
        },
        outEvent: function () {
            userDetailIsHover = false;
            $("#user_info_detail").css("display", "none")
        }
    })

    $("#head_img").hoverDelay({
        hoverEvent: function () {
            $("#user_info_detail").css("display", "block")
        },
        outDuring: 2000,
        outEvent: function () {
            if (!userDetailIsHover) {
                $("#user_info_detail").css("display", "none")
            }
            //$("#user_info_detail").css("display", "none")
        }
    });

    $("#footer").html("推荐使用360浏览器或谷歌浏览器&nbsp&nbsp&nbsp&nbspby:hzambrella");

    /*测试蒙版和boxAlert*/
    var $modal = $("#modal").modal()
    //testModalAndBoxAlert()

    function testModalAndBoxAlert() {
        //确认
        var modalOpt = {
            'title': '标题',
            'content': "内容",
            'confirmFunc': function () {
                $modal.hideModal();
                // testMapContainer()
            },
            'cancelFunc': function () {
                $modal.hideModal();
            }
        }
        $modal.boxAlert(modalOpt);
        $modal.show();
    }

    $("#leftNav").on('click', function (event) {
        var $target = $(event.target);
        var h = getRouter($target.prop("id"));
        if (h && h != '') {
            location.href = h
        }
    })
})

var commonData = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {
        "pageNum": 0,
        "pageSize": 0,
        "size": 0,
        "orderBy": null,
        "startRow": 0,
        "endRow": 0,
        "total": 2,
        "pages": 0,
        "list": [],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 0,
        "navigatepageNums": [1]
    }
}