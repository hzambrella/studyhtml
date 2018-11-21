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
        "mapId": 1,
        "title": "教学楼2号-4F",
        "status": 1,
        "descrip": "",
        "createTime": "2018年11月14日\n\t\t05:22",
        "updateTime": "2018年11月14日 05:22",
        "floor": 4,
        "height": 6,
        "buildName": "教学楼2号",
        "bid": 1
    }

    var app = new Vue({
        el: "#app",
        data: {
            mapId: $("mapId").html(),
            finishLoading: true,
            title: '地图详情和修改',
            items: {},
            baseMapData: defaultGisData,
            mapDetail: defaultMapDetail,
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
            $('#mapDataTab li:eq(0) a').tab('show');
            getBaseMapData(mapId)
        }, 20)
    }

    function getBaseMapData(mapId) {
        setTimeout(function () {
            app.baseMapData = loadMap()
            app.finishLoading = true
        }, 20)
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