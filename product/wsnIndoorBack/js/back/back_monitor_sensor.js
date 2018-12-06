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
        "sensorTaskStatus": 0,
        "sensorstatus": 0,
        "coorId": 0,
    }

    var defaultSelectSensor = {
        "sid": 0,
        // "nid": 0,
        // "bid": 0,
        // "floor": 0,
        "sensorType": 0,
        "status": 0,
        "x": 0,
        "y": 0,
        "sn": "",
        "createTime": "",
        "updateTime": "",
        "energy": 0,
    }

    var vdata = {
        noFloor: noFloor,
        bid: document.getElementById("bid").innerHTML,
        title: getTitle(),
        //提示信息
        mapFinishLoading: true, //地图数据是否加载完毕
        netFinishLoading: true, //网络数据是否加载完毕
        sensorFinishLoading: true, //传感器数据是否加载完毕
        mapMessage: '', //加载地图数据完毕后的提示
        mapLoadingMessage: '', //加载地图数据时的信息
        netMessage: '', //加载网络数据完毕后的提示
        netLoadingMessage: '', //加载网络数据时的信息
        sensorMessage: '', //加载传感器数据完毕后的提示
        sensorLoadingMessage: '', //加载传感器数据时的信息
        //数据
        buildMapRel: [], //网络楼宇关系对象，后端传过来的是根据楼层的倒序
        baseMapData: defaultGisData, //底图数据
        mapDetail: defaultMapDetail, //地图详情
        currentFloor: noFloor, //当前楼层，-100000代表没选择当前楼层
        currentMapId: 0, //当前地图id
        activeFloorButton: null, //按钮组中active的按钮的element
        network: defaultNetwork, //网络对象
        sensors: [],
        selectSensor: defaultSelectSensor,
        //状态
        sensorStatus:Status.sensorStatus,
    }

    //图层
    var sensorSource = new ol.source.Vector({});
    var sensorLayer = new ol.layer.Vector({
        //source: sensorSource,
        style: sensorStyleFunction,
    })
    //popup
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    var popup = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    var lastSelectFeature = null;
    closer.onclick = function () {
        popup.setPosition(undefined);
        closer.blur();
        return false;
    };

    //TODO:理清逻辑。应当是有无地图都能进行操作，无地图时采用列表形式。但是时间关系，有地图才能管理。
    //数据加载顺序 地图和网络状态分开进行
    //==>getBuildMapRel==>楼层的按钮==》选择一个楼层==》底图数据=》geoserver加载地图
    //==》getNetwork-》根据不同状态，请求传感器数据
    // 地图加载完后，才能将节点数据渲染到地图
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

    function resetMessage() {
        vdata.mapFinishLoading = true //地图数据是否加载完毕
        vdata.netFinishLoading = true //网络数据是否加载完毕
        vdata.mapMessage = '' //加载地图数据完毕后的提示
        vdata.mapLoadingMessage = '' //加载地图数据时的信息
        vdata.netMessage = '' //加载网络数据完毕后的提示
        vdata.netLoadingMessage = '' //加载网络数据时的信息
    }

    function loadData(event) {
        //重置数据
        resetMessage();
        resetGMapData()
        resetNetworkData();
        //加载新数据
        exchangeFloor(event)
        resetSensorLayer()
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
                GMap.addLayer(sensorLayer)
                GMap.addOverlay(popup)
                GMap.on('click', function (e) {
                    //在点击时获取像素区域
                    var pixel = GMap.getEventPixel(e.originalEvent);
                    //用featureType来区分feature的类型。
                    GMap.forEachFeatureAtPixel(pixel, function (feature) {
                        //coodinate存放了点击时的坐标信息
                        if (feature.get('featureType') == 'sensor' + Status.sensorType.normal) {

                            if (lastSelectFeature) {
                                lastSelectFeature.setStyle(sensorStyleFunction(lastSelectFeature));
                            }

                            feature.setStyle(sensorStyleClickFunction(feature))
                            lastSelectFeature = feature
                            doPopup(e.coordinate, feature)
                        }
                    });
                });

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

    function doPopup(coordinate, feature) {
        //coordinate[1] = coordinate[1]+1 //往上挪点
        popup.setPosition(coordinate);
        vdata.selectSensor = {};
        vdata.selectSensor.sid = feature.get("sid")
        vdata.selectSensor.sensorType = feature.get("sensorType")
        vdata.selectSensor.status = feature.get("status")
        vdata.selectSensor.x = feature.get("x")
        vdata.selectSensor.y = feature.get("y")
        vdata.selectSensor.sn = feature.get("sn")
        vdata.selectSensor.createTime = feature.get("createTime")
        vdata.selectSensor.updateTime = feature.get("updateTime")
        vdata.selectSensor.energy = feature.get("energy")
        vdata.selectSensor.latestData = feature.get("latestData")

        $("#sensorSid").html(vdata.selectSensor.sid);
        $("#senserType").html(Status.sensorTypeName[vdata.selectSensor.sensorType]);
        $("#sensorStatus").html(Status.sensorStatusMap[vdata.selectSensor.status]);
        $("#sensorEnergy").html(vdata.selectSensor.energy);
        $("#sensor-title").html("传感器  序列号：" + vdata.selectSensor.sn)
        var latestData = vdata.selectSensor.latestData;
        if (latestData) {
            latestData.temperature ? $("#sensorTemp").html(latestData.temperature) : $("#sensorTemp").html("无")
            latestData.humidity ? $("#humidity").html(latestData.humidity) : $("#humidity").html("无")
            latestData.lux ? $("#lux").html(latestData.humidity) : $("#lux").html("无")
            latestData.flame ? $("#flame").html("有") : $("#flame").html("无")
            latestData.smog ? $("#smog").html("有") : $("#smog").html("无")
            latestData.poison ? $("#poison").html("有") : $("#poison").html("无")
            latestData.createTime ? $("#latestDataUpdateTime").html(latestData.createTime) : $("#latestDataUpdateTime").html("暂无数据")
        } else {
            $("#latestDataUpdateTime").html("暂无数据")
        }
        console.log(vdata.selectSensor)
    }

    function resetNetworkData() {
        vdata.network = defaultNetwork
    }

    function netStatusAndMessage(netFinishLoading, netLoadingMessage, netMessage) {
        vdata.netFinishLoading = netFinishLoading;
        netLoadingMessage ? vdata.netLoadingMessage = netLoadingMessage : vdata.netLoadingMessage = vdata.mapLoadingMessage;
        netMessage ? vdata.netMessage = netMessage : vdata.netMessage = vdata.netMessage;
    }

    //选择楼层后，加载网络数据
    function getNetwork() {
        //TODO:ajax
        var floor = vdata.currentFloor;
        var bid = vdata.bid;
        netStatusAndMessage(false, '加载网络数据中')
        setTimeout(function () {
            vdata.network = getNetworkMock().obj;
            netStatusAndMessage(true, '', '加载完毕')

            //TODO:加载传感器节点数据
            getSensorData()
        }, 20)
    }


    //传感器数据
    function sensorStatusAndMessage(sensorFinishLoading, sensorLoadingMessage, sensorMessage) {
        vdata.sensorFinishLoading = sensorFinishLoading;
        sensorLoadingMessage ? vdata.sensorLoadingMessage = sensorLoadingMessage : vdata.sensorFinishLoading = vdata.sensorFinishLoading;
        sensorMessage ? vdata.sensorMessage = sensorMessage : vdata.sensorMessage = vdata.sensorMessage;
    }

    //重置图层
    function resetSensorLayer() {
        sensorSource.clear()
        vdata.selectSensor = defaultSelectSensor
    }

    //加载数据
    function getSensorData() {
        sensorStatusAndMessage(false, '传感器数据中')
        setTimeout(function () {
            //TODO:ajax
            vdata.sensors = getSensorMock().obj;
            renderSensorDataAsGFeature();
            sensorStatusAndMessage(true, '', '加载完毕，点击地图中的要素即可查看信息')
        }, 100)
    }

    function renderSensorDataAsGFeature() {
        resetSensorLayer()
        var sensors = vdata.sensors
        var sFeatures = [];
        for (var index in sensors) {
            sensor = sensors[index]
            var feature = new ol.Feature({
                geometry: new ol.geom.Point([sensor.x, sensor.y]),
                type: 'data',
            })
            feature.setProperties(sensor);
            //用featureType来区分feature的类型。
            feature.set('featureType', 'sensor' + sensor.sensorType)
            sFeatures.push(feature)
        }
        sensorSource.addFeatures(sFeatures)
        sensorLayer.setSource(sensorSource);
    }

    // function moresensorInfo() {
    //     console.log(vdata.selectSensor)
    // }


    //事件
    function chooseSensor(evt) {
        var sid = $(evt.target).attr("sid")
        sensorSource.forEachFeature(function (feature) {
            if (feature.get("sid") == sid) {
                doPopup([feature.get("x"), feature.get("y")], feature)
            }
        })
    }

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        methods: {
            getBuildMapRel: getBuildMapRel,
            loadData: loadData,
            refresh: function () {},
            chooseSensor: chooseSensor,
        },
        mounted: function () {
            //按钮的提示
            $("[data-toggle='tooltip']").tooltip();;
        },
        watch: {}
    })

    app.getBuildMapRel();
})