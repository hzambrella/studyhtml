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

    var vdata = {
        noFloor: noFloor,
        bid: document.getElementById("bid").innerHTML,
        title: getTitle(),
        //提示信息
        mapFinishLoading: true, //地图数据是否加载完毕
        netFinishLoading: true, //网络数据是否加载完毕
        mapMessage: '', //加载地图数据完毕后的提示
        mapLoadingMessage: '', //加载地图数据时的信息
        netMessage: '', //加载网络数据完毕后的提示
        netLoadingMessage: '', //加载网络数据时的信息
        //数据
        buildMapRel: [], //网络楼宇关系对象，后端传过来的是根据楼层的倒序
        baseMapData: defaultGisData, //底图数据
        mapDetail: defaultMapDetail, //地图详情
        currentFloor: noFloor, //当前楼层，-100000代表没选择当前楼层
        currentMapId: 0, //当前地图id
        activeFloorButton: null, //按钮组中active的按钮的element
        network: defaultNetwork, //网络对象
    }

    //图层
    // var anchorSource = new ol.source.Vector({});
    // var anchorLayer = new ol.layer.Vector({
    //     //source: anchorSource,
    //     style: anchorStyleFunction,
    // })

    // var lastSelectFeature = null;

    //select
    /*
    var selectClick = new ol.interaction.Select({
        condition: ol.events.condition.click,
        sytle: anchorFeatureStyleMap['higherAnchorSelect']
    });

    selectClick.on('select', function (e) {
        //console.log(e.target.getFeatures());
    });
    */


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
        // resetAnchorLayer()
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
                // GMap.addLayer(anchorLayer)
                // GMap.addLayer(highAnchorLayer)
                //  GMap.addInteraction(selectClick);
                GMap.on('click', function (e) {
                    //在点击时获取像素区域
                    var pixel = GMap.getEventPixel(e.originalEvent);
                    //用featureType来区分feature的类型。
                    GMap.forEachFeatureAtPixel(pixel, function (feature) {
                        //coodinate存放了点击时的坐标信息
                        // if (feature.get('featureType') == 'anchor' + Status.anchorType.higher ||
                        //     feature.get('featureType') == 'anchor' + Status.anchorType.normal) {
                        //     vdata.selectAnchor = {};
                        //     vdata.selectAnchor.anchorId = feature.get("anchorId")
                        //     // selectAnchor.nid = feature.get("nid")
                        //     // selectAnchor.bid = feature.get("bid")
                        //     // selectAnchor.floor = feature.get("floor")
                        //     vdata.selectAnchor.anchorType = feature.get("anchorType")
                        //     vdata.selectAnchor.status = feature.get("status")
                        //     vdata.selectAnchor.x = feature.get("x")
                        //     vdata.selectAnchor.y = feature.get("y")
                        //     vdata.selectAnchor.sn = feature.get("sn")
                        //     vdata.selectAnchor.createTime = feature.get("createTime")
                        //     vdata.selectAnchor.updateTime = feature.get("updateTime")
                        //     vdata.selectAnchor.energy = feature.get("energy")
                        //     if (lastSelectFeature) {
                        //         lastSelectFeature.setStyle(anchorStyleFunction(lastSelectFeature));
                        //     }

                        //     feature.setStyle(anchorStyleClickFunction(feature))
                        //     lastSelectFeature = feature
                        // }
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

            //加载节点数据
            //getAnchorData()
        }, 20)
    }


    //锚节点数据
    // function anchorStatusAndMessage(anchorFinishLoading, anchorLoadingMessage, anchorMessage) {
    //     vdata.anchorFinishLoading = anchorFinishLoading;
    //     anchorLoadingMessage ? vdata.anchorLoadingMessage = anchorLoadingMessage : vdata.anchorFinishLoading = vdata.anchorFinishLoading;
    //     anchorMessage ? vdata.anchorMessage = anchorMessage : vdata.anchorMessage = vdata.anchorMessage;
    // }

    //重置图层
    // function resetAnchorLayer() {
    //     anchorSource.clear()
    //     highAnchorSource.clear()
    //     vdata.showHigherAnchor = false;
    //     vdata.showNormalAnchor = false;
    //     vdata.selectAnchor = defaultSelectAnchor
    // }

    //加载数据
    // function getAnchorData() {
    //     if (vdata.network.anchorStatus >= vdata.networkAnchorStatus.broadcast) {
    //         anchorStatusAndMessage(false, '加载锚节点数据中')
    //         setTimeout(function () {
    //             //TODO:ajax
    //             vdata.anchors = getAnchorMock();
    //             renderAnchorDataAsGFeature();
    //             anchorStatusAndMessage(true, '', '加载完毕，点击地图中的要素即可查看信息')
    //         }, 100)
    //     }
    // }

    // function renderAnchorDataAsGFeature() {
    //     resetAnchorLayer()

    //     var anchors = vdata.anchors
    //     var anHigherFeatures = [];
    //     var anFeatures = [];
    //     for (var index in anchors.obj) {
    //         anchor = anchors.obj[index]
    //         var feature = new ol.Feature({
    //             geometry: new ol.geom.Point([anchor.x, anchor.y]),
    //             type: 'data',
    //         })

    //         feature.setProperties(anchor);
    //         //用featureType来区分feature的类型。
    //         feature.set('featureType', 'anchor' + anchor.anchorType)
    //         if (anchor.anchorType == Status.anchorType.higher) {
    //             anHigherFeatures.push(feature);
    //         }

    //         if (anchor.anchorType == Status.anchorType.normal) {
    //             anFeatures.push(feature);
    //         }
    //     }
    //     anchorSource.addFeatures(anFeatures)
    //     highAnchorSource.addFeatures(anHigherFeatures)
    // }

    // function showHigherAnchor(val, oldval) {
    //     if (val) {
    //         if (vdata.network.anchorStatus < vdata.networkAnchorStatus.broadcast) {
    //             return
    //         } else {
    //             highAnchorLayer.setSource(highAnchorSource);
    //         }
    //     } else {
    //         if (vdata.selectAnchor.anchorType == Status.anchorType.higher) {
    //             vdata.selectAnchor = defaultSelectAnchor;
    //         }
    //         highAnchorLayer.setSource(null);
    //     }
    // }

    // function showNormalAnchor(val, oldval) {
    //     if (val) {
    //         if (vdata.network.anchorStatus < vdata.networkAnchorStatus.broadcast) {
    //             return
    //         } else {
    //             anchorLayer.setSource(anchorSource);
    //         }
    //     } else {
    //         if (vdata.selectAnchor.anchorType == Status.anchorType.normal) {
    //             vdata.selectAnchor = defaultSelectAnchor;
    //         }
    //         anchorLayer.setSource(null);
    //     }
    // }


    // function moreAnchorInfo() {
    //     console.log(vdata.selectAnchor)
    // }

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        methods: {
            getBuildMapRel: getBuildMapRel,
            loadData: loadData,
            refresh: function () {},
        },
        mounted: function () {},
        watch: {}
    })

    app.getBuildMapRel();
})