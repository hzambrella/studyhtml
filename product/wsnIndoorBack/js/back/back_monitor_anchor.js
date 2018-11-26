//1.把锚节点显示到地图上。点击锚节点能显示它们的状态信息。
//2.显示定位网络的状态。新建网络（已存在时不可新建）=>布设硬件=》组网-》标定关键锚节点=》洪范=》训练=》完成构建

// 0.新建网络（已存在时不可新建，在数据库的buid_network表中添加一行数据）=>
// 1.布设硬件（填写协调器的coor_id）=》
// 2.组网(com_status设置为1)-》
// 3.标定关键锚节点(anchor表中，输入部分锚节点的坐标)=》
// 4.洪范（向该网络发起洪范请求，返回关键锚节点间的跳距）=》
// 5.训练（普通的锚节点发送跳距，得到坐标）=》
// 6.完成构建（此时才能进行定位监控）

//3.不同的状态进行不同的操作。并且显示进度
//4.楼层切换

$(function () {
    var defaultGisData = {
        code: '',
        host: '',
        serverType: '',
        workspace: '',
        requestType: '',
        layers: '',
        x_min: 0,
        y_min: 0,
        x_max: 0,
        y_max: 0,
        zoom_default: 0,
        zoom_max: 0,
        zoom_min: 0,
    }

    var defaultMapDetail = {
        "mapId": 0,
        "title": "",
        "status": 1,
        "descrip": "",
        "createTime": "",
        "updateTime": "",
        "floor": 1,
        "height": 1,
        "buildName": "",
        "bid": 0
    }

    var vdata = {
        title: getTitle(),
        mapFinishLoading: true,
        netWorkFinishLoading: true,
        buildMapRel: [],//后端传过来的是倒序
        baseMapData: defaultGisData,
        mapDetail: defaultMapDetail,
    }


    //TODO:理清逻辑。应当是有无地图都能进行操作，无地图时采用列表形式。但是时间关系，有地图才能管理。
    //数据加载顺序 地图和网络状态分开进行
    //==>getBuildMapRel==>楼层的按钮==》选择一个楼层==》底图数据=》geoserver加载地图
    //==》getNetwork-》根据不同状态，请求锚节点数据
    // 地图加载完后，才能将锚节点数据渲染到地图
    function getBuildMapRel(bid, floor) {
        app.mapFinishLoading = false;
        setTimeout(function () {
            vdata.buildMapRel = getBuildMapRelMock().obj
            console.log(vdata.buildMapRel)
            app.mapFinishLoading = true;
            //右边信息栏，显示第一个标签页
            //$('#mapDataTab li:eq(0) a').tab('show');
        }, 20)
    }

    // function getData() {
    //     var mapId = 1; //TODO:from dom
    //     app.mapFinishLoading = false;
    //     //TODO:ajax
    //     setTimeout(function () {
    //         app.mapDetail = getMapDetailMock().obj
    //         getBaseMapData(mapId)
    //     }, 20)
    // }

    // function getNetwork(bid, floor) {

    // }

    // function getBaseMapData(mapId) {
    //     //TODO:ajax
    //     setTimeout(function () {
    //         app.baseMapData = loadMap(mapId)
    //         app.finishLoading = true
    //     }, 20)
    // }


    // function getAnchorData() {
    //     //TODO:ajax
    //     setTimeout(function () {

    //     }, 20)
    // }

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        methods: {
            getBuildMapRel:getBuildMapRel,
            refresh: function () {},
        }
    })

    app.getBuildMapRel();
})