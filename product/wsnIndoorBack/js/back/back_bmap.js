//全局的变量：百度地图
var BMapObj = undefined;
//初始化百度地图，放入mounted方法中
function initBMap() {
    //百度地图
    //地图初始化,在显示时初始化，否则中心点在左上角
    if (!BMapObj) {
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
}


function initBMapInBootstrapTabs() {
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

//生成maker  data是数据
function addMarkerOnBMap(lng, lat, title, desc, data) {
    var marker = new BMap.Marker(new BMap.Point(lng, lat), {
        title: title,
    });
    BMapObj.addOverlay(addWindowsInfoForBMapMarker(marker, title, desc));
    marker.data = data //绑定数据
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
    /*
        marker.addEventListener("click", function () {
            BMapObj.closeInfoWindow()
            //console.log("marker:", marker.getTitle())
            BMapObj.openInfoWindow(infoWindow, marker.getPosition()); //开启信息窗口
        });
        */
    return marker
}

