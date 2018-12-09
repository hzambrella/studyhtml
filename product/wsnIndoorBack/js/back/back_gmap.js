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

    var view = new ol.View({
        projection: projectionBaseMap,
        center: ol.extent.getCenter(extentBaseMap),
        zoom: mapMess.zoom_default,
        maxZoom: mapMess.zoom_max,
        minZoom: mapMess.zoom_min,
    })

    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: mapMess.code,
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
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
        view: view,
        controls: ol.control.defaults().extend([mousePositionControl]),
        // control: ol.control.defaults({
        //      attribution: false
        //  }).extend([attribution])
        // control: ol.control.defaults().extend([mousePositionControl])
    });

    rotataButton()

    function rotataButton() {
        var rotataButtonTmp = "<div id='viewOperate'>" +
            "<button class='center' id='rotateLeft'>↻</button>" +
            "<button class='center' id='rotateRight'>↺</button>" +
            "</div>"
        $('#indoorMap').append(rotataButtonTmp);

        $("#rotateLeft").on('click', function () {
            view.animate({
                rotation: view.getRotation() + Math.PI / 6
            });
        })


        $("#rotateRight").on('click', function () {
            view.animate({
                rotation: view.getRotation() - Math.PI / 6
            });
        })
    }
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
    'normalAnchor': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'blue'
            })
        })
    }),
    'normalAnchorClose': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'grey'
            })
        })
    }),
    'normalAnchorBreak': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 4,
            fill: new ol.style.Fill({
                color: 'red'
            })
        })
    }),
    'normalAnchorSelect': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 8,
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'yellow'
            })
        })
    })
}


function anchorStyleFunction(feature) {
    var anchorType = feature.get('anchorType')

    if (anchorType == Status.anchorType.normal) {
        var style = anchorFeatureStyleMap['normalAnchor']
        switch (feature.get('status')) {
            case Status.anchorStatus.Close:
                style = anchorFeatureStyleMap['normalAnchorClose']
                break;
            case Status.anchorStatus.Open:
                style = anchorFeatureStyleMap['normalAnchor']
                break;
            case Status.anchorStatus.Break:
                style = anchorFeatureStyleMap['normalAnchorBreak']
                break
            default:
                style = anchorFeatureStyleMap['normalAnchor']
                break;
        }
        return style;
    }

    if (anchorType == Status.anchorType.higher) {
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
}

function anchorStyleClickFunction(feature) {
    var style;
    switch (feature.get('anchorType')) {
        case Status.anchorType.higher:
            style = anchorFeatureStyleMap['higherAnchorSelect']
            break;
        case Status.anchorType.normal:
            style = style = anchorFeatureStyleMap['normalAnchorSelect']
            break;
    }
    return style
}

//传感器样式
var sensorFeatureStyleMap = {
    //higher anchor的layer
    'sensor': new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.96],
            //crossOrigin: 'anonymous',
            src: '../fonts/iconfont/sensor32.png',
        }))
    }),
    'sensorClose': new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.96],
            //crossOrigin: 'anonymous',
            src: '../fonts/iconfont/sensor32_close.png',
        }))
    }),
    'sensorBreak': new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.96],
            //crossOrigin: 'anonymous',
            src: '../fonts/iconfont/sensor32_break.png',
        }))
    }),
    'sensorSelect': new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.96],
            //crossOrigin: 'anonymous',
            src: '../fonts/iconfont/sensor36_select.png',
        }))
    }),
    'flame': new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.96],
            //crossOrigin: 'anonymous',
            src: '../fonts/iconfont/flame32.png',
        }))
    }),
    'poison': new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.96],
            //crossOrigin: 'anonymous',
            src: '../fonts/iconfont/poison32.png',
        }))
    }),
    'smog': new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.96],
            //crossOrigin: 'anonymous',
            src: '../fonts/iconfont/smog32.png',
        }))
    }),

}

//TODO:
function sensorStyleFunction(feature) {
    var style = sensorFeatureStyleMap['sensor']
    switch (feature.get('status')) {
        case Status.anchorStatus.Close:
            style = sensorFeatureStyleMap['sensorClose']
            break;
        case Status.anchorStatus.Open:
            style = sensorFeatureStyleMap['sensor']
            break;
        case Status.anchorStatus.Break:
            style = sensorFeatureStyleMap['sensorBreak']
            break
        default:
            style = sensorFeatureStyleMap['sensor']
            break;
    }

    //险情：烟雾《毒气《火灾 (烟雾《火灾《毒气)
    var lastestData = feature.get('latestData');
    if (lastestData.id > 0) {
        if (lastestData.smog == true) {
            style = sensorFeatureStyleMap['smog']
        }
        if (lastestData.poison == true) {
            style = sensorFeatureStyleMap['poison']
        }

        if (lastestData.flame == true) {
            style = sensorFeatureStyleMap['flame']
        }


    }

    return style;
}

function sensorStyleClickFunction(feature) {
    var style = sensorFeatureStyleMap['sensorSelect'];
    var lastestData = feature.get('latestData');
    if (lastestData.id > 0) {
        if (lastestData.smog == true) {
            style = sensorFeatureStyleMap['smog']
        }
        if (lastestData.flame == true) {
            style = sensorFeatureStyleMap['flame']
        }

        if (lastestData.poison == true) {
            style = sensorFeatureStyleMap['poison']
        }
    }
    return style
}

var lineColorMap = ["#00b514", "#9933FF", "#FF9900", "#3366CC", "#99CC33", "#FF0033", "#663300"]

function lineStyleFunction(feature) {
    var pointColor = "#99CC33";
    var lineIndex = feature.get("index") ? feature.get("index") : 0
    if (feature.get("featureType") == "endPoint") {
        pointColor = "red"
    }

    return new ol.style.Style({
        image: new ol.style.Circle({
            radius: 15,
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: pointColor,
            })
        }),
        stroke: new ol.style.Stroke({
            width: 4,
            color: lineColorMap[lineIndex % lineColorMap.length],
            //lineDash: [10, 8],
        }),
        text: new ol.style.Text({
            text: feature.name,
            font: "bold 13px 微软雅黑",
            fill: new ol.style.Fill({
                color: 'white'
            }),
            textAlign: "center",
            textBaseline: "middle"
        })
    })
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