//静态页面的url
var StaticPageUrl = {
    buildInfoByTab: "back_buildingByTab.html",
    BuildInfoByBMap: "back_buildingByBmap.html",
    overview: "back_overview.html",
    mapInfo: "back_map.html",
    mapdetail: "back_mapdetail.html",

    mOverview: "monitor_overview.html",
    mNetwork: "monitor_network.html",
    mAnchor: "monitor_anchor.html",
    mSensor: "monitor_sensor.html",
    mMove: "monitor_move.html",
    backToIndex: "back_buildingByBmap.html",
}

//页面的URL。换环境时改动这里即可。
var PageUrl = StaticPageUrl;

//路由和通用
//路由，通用数据格式，通用的方法

var buildInfoRouter = {
    "buildInfoByTab": {
        url: PageUrl.buildInfoByTab,
        name: "表格展示",
        parentLevel: "buildInfo",
    },
    "BuildInfoByBMap": {
        url: PageUrl.BuildInfoByBMap,
        name: "地图展示",
        parentLevel: "buildInfo",
    },
}

var hardwareRouter = {
    // "anchorInfo": {
    //     url: "back_anchor.html",
    //     name: "锚节点",
    //     parentLevel: "hardware",
    // },
    "sinkInfo": {
        url: "",
        name: "汇聚节点",
        parentLevel: "hardware",
    },
    "coordinatorInfo": {
        url: "",
        name: "协调器",
        parentLevel: "hardware",
    },
    "anchorInfo": {
        url: "",
        name: "定位设备",
        parentLevel: "hardware",
    },
    "sensorInfo": {
        url: "",
        name: "环境监控设备",
        parentLevel: "hardware",
    },
    // "performOfNet": {
    //     url: "",
    //     name: "整体性能",
    //     parentLevel: "hardware",
    // },
}

var leftNavRouter = {
    "overview": {
        url: PageUrl.overview,
        icon: "fa fa-th",
        name: "概览",
    },
    "buildInfo": {
        //url: "back_building.html",
        icon: "fa fa-building",
        name: "楼宇管理入口",
        level2Id: "leftNavBuildLevel2",
        level2: buildInfoRouter,
    },
    "mapInfo": {
        url: PageUrl.mapInfo,
        icon: "fa fa-map",
        name: "地图管理",
    },
    "hardware": {
        url: "",
        icon: "fa fa-podcast",
        name: "无线传感器管理",
        level2Id: "leftNavNetWorkLevel2",
        level2: hardwareRouter,
    },
    // "monitorInfo": {
    //     url: "",
    //     icon: "fa fa-user",
    //     name: "人员信息总览",
    // },
    "envInfo": {
        url: "",
        icon: "fa fa-thermometer-0",
        name: "环境信息总览",
    },

    // "mapInfo": "back_map.html",
    // "hardware": "",
    // "monitorInfo": "",
    // "mapdetail": "back_mapdetail.html",
}
leftNavRouter.name = "信息总览"

var commonRouter = {
    "mapdetail": {
        url: PageUrl.mapdetail,
    },
}

var monitorDeviceRouter = {
    //地图，这里运行算法1
    "mAnchor": {
        url:PageUrl.mAnchor,
        name: "定位设备管理",
        parentLevel: "mDevice",
    },
    //地图，这里运行算法2,进行固定目标的定位
    "mSensor": {
        url: PageUrl.mSensor,
        name: "环境设备管理",
        parentLevel: "mDevice",
    },
}

var monitorNavRouter = {
    //表格 显示楼宇的基本信息，汇聚节点信息
    //每层协调器信息和网络状况(良好，拥塞)。
    //有时间最好画个拓扑
    "mOverview": {
        url: PageUrl.mOverview,
        icon: "fa fa-connectdevelop",
        name: "楼内概览",
    },
    "mNetwork": {
        url: PageUrl.mNetwork,
        icon: "fa fa-rss",
        name: "无线网络管理",
        // level2Id: "mDeviceLevel2",
        // level2: monitorDeviceRouter,
    },
    "mDevice": {
        icon: "fa fa-podcast",
        name: "无线设备管理",
        level2Id: "mDeviceLevel2",
        level2: monitorDeviceRouter,
    },
    //访客和移动设备，这里运行算法2,进行移动目标的定位。开始是个表格，分时间段
    //然后点目标可以看到轨迹
    // "mRobot": {
    //     url: "monitor_visitor.html",
    //     icon: "fa fa-android",
    //     name: "移动物管理",
    // },

    "mMove": {
        url:PageUrl.mMove,
        icon: "fa fa-random",
        name: "移动目标管理",
    },
    "backToIndex": {
        url: PageUrl.backToIndex,
        icon: "fa fa-reply",
        name: "返回主页",
    }
}

monitorNavRouter.name = "楼宇管理"

var routerSummary = [
    leftNavRouter,
    buildInfoRouter,
    hardwareRouter,
    commonRouter,
    monitorDeviceRouter,
    monitorNavRouter,
]


var routerGroup = {
    "index": leftNavRouter, //主页的导航栏
    "monitor": monitorNavRouter, //监控的导航栏
}

//左侧导航栏。有多种。
var leftNavTpl =
    "<div>" +
    "<div v-for='(leftNavRouterVal,key) in routerGroup' v-if='group==key'>" +
    "<h3 class='con-left-title'>{{leftNavRouterVal.name}}</h3>" +
    "<ul id='leftNav' @click='navigate' class='item-list' v-cloak>" +
    "<li v-for='(val,key) in leftNavRouterVal'>" +
    "<a v-if='!val.level2' href='javascript:void(0)' :id='key'><i :class='val.icon'></i> {{val.name}}</a>" +
    "<a v-else href='javascript:void(0)' :id='key' class='left-nav-level2' :for='val.level2Id'><i :class='val.icon' ></i>{{val.name}}" +
    " <span style='float:right'><i class='fa fa-bars'></i></span> </a>" +
    "   <ul :id='val.level2Id' class='item-list-level2'>" +
    " <li v-for='(val2,key2) in val.level2'><a class='item-level2-nav' :from=key href='javascript:void(0)' :id=key2>{{val2.name}}</a></li>" +
    " </ul>" +
    "</li>" +
    "</ul>" +
    "</div>" +
    "</div>"

// var leftNavTplOld =
//     "<div>" +
//     "<h3 class='con-left-title'>{{leftNavRouter.name}}</h3>" +
//     "<ul id='leftNav' @click='navigate' class='item-list' v-cloak>" +
//     "<li v-for='(val,key) in leftNavRouter'>" +
//     "<a v-if='!val.level2' href='javascript:void(0)' :id='key'><i :class='val.icon'></i> {{val.name}}</a>" +
//     "<a v-else href='javascript:void(0)' :id='key' class='left-nav-level2' :for='val.level2Id'><i :class='val.icon' ></i>{{val.name}}" +
//     " <span style='float:right'><i class='fa fa-bars'></i></span> </a>" +
//     "   <ul :id='val.level2Id' class='item-list-level2'>" +
//     " <li v-for='(val2,key2) in val.level2'><a class='item-level2-nav' :from=key href='javascript:void(0)' :id=key2>{{val2.name}}</a></li>" +
//     " </ul>" +
//     "</li>" +
//     "</ul>" +
//     "</div>"


//左侧导航栏和用户信息
//直接在页面加入：<leftnav></leftnav>
Vue.component('leftnav', {
    props: ['group'],
    data: function () {
        return {
            routerGroup: routerGroup,
        }
    },
    template: leftNavTpl,
    mounted: function () {
        //左侧导航栏添加样式
        var pageId = $("#pageId").html();
        $("#" + pageId).addClass("select")
        $("#" + pageId).parents('ul').show()

        //上面的用户
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

function getTitle(pageId) {
    pageId ? pageId = pageId : pageId = $("#pageId").html();
    for (var key in routerSummary) {
        if (routerSummary[key][pageId]) {
            return routerSummary[key][pageId].name
        }
    }

    return '';
}

function getRouter(pageId) {
    for (var key in routerSummary) {
        if (routerSummary[key][pageId]) {
            return routerSummary[key][pageId].url
        }
    }

    return '';
}

function getRouterObj(pageId) {
    for (var key in routerSummary) {
        if (routerSummary[key][pageId]) {
            return routerSummary[key][pageId]
        }
    }

    return null;
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

//用数据
var commonData = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {}
}


var commonPageData = {
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
        "total": 0,
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

String.format = function () {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}