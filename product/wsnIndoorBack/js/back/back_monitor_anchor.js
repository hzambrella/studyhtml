//1.把锚节点显示到地图上。点击锚节点能显示它们的状态信息。
//2.显示定位网络的状态。新建网络（已存在时不可新建）=>布设硬件=》组网-》标定关键锚节点=》洪范=》训练=》完成构建
//3.不同的状态进行不同的操作。并且显示进度
//4.楼层切换


// 业务流程
// 0.新建网络
//   描述：得到相关单位许可后，在数据库中添加一条关于无线传感网络的记录。
//   数据库操作：在数据库的buid_network表中添加一行数据，已存在时不可新建。
//   ui设定：前往网络管理界面。填写相关信息。
// =>1.布设硬件（填写协调器的coor_id）
//   描述：安装锚节点设备和其它设备。
//   数据库操作：(在购买传感器设备的时候，向数据库中添加设备信息。锚节点的位置信息设置为空。）现场施工完成后，修改数据库状态即可。
//   ui设定：点击
// =》2.组网
//   描述：无线设备进行组网，确保楼层中的设备入网。
//   数据库操作：设备添加nid。
// =》3.标定关键锚节点
//    描述：关键位置的锚节点作为参考节点，对其坐标进行标定。
//    数据库操作：添加关键锚节点的坐标。
// =》4.洪范
// 描述：各关键锚节点通过典型的距离矢量交换协议向邻居节点广播自身位置信息分组，使得网络中的所有锚节点获得据关键锚节点的最小跳数信息。
// 数据库操作：无。
// =》5.训练
// 描述：关键锚节点将跳距信息发送到服务端，训练出模型。普通锚节点将跳距信息输入到模型中，得到自身的坐标。
// 数据库操作：添加普通锚节点的坐标。
// =》6.完成构建
// 描述：定位网络构建完成，可进行任务。



$(function () {
    var noFloor = -10000; //未选择楼层
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
        "title": document.getElementById("bname").innerHTML,
        "status": 1,
        "descrip": "",
        "createTime": "",
        "updateTime": "",
        "floor": 1,
        "height": 1,
        "buildName": "",
        "bid": 0
    }

    var defaultNetwork = {
        "nid": 0,
        "bid": document.getElementById("bid").innerHTML,
        "floor": noFloor,
        "comStatus": 0,
        "anchorTaskStatus": 0,
        "anchorStatus": 0,
        "coorId": 0,
    }

    var anchorDeploySteps = {
        0: '新键网络',
        1: '布设硬件',
        2: '组网',
        3: '标定关键锚节点',
        4: '洪范',
        5: '训练',
        6: '完成构建',
    }

    var taskStatus = {
        0: '--待进行',
        1: '中',
        2: '失败',
    }

    // var task={
    //     0:
    // }

    var vdata = {
        noFloor: noFloor,
        bid: document.getElementById("bid").innerHTML,
        title: getTitle(),
        mapFinishLoading: true,
        netFinishLoading: true,
        hasStartProcess: false, //是否开始任务了
        buildMapRel: [], //后端传过来的是倒序
        baseMapData: defaultGisData,
        mapDetail: defaultMapDetail,
        mapLoadingMessage: '', //加载地图数据时的信息
        mapMessage: '', //加载地图数据完毕后的提示
        netLoadingMessage: '',
        netMessage: '',
        currentFloor: noFloor, //当前楼层，-100000代表没选择当前楼层
        currentMapId: 0, //当前地图id
        activeFloorButton: null, //按钮组中active的按钮的element
        network: defaultNetwork,
        anchorDeploySteps: anchorDeploySteps,
    }


    //TODO:理清逻辑。应当是有无地图都能进行操作，无地图时采用列表形式。但是时间关系，有地图才能管理。
    //数据加载顺序 地图和网络状态分开进行
    //==>getBuildMapRel==>楼层的按钮==》选择一个楼层==》底图数据=》geoserver加载地图
    //==》getNetwork-》根据不同状态，请求锚节点数据
    // 地图加载完后，才能将锚节点数据渲染到地图
    function getBuildMapRel() {
        //TODO:ajax
        mapStatusAndMessage(false, '加载楼层信息中.', '请于地图右上角选择一个楼层')
        setTimeout(function () {
            vdata.buildMapRel = getBuildMapRelMock().obj
            mapStatusAndMessage(true)
        }, 500)
    }

    function mapStatusAndMessage(mapFinishLoading, mapLoadingMessage, mapMessage) {
        vdata.mapFinishLoading = mapFinishLoading;
        mapLoadingMessage ? vdata.mapLoadingMessage = mapLoadingMessage : vdata.mapLoadingMessage = vdata.mapLoadingMessage;
        mapMessage ? vdata.mapMessage = mapMessage : vdata.mapMessage = vdata.mapMessage;
    }

    function resetGMapData() {
        vdata.currentFloor = noFloor;
        vdata.baseMapData = defaultGisData;
        vdata.mapDetail = defaultMapDetail;
    }

    function exchangeFloor(event) {
        $target = $(event.target)
        if (vdata.activeFloorButton) {
            vdata.activeFloorButton.removeClass('active')
        }
        $target.addClass('active')
        vdata.activeFloorButton = $target;
        vdata.currentFloor = $target.attr('floor')
        vdata.currentMapId = $target.attr('mapId')
    }

    function loadData(event) {
        resetGMapData()
        resetNetworkData();
        exchangeFloor(event)
        loadGMap()
        getNetwork()
    }

    //选择楼层后,加载地图
    function loadGMap() {
        mapStatusAndMessage(false, '加载底图信息中.', '底图加载完毕')
        getBaseMapData(vdata.currentMapId)

        function getBaseMapData(mapId) {
            //TODO:ajax
            setTimeout(function () {
                vdata.baseMapData = getBaseMapDataMock(mapId).obj;
                mapStatusAndMessage(false, '加载地图中.')
                loadMap(mapId, vdata.baseMapData)
                mapStatusAndMessage(true, '', '地图加载完毕')
                getMapDetail(mapId)
            }, 20)
        }

        function getMapDetail(mapId) {
            mapStatusAndMessage(false, '加载详情中.')
            setTimeout(function () {
                vdata.mapDetail = getMapDetailMock().obj;
                mapStatusAndMessage(true, '', '地图加载完毕：' + vdata.mapDetail.title)
            }, 20)

        }
    }

    function resetNetworkData() {
        vdata.network = defaultNetwork
    }

    function netStatusAndMessage(netFinishLoading, netLoadingMessage, netMessage) {
        vdata.netFinishLoading = netFinishLoading;
        netLoadingMessage ? vdata.netLoadingMessage = netLoadingMessage : vdata.netLoadingMessage = vdata.mapLoadingMessage;
        netMessage ? vdata.netMessage = netMessage : vdata.netMessage = vdata.netMessage;
    }

    function getTaskMessage() {
        var taskMessage='当前进度:' + vdata.anchorDeploySteps[vdata.network.anchorStatus] 
        if (vdata.network.anchorStatus!=6){
            taskMessage=taskMessage+  taskStatus[vdata.network.anchorTaskStatus]
        }
        return taskMessage;  
    }

    //选择楼层后，加载网络数据
    function getNetwork() {
        //TODO:ajax
        var floor = vdata.currentFloor;
        var bid = vdata.bid;
        netStatusAndMessage(false, '加载锚节点布设状态中')
        setTimeout(function () {
            vdata.network = getNetworkMock().obj;
            netStatusAndMessage(true, '', getTaskMessage())
        }, 20)
    }


    //任务模拟
    function newNetMock() {
        alert('请点击无线网络管理--新建网络');
        vdata.network.anchorStatus++;
        vdata.network.anchorTaskStatus = 0;
    }

    function deployHardWareMock() {
        vdata.network.anchorStatus++;
        vdata.network.anchorTaskStatus = 0;
    }

    function locCrucialAnchorMock() {
        vdata.network.anchorStatus++;
        vdata.network.anchorTaskStatus = 0;
    }

    function buildNetworkMock() {
        vdata.network.anchorStatus++;
        vdata.network.anchorTaskStatus = 0;
    }

    function floodingMock() {

        vdata.network.anchorTaskStatus = 1;
        setTimeout(function () {
            vdata.network.anchorStatus++;
            vdata.network.anchorTaskStatus = 0;
        }, 1000)
    }

    function trainingMock() {
        vdata.network.anchorTaskStatus = 1;
        setTimeout(function () {
            vdata.network.anchorStatus++;
            vdata.network.anchorTaskStatus = 0;
        }, 1000)
    }

    function restartMock() {
        vdata.network.anchorStatus = 1;
        vdata.network.anchorTaskStatus = 0;
    }

    //模拟进行任务
    function startTaskMock() {
        var index = vdata.network.anchorStatus
        // vdata.network.anchorStatus++;
        taskArrayMock(index);
    }
    
    //模拟进行任务
    function taskArrayMock(index) {
        index = parseInt(index)
        switch (index) {
            case 0:
                newNetMock();
                break;
            case 1:
                deployHardWareMock();
                break;
            case 2:
                buildNetworkMock();
                break;
            case 3:
                locCrucialAnchorMock();
                break;
            case 4:
                floodingMock();
                break;
            case 5:
                trainingMock();
                break;
            case 6:
                restartMock();
                break;
        }
    }
    // newNet, deployHardWare, buildNetwork, locCrucialAnchor, flooding, training

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        methods: {
            getBuildMapRel: getBuildMapRel,
            loadData: loadData,
            startTask: startTaskMock,
            refresh: function () {},
        },
        mounted: function () {},
        watch: {
            network: {
                handler: function (val, oldval) {
                    vdata.netMessage =getTaskMessage()
                },
                deep: true //对象内部的属性监听，也叫深度监听
            }
        }
    })

    app.getBuildMapRel();
})