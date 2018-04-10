//``Feature样式style生成``
createFeatureStyle = {
    //数据层的layer
    forDataLayer: function () {
        return new ol.style.Style({
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
                radius: 7,
                fill: new ol.style.Fill({
                    color: 'blue'
                })
            })
        })
    },
    //可绘制层的drawable
    forInteraction: function () {
        return new ol.style.Style({
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
        })
    }
}

//``overlay相关``
var overlayCommon = {
    //添加一个overlay,coordinate,坐标，[x,y],name:名字,id:id
    //type:overlay类型
    //default: blank
    //head:带箭头的
    add: function (coordinate, name, id, type) {
        coordinate == null ? coordinate = [0, 0] : coordinate = coordinate;
        name == null ? name = '' : name = name;
        var el = document.createElement('div')
        el.className = 'marker'
        if (id != null) el.id = id;
        type == null ? type = 'default' : type = type;
        el.title = '标注点'
        labelEl = document.getElementById('label')
        labelEl.appendChild(el)

        var imgEl = document.createElement('img')
        imgEl.addClass = "overlay"
        switch (type) {
            case 'default':
                imgEl.src = 'images/geolocation_marker.png';
            case 'head':
                imgEl.src = 'images/geolocation_marker_heading.png';
                break;
            default:
                imgEl.src = 'images/geolocation_marker.png';
        }


        el.appendChild(imgEl)

        var nameel = document.createElement('span')
        nameel.className = 'address'
        nameel.innerText = name
        el.appendChild(nameel)

        var marker = new ol.Overlay({
            position: coordinate,
            positioning: 'center-center',
            element: el,
            stopEvent: false,
        })
        map.addOverlay(marker)
        return marker
    },
    //旋转overlay  overlay是ol.Overlay angle是度为单位的角度，如30度就是30
    rotate: function (overlay, angle) {
        $imgEl = $(overlay.getElement()).find('img')
        commonTool.rotateImg($imgEl, angle)
    }
}


//``地图``
//```底图层```
//坐标系
var x_min = 0,
    x_max = 100,
    y_min = 0,
    y_max = 100;

var p1 = [50, 50],
    p2 = [40, 30],
    locMockInit = [10, 20];
var extentBaseMap = [x_min, y_min, x_max, y_max];

var projectionBaseMap = new ol.proj.Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extentBaseMap,
});

// var mousePositionControl = new ol.control.MousePosition({
//   // coordinateFormate: ol.coordinate.createStringXY(4),
//   // projection: 'EPSG:4326',
//   // className: 'custom-mouse-position',
//   target: document.getElementById("mousePosition"),
//   undefinedHTML: '&nbsp',
// })

var map = new ol.Map({
    target: 'hzMapTest',
    layers: [
        new ol.layer.Image({
            source: new ol.source.ImageStatic({
                url: 'demo.png', //这里添加静态图片的地址
                projection: projectionBaseMap,
                imageExtent: extentBaseMap,
                attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
            })
        }),
    ],
    view: new ol.View({
        projection: projectionBaseMap,
        center: ol.extent.getCenter(extentBaseMap),
        zoom: 2,
        maxZoom: 5,
        minZoom: 1.2,
    }),
    // control: ol.control.defaults().extend([mousePositionControl])
});

// 小方格
// var graticule=new ol.Graticule({
//     map:map,
// })


//```可绘制层```
var sourceDrawable, //ol.source.Vector()
    vectorDrawable,
    drawable;

//```数据层```

var pointFeatureToTest1 = new ol.Feature(new ol.geom.Point(p1));
var pointFeatureToTest2 = new ol.Feature(new ol.geom.Point(p2));
var lineFeatureToTest = new ol.Feature(new ol.geom.LineString([
    p1,
    p2
]));

// feature click无效
// pointFeatureToTest1.on('click', function () {
//     alert(1)
// })

var sourceDataLayer = new ol.source.Vector({
    features: [pointFeatureToTest1, lineFeatureToTest],
});

var vectorDataLayer = new ol.layer.Vector({
    source: sourceDataLayer,
    style: createFeatureStyle.forDataLayer(),
})

sourceDataLayer.addFeature(pointFeatureToTest2);

//创建Feature选择器 无效
// var sf = new ol.Control.SelectFeature(vectorDataLayer);
// map.addControl(sf)
// sf.active()
// sf.onSelect=function(feature){
//     console.log("feature select:",feature)
// }

// sf.onUnselect=function(feature){
//     console.log("feature select cancel:",feature)
// }

//``事件监听``
//地图上的按钮事件监听
var operateFlag = {
    //是否可绘制
    drawingFlag: false,
    // dataFlag: false,
    // locationFlag: false,
}


document.getElementById("rotateLeft").onclick = function () {
    var view = map.getView();
    view.setRotation(view.getRotation() - Math.PI / 6);
}

document.getElementById("rotateRight").onclick = function () {
    var view = map.getView();
    view.setRotation(view.getRotation() + Math.PI / 6);
}

$("#interaction").click(function (event) {
    $this = $(this)
    if (operateFlag.drawingFlag) {
        map.removeInteraction(drawable);
        sourceDrawable = null;
        vectorDrawable.setSource(sourceDrawable);
        $this.removeClass("drawing");
        $this.text("画图")
        operateFlag.drawingFlag = false
        $("#drawResult").text("");
    } else {
        if (null == sourceDrawable) {
            sourceDrawable = new ol.source.Vector();
        }

        if (null == vectorDrawable) {
            vectorDrawable = new ol.layer.Vector({
                source: sourceDrawable,
            });
            map.addLayer(vectorDrawable);
        } else {
            vectorDrawable.setSource(sourceDrawable);
        }

        drawable = new ol.interaction.Draw({
            source: sourceDrawable,
            type: 'Polygon',
            style: createFeatureStyle.forInteraction(),
            maxPoints: 4,
        })
        map.addInteraction(drawable);
        drawable.on('drawend', function (event) {
            currentFeature = event.feature; //获得当前绘制的要素
            var geo = currentFeature.getGeometry(); //获得要素的几何信息
            var coordinates = geo.getCoordinates(); //获得几何坐标
            $("#drawResult").text(JSON.stringify(coordinates));
        })
        operateFlag.drawingFlag = true
        $this.text("清空")
    }
})

$("#drawPointFromData").click(function (event) {
    if (!this.checked) {
        map.removeLayer(vectorDataLayer)
    } else {
        map.addLayer(vectorDataLayer)
    }
})

var mockLocationTimer;
$('#location').click(function (event) {
    if (!this.checked) {
        map.getOverlays().clear()
        clearInterval(mockLocationTimer);
    } else {
        var marker = overlayCommon.add(locMockInit, 'haha',null,'head')
        overlayCommon.rotate(marker,45)
        mockLocationTimer = setInterval(function () {
            var po = marker.getPosition();
            marker.setPosition([po[0] + 10, po[1] + 10]);
        }, 1000)
    }
})

//地图事件监听
// map.on('click', function (event) {
//     console.log(event.coordinate)
// })