var netInfoRouter = {
    "anchorInfo": {
        url: "",
        name: "锚节点",
    },
    "sinkInfo": {
        url: "",
        name: "汇聚节点",
    },
    "coordinatorInfo": {
        url: "",
        name: "协调器",
    },
    "performOfNet": {
        url: "",
        name: "性能",
    },
}

var leftNavRouter = {
    "buildInfo": {
        url: "back_building.html",
        icon: "fa fa-building",
        name: "楼宇管理",
    },
    "mapInfo": {
        url: "back_map.html",
        icon: "fa fa-map",
        name: "地图管理",
    },
    "netInfo": {
        url: "",
        icon: "fa fa-connectdevelop",
        name: "网络管理",
        level2Id: "leftNavNetWorkLevel2",
        level2: netInfoRouter,
    },
    "monitorInfo": {
        url: "",
        icon: "fa fa-user",
        name: "人员管理",
    },
    "envInfo": {
        url: "",
        icon: "fa fa-thermometer-0",
        name: "环境监控",
    },

    // "mapInfo": "back_map.html",
    // "netInfo": "",
    // "monitorInfo": "",
    // "mapdetail": "back_mapdetail.html",
}


var commonRouter = {
    "mapdetail": {
        url: "back_mapdetail.html",
    },
}

var routerSummary = [
    leftNavRouter,
    netInfoRouter,
    commonRouter,
]

var leftNavTpl = "<ul id='leftNav' @click='navigate' class='item-list' v-cloak>" +
    "<li v-for='(val,key) in leftNavRouter'>" +
    "<a v-if='!val.level2' href='javascript:void(0)' :id='key'><i :class='val.icon'></i> {{val.name}}</a>" +
    "<a v-else href='javascript:void(0)' :id='key' class='left-nav-level2' :for='val.level2Id'><i :class='val.icon' ></i>{{val.name}}" +
    " <span style='float:right'><i class='fa fa-bars'></i></span> </a>" +
    "   <ul :id='val.level2Id' class='item-list-level2'>" +
    " <li v-for='(val2,key2) in val.level2'><a class='item-level2-nav' :from=key href='javascript:void(0)' :id=key2>{{val2.name}}</a></li>" +
    " </ul>" +
    "</li>" +
    "</ul>"


//左侧导航栏
//直接在页面加入：<leftnav></leftnav>
Vue.component('leftnav', {
    data: function () {
        return {
            leftNavRouter: leftNavRouter,
        }
    },
    template: leftNavTpl,
    mounted: function () {
        var pageId = "#" + $("#pageId").html();
        $(pageId).addClass("select")
    },
    methods: {
        navigate: function (event) {
            var $target = $(event.target);
            var id = $target.prop("id");
            //可以下拉
            if ($target.hasClass("left-nav-level2")) {
                targetLevel2 = $target.attr("for")
                if (!$target.hasClass('open')) {
                    $("#" + targetLevel2).show()
                    $target.addClass('open')
                } else {
                    $("#" + targetLevel2).hide()
                    $target.removeClass('open')
                }
                return
            }
            // if ($target.hasClass('item-level2-nav')) {
            //     id =$target.attr("from")+":"+id
            // }
            var h = getRouter(id);
            if (h && h != '') {
                location.href = h
            }
        }
    }
})

function getRouter(pageId) {
    for (var key in routerSummary) {
        if (routerSummary[key][pageId]) {
            return routerSummary[key][pageId].url
        }
    }

    return '';
}

function routerBack(pageId) {
    var h = getRouter(pageId);
    if (h && h != '') {
        location.href = h
    }
}

//左侧导航栏
$(function () {
    //initLeftNav()

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
})

//全局的变量：百度地图
var BMapObj = undefined;
//初始化百度地图，放入mounted方法中
function initBMap() {
    //百度地图
    //地图初始化,在显示时初始化，否则中心点在左上角
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var id = $(e.target).attr('href');
        if (id == "#showBMap" && !BMapObj) {
            BMapObj = new BMap.Map("bmap");
            BMapObj.enableScrollWheelZoom(true);
            var $default_zoom = 13; //默认放大级别
            var $start_end_marker = null;
            //将武科大青山校区作为默认中心(起点/终点)。原本应该是自己的当前位置。
            var $default_cen_lng = 114.271774;
            var $default_cen_lat = 30.44794;
            var $start_end_point = new BMap.Point($default_cen_lng, $default_cen_lat);
            BMapObj.centerAndZoom($start_end_point, $default_zoom);
            //addMarkerOnBMap($default_cen_lng,$default_cen_lat,'123','23213')
        }
    });
}

//生成maker
function addMarkerOnBMap(lng,lat, title, desc) {
    var marker = new BMap.Marker(new BMap.Point(lng,lat), {
        title: title
    });
    BMapObj.addOverlay(addWindowsInfoForBMapMarker(marker, title, desc));
    return marker
}

//给marker添加信息窗口
function addWindowsInfoForBMapMarker(marker, title, desc) {
    var info_opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: title, // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        message: "无"
    }
    var infoWindow = new BMap.InfoWindow(desc, info_opts); // 创建信息窗口对象 

    marker.addEventListener("click", function () {
        BMapObj.closeInfoWindow()
        //console.log("marker:", marker.getTitle())
        BMapObj.openInfoWindow(infoWindow, marker.getPosition()); //开启信息窗口
    });
    return marker
}


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