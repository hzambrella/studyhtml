// import networkAnchorStatus from 'back_ajax.js';
// import anchorDeploySteps from 'back_ajax.js';

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

    // var defaultSelectTarget = {
    //     "leaveTime": "",
    //     "unit": "",
    //     "targetId": 0,
    //     "createTime": "",
    //     "idCard": "",
    //     "mobile": "",
    //     "name": "",
    //     "remark": "",
    //     "bid": 0,
    //     "type": 0,
    // }


    var vdata = {
        noFloor: noFloor,
        bid: document.getElementById("bid").innerHTML,
        title: getTitle(),
        //提示信息
        mapFinishLoading: true, //地图数据是否加载完毕
        netFinishLoading: true, //网络数据是否加载完毕
        targetFinishLoading: true,
        mapMessage: '', //加载地图数据完毕后的提示
        mapLoadingMessage: '', //加载地图数据时的信息
        netMessage: '', //加载网络数据完毕后的提示
        netLoadingMessage: '', //加载网络数据时的信息
        targetMessage: '',
        targetLoadingMessage: '',
        //数据
        buildMapRel: [], //网络楼宇关系对象，后端传过来的是根据楼层的倒序
        baseMapData: defaultGisData, //底图数据
        mapDetail: defaultMapDetail, //地图详情
        currentFloor: noFloor, //当前楼层，-100000代表没选择当前楼层
        currentMapId: 0, //当前地图id
        activeFloorButton: null, //按钮组中active的按钮的element
        network: defaultNetwork, //网络对象
        targets: null,
        targetName: Status.targetName,
        selectTargetId: 0,
        trails: null,
    }

    //图层
    var trailSource = new ol.source.Vector({});
    var trailLayer = new ol.layer.Vector({
        //source: anchorSource,
        style: lineStyleFunction,
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
    //==》getNetwork-》根据不同状态，请求锚节点数据
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
        resetTrailLayerAndData()
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
                GMap.addLayer(trailLayer)
                GMap.addOverlay(popup)
                GMap.on('click', function (e) {
                    //在点击时获取像素区域
                    var pixel = GMap.getEventPixel(e.originalEvent);
                    //用featureType来区分feature的类型。
                    GMap.forEachFeatureAtPixel(pixel, function (feature) {
                        //coodinate存放了点击时的坐标信息
                        if (feature.get("featureType") == "startPoint" || feature.get("featureType") == "endPoint") {
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
        var suffix = "";
        var index = feature.get("index") ? feature.get("index") + 1 : 1;

        if (feature.get("featureType") == "startPoint") {
            $("#time-title").html("开始时间")
            $("#time-val").html(feature.get("startTime"))
            suffix = "-起点"
        }

        if (feature.get("featureType") == "endPoint") {
            $("#time-title").html("结束时间")
            $("#time-val").html(feature.get("endTime"))
            suffix = "-终点"
        }
        $("#trail-title").html("轨迹" + index + suffix)
        popup.setPosition(coordinate);
    }

    function resetNetworkData() {
        vdata.network = defaultNetwork
    }

    function netStatusAndMessage(netFinishLoading, netLoadingMessage, netMessage) {
        vdata.netFinishLoading = netFinishLoading;
        netLoadingMessage ? vdata.netLoadingMessage = netLoadingMessage : vdata.netLoadingMessage = vdata.mapLoadingMessage;
        netMessage ? vdata.netMessage = netMessage : vdata.netMessage = vdata.netMessage;
    }

    //选择楼层后，加载网络数据，然后根据步骤加载锚节点数据
    function getNetwork() {
        //TODO:ajax
        var floor = vdata.currentFloor;
        var bid = vdata.bid;
        netStatusAndMessage(false, '加载锚节点布设状态中')
        setTimeout(function () {
            vdata.network = getNetworkMock().obj;
            netStatusAndMessage(true, '', '加载完毕')
            targetStatusAndMessage(true, '', '输入时间段和关键词，点击查询按钮，即可查询目标');
            // getTargetData();
        }, 20)
    }


    //锚节点数据
    function targetStatusAndMessage(targetFinishLoading, targetLoadingMessage, targetMessage) {
        vdata.targetFinishLoading = targetFinishLoading;
        targetLoadingMessage ? vdata.targetLoadingMessage = targetLoadingMessage : vdata.targetFinishLoading = vdata.targetFinishLoading;
        targetMessage ? vdata.targetMessage = targetMessage : vdata.targetMessage = vdata.targetMessage;
    }

    //重置图层和业务数据
    function resetTrailLayerAndData() {
        trailSource.clear()
        vdata.selectTargetId = 0
    }


    //加载数据
    function getTargetData() {
        targetStatusAndMessage(false, '加载移动目标数据中')
        datePickerStartTime = $("#datePickerStartTime").val();
        datePickerEndTime = $("#datePickerEndTime").val();
        if (!datePickerStartTime || datePickerStartTime == '') {
            //var datePickerStartTime = moment().format('YYYY-MM-DD, hh:mm');
            //$("#datePickerStartTime").val('2018-11-30 12:00');
        }

        if (!datePickerEndTime || datePickerEndTime == '') {
            var datePickerEndTime = moment().format('YYYY-MM-DD, hh:mm');
            //$("#datePickerStartTime").val(datePickerEndTime);
        }

        console.log(datePickerStartTime, datePickerEndTime);
        setTimeout(function () {
            //TODO:ajax
            vdata.targets = getTargetMock();

            targetStatusAndMessage(true, '', '加载完毕，点击列表中目标的"查看轨迹"即可查看轨迹信息')
        }, 100)
    }


    //获得轨迹数据。并绘制到地图
    function getTrail(e) {
        resetTrailLayerAndData()
        targetId = $(e.target).attr("targetId")
        vdata.selectTargetId = targetId
        //TODO:ajax
        if (targetId == 2018120111) {
            trails = getTrailMock().obj;
            renderTrailDataAsFeature(trails);
        }
    }

    function renderTrailDataAsFeature(trails) {
        var trailLinesFeature = [];
        for (var i = 0; i < trails.length; i++) {
            var trail = trails[i];
            if (trail.points.length >= 2) {
                var feature = new ol.Feature({
                    geometry: new ol.geom.LineString(trail.points),
                    type: 'data',
                })
                feature.set("trailId", trail.trailId)
                feature.set("targetId", trail.targetId)
                feature.set("nid", trail.nid)
                feature.set("startTime", trail.startTime)
                feature.set("endTime", trail.endTime)
                feature.set("index", i)
                trailSource.addFeature(feature)
                //起点
                var startFeature = new ol.Feature({
                    geometry: new ol.geom.Point(trail.points[0]),
                    type: 'data',
                })
                startFeature.name = "起"
                startFeature.set("featureType", "startPoint")

                startFeature.set("trailId", trail.trailId)
                startFeature.set("targetId", trail.targetId)
                startFeature.set("nid", trail.nid)
                startFeature.set("startTime", trail.startTime)
                startFeature.set("endTime", trail.endTime)
                startFeature.set("index", i)

                trailSource.addFeature(startFeature)
                //终点
                var endFeature = new ol.Feature({
                    geometry: new ol.geom.Point(trail.points[trail.points.length - 1]),
                    type: 'data',
                })
                endFeature.name = "终"
                endFeature.set("featureType", "endPoint")

                endFeature.set("trailId", trail.trailId)
                endFeature.set("targetId", trail.targetId)
                endFeature.set("nid", trail.nid)
                endFeature.set("startTime", trail.startTime)
                endFeature.set("endTime", trail.endTime)
                endFeature.set("index", i)
                trailSource.addFeature(endFeature)

            }
        }

        trailLayer.setSource(trailSource)
    }


    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        methods: {
            getBuildMapRel: getBuildMapRel,
            loadData: loadData,
            getDetail: function () {},
            getTrail: getTrail,
            deleteTarget: function () {},
            refresh: function () {},
            getTarget: getTargetData,
        },
        mounted: function () {
            //日期插件
            DATAPICKERAPI.initDatePicker()
        },
        watch: {}
    })

    app.getBuildMapRel();
})