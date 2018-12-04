//geoserver室内底图

//加载底图。将div的id设置为indoorMap

//全局的变量，代表地图。
//TODO:变成每层的地图数组，做缓存。
var GMap = null;

function loadMap(mapId, mapMess) {
    //先清空GMap
    if (GMap != null) {
        //移除掉覆盖物和图层
        GMap.removeLayer();
        GMap.removeOverlay();
    }
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


// 锚节点的样式
var anchorFeatureStyleMap = {
    //higher anchor的layer
    'higherAnchor': new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
                color: 'blue'
            }),
            points: 5,
            radius: 10,
            radius2: 4,
            angle: 0
        })
    }),
    'higherAnchorClose': new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
                color: 'grey'
            }),
            points: 5,
            radius: 10,
            radius2: 4,
            angle: 0
        })
    }),
    'higherAnchorBreak': new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
                color: 'red'
            }),
            points: 5,
            radius: 10,
            radius2: 4,
            angle: 0
        })
    }),
    'higherAnchorSelect': new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
                color: 'yellow'
            }),
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 2
            }),
            points: 5,
            radius: 15,
            radius2: 6,
            angle: 0
        })
    }),
    //higher anchor的layer
    'anchor': new ol.style.Style({
        //点要素样式
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'blue'
            })
        })
    }),
    'anchorSelect': new ol.style.Style({
        //点要素样式
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: 'yellow'
            })
        })
    })
}

function anchorStyleFunction(feature) {
    // var anchorType = feature.get('anchorType')

    // if (anchorType){

    // }
    var style = anchorFeatureStyleMap['higherAnchor']
    switch (feature.get('status')) {
        case Status.anchorStatus.Close:
            style = anchorFeatureStyleMap['higherAnchorClose']
            break;
        case Status.anchorStatus.Open:
            style = anchorFeatureStyleMap['higherAnchor']
            break;
        case Status.anchorStatus.Break:
            style = anchorFeatureStyleMap['higherAnchorBreak']
            break
        default:
            style = anchorFeatureStyleMap['higherAnchor']
            break;
    }
    return style;
}

function anchorStyleClickFunction(feature) {
    var style;
    switch (feature.get('anchorType')) {
        case Status.anchorType.higher:
            style = anchorFeatureStyleMap['higherAnchorSelect']
            break;
        case Status.anchorType.normal:
            style = style = anchorFeatureStyleMap['anchorSelect']
            break;
    }
    return style
}

// function anchorLayer() {
//     var anchors = getAnchorMock();
//     var anHigherFeatures = [];
//     for (var index in anchors.obj) {
//         anchor = anchors.obj[index]
//         if (anchor.anchorType == 1) {
//             var feature = new ol.Feature({
//                 geometry: new ol.geom.Point([anchor.x, anchor.y]),
//                 type: 'data',
//             })
//             feature.setProperties(anchor);
//             anHigherFeatures.push(feature);
//         }
//     }

//     var sourceDataLayer = new ol.source.Vector({
//         features: anHigherFeatures,
//     });

//     var vectorDataLayer = new ol.layer.Vector({
//         source: sourceDataLayer,
//         style: anchorStyleFunction,
//     })

//     GMap.addLayer(vectorDataLayer)
// }