//geoserver室内底图

//加载底图。将div的id设置为indoorMap

//全局的变量，代表地图。
//TODO:变成每层的地图数组，做缓存。
var GMap=null;

function loadMap(mapId) {
    //先清空GMap
    GMap=null;
    //TODO:ajax
    var mapMess = getBaseMapMock(mapId).obj;
    var url = mapMess.host + '/' + mapMess.serverType + '/' + mapMess.workspace + '/' + mapMess.requestType;
    var layersName = mapMess.workspace + ":" + mapMess.layers
    var extentBaseMap = [mapMess.x_min, mapMess.y_min, mapMess.x_max, mapMess.y_max];

    var projectionBaseMap = new ol.proj.Projection({
        code: mapMess.code,
        units: 'pixels',
        // extent: extentBaseMap,
        extent: extentBaseMap,
    });

    GMap = new ol.Map({
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

