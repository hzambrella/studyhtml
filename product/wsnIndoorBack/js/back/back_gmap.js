//geoserver室内底图

//加载底图。将div的id设置为indoorMap

//全局的变量，代表地图。
//TODO:变成每层的地图数组，做缓存。
var GMap = null;

function loadMap(mapId, mapMess) {
    //先清空GMap
    document.getElementById('indoorMap').innerHTML = '';
    GMap = null;
    //TODO:ajax

    var url = mapMess.host + '/' + mapMess.serverType + '/' + mapMess.workspace + '/' + mapMess.requestType;
    var layersName = mapMess.workspace + ":" + mapMess.layers
    var extentBaseMap = [mapMess.x_min, mapMess.y_min, mapMess.x_max, mapMess.y_max];

    var projectionBaseMap = new ol.proj.Projection({
        code: mapMess.code,
        units: 'pixels',
        // extent: extentBaseMap,
        extent: extentBaseMap,
    });

    var attribution = new ol.Attribution({
        collapsible: false
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
                    attributions: 'openlayer4',
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
        // control: ol.control.defaults({
        //      attribution: false
        //  }).extend([attribution])
        // control: ol.control.defaults().extend([mousePositionControl])
    });

    anchorLayer()
}

//``Feature样式style生成``
var featureStyleMap = {
    //数据层的layer
    'data': new ol.style.Style({
        //填充样式
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        //边界样式
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 3
        }),
        //点要素样式
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'blue'
            })
        })
    }),
    //可绘制层的drawable
    'interaction': new ol.style.Style({
        //填充样式
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        //边界样式
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        //点要素样式
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    }),
    //选中效果
    'selected': new ol.style.Style({
        //填充样式
        fill: new ol.style.Fill({
            color: 'orange'
        }),
        //边界样式
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 2
        }),
        //点要素样式
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: 'yellow'
            })
        })
    })
}



function anchorLayer() {
    var anchors = getAnchorMock();
    var anHigherFeatures = [];
    for (var index in anchors.obj) {
        anchor=anchors.obj[index]
        if (anchor.anchorType == 1) {
            console.log(1)
            anHigherFeatures.push(new ol.Feature({
                geometry: new ol.geom.Point([anchor.x, anchor.y]),
                type: 'data',
            }));
        }
    }

    console.log(anHigherFeatures)

    var sourceDataLayer = new ol.source.Vector({
        features: anHigherFeatures,
    });

    var vectorDataLayer = new ol.layer.Vector({
        source: sourceDataLayer,
        style: featureStyleMap['data'],
    })

    GMap.addLayer(vectorDataLayer)

}