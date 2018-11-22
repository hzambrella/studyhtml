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

    var app = new Vue({
        el: "#mainbox",
        data: {
            mapId: $("mapId").html(),
            finishLoading: true,
            title: '地图详情和修改',
            items: {},
            baseMapData: defaultGisData,
            mapDetail: defaultMapDetail,
            floor: [],
        },
        methods: {
            back: routerBack
        }
    })

    getData(1); //首次加载页面时

    function getData(mapId) {
        app.finishLoading = false;
        //TODO:ajax
        setTimeout(function () {
            app.mapDetail = getMapDetailMock().obj
            //右边信息栏，显示第一个标签页
            $('#mapDataTab li:eq(0) a').tab('show');
            floorButton();
            getBaseMapData(mapId)
        }, 20)
    }

    function getBaseMapData(mapId) {
        setTimeout(function () {
            app.baseMapData = loadMap()
            app.finishLoading = true
        }, 20)
    }

    function floorButton() {
        floor = new Array();
        for (i = app.mapDetail.height; i > 0; i--) {
            floor.push(i + "F");
        }
        app.floor = floor
    }

    function loadMap() {
        var mapMess = getBaseMapMock().obj;
        var url = mapMess.host + '/' + mapMess.serverType + '/' + mapMess.workspace + '/' + mapMess.requestType;
        var layersName = mapMess.workspace + ":" + mapMess.layers
        var extentBaseMap = [mapMess.x_min, mapMess.y_min, mapMess.x_max, mapMess.y_max];

        var projectionBaseMap = new ol.proj.Projection({
            code: mapMess.code,
            units: 'pixels',
            // extent: extentBaseMap,
            extent: extentBaseMap,
        });

        var map = new ol.Map({
            target: 'indoorMap',
            layers: [
                new ol.layer.Image({
                    source: new ol.source.ImageWMS({
                        url: url,
                        projection: projectionBaseMap,
                        imageExtent: extentBaseMap,
                        serverType: mapMess.serverType,
                        params: {
                            'layers': layersName,
                        },
                        // crossOrigin: 'anonymous'
                    })
                }),
            ],
            view: new ol.View({
                projection: projectionBaseMap,
                center: ol.extent.getCenter(extentBaseMap),
                zoom: mapMess.zoom_default,
                maxZoom: mapMess.zoom_max,
                minZoom: mapMess.zoom_min,
            }),
            // control: ol.control.defaults().extend([mousePositionControl])
        });
        return mapMess;
    }
})