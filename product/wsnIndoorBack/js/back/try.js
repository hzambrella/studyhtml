     var baseMap = {
         "mapId": 1,
         "code": "EPSG:404000",
         "host": "http://127.0.0.1:8083",
         "serverType": "geoserver",
         "workspace": "hzmap",
         "requestType": "wms",
         "layers": "gdata_1_1_plane",
         "x_min": -10.153,
         "x_max": 77.846,
         "y_min": 4.394,
         "y_max": 71.617,
         "zoom_default": 1.0,
         "zoom_max": 5.0,
         "zoom_min": 0.5,
     }

     var url = baseMap.host + '/' + baseMap.serverType + '/' + baseMap.workspace + '/' + baseMap.requestType;
     var layersName = baseMap.workspace + ":" + baseMap.layers
     var extentBaseMap = [baseMap.x_min, baseMap.y_min, baseMap.x_max, baseMap.y_max];
     var projectionBaseMap = new ol.proj.Projection({
         code: baseMap.code,
         units: 'pixels',
         extent: extentBaseMap,
     });

     var attribution = new ol.Attribution({
         collapsible: false
     });

     var view = new ol.View({
         projection: projectionBaseMap,
         center: ol.extent.getCenter(extentBaseMap),
         zoom: baseMap.zoom_default,
         maxZoom: baseMap.zoom_max,
         minZoom: baseMap.zoom_min,
     })

     var GMap = new ol.Map({
         target: 'indoorMap',
         layers: [
             new ol.layer.Image({
                 source: new ol.source.ImageWMS({
                     url: url,
                     projection: projectionBaseMap,
                     imageExtent: extentBaseMap,
                     serverType: baseMap.serverType,
                     params: {
                         'layers': layersName,
                     },
                     attributions: 'openlayer4',
                 })
             }),
         ],
         view: view,
     });