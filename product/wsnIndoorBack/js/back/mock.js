function getMockData(type) {
    switch (type) {
        case 'build':
            return getBuildDataMock();
        case 'map':
            return getMapDataMock();
    }
}

function getMapMessMockData() {
    return mapMessMock;
}


function getBuildDataMock() {
    return buildDataMock;
}

function getMapDataMock() {
    return mapDataMock;
}

function getBaseMapMock() {
    return baseMapMock;
}

function getMapDetailMock() {
    return mapDetailMock;
}

function getNetDevComMock() {
    return netComDevMock;
}

//url: 'http://127.0.0.1:8083/geoserver/hzmap/wms',
var mapMessMock = {
    code: 'EPSG:404000',
    host: 'http://127.0.0.1:8083',
    serverType: 'geoserver',
    workspace: 'hzmap',
    requestType: 'wms',
    layers: 'gdata_1_1_plane',
    x_min: -10.153,
    y_min: 4.394,
    x_max: 77.846,
    y_max: 71.617,
    zoom_default: 1,
    zoom_max: 5,
    zoom_min: 1.2,
}


var buildDataMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {
        "pageNum": 1,
        "pageSize": 1,
        "size": 1,
        "orderBy": null,
        "startRow": 0,
        "endRow": 0,
        "total": 1,
        "pages": 1,
        "list": [{
            "bid": 1,
            "descrip": "测试",
            "address": "湖北省武汉市某某区",
            "name": "教学楼2号",
            "x": 114.271241,
            "y": 30.447683,
            "height": 6,
        }],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [1]
    }
}

var mapDataMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {
        "pageNum": 1,
        "pageSize": 2,
        "size": 2,
        "orderBy": null,
        "startRow": 0,
        "endRow": 1,
        "total": 2,
        "pages": 1,
        "list": [{
            "mapId": 1,
            "title": "教学楼2号-4F",
            "status": 1,
            "descrip": "",
            "createTime": "2018年11月14日 05:22",
            "updateTime": "2018年11月14日 05:22",
            "floor": 4,
            "buildName": "教学楼2号",
            "bid": 1
        }, {
            "mapId": 2,
            "title": "教学楼2号-4F(废弃)",
            "status": 0,
            "descrip": "",
            "createTime": "2018年11月19日 08:05",
            "updateTime": "2018年11月19日 08:05",
            "floor": 0,
            "buildName": null,
            "bid": 0
        }],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [1]
    }
}

var baseMapMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {
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
        "zoom_min": 1.2
    }
}

var mapDetailMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {
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
}

var netComDevMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {
        "coordinators": [{
            "coorId": 1,
            "status": 1,
            "sn": "CAE8601001",
            "bid": 1,
            "nid": 1,
            "floor": 4
        }, {
            "coorId": 1,
            "status": 1,
            "sn": "CAE8601001",
            "bid": 1,
            "nid": 1,
            "floor": 4
        }, {
            "coorId": 1,
            "status": 1,
            "sn": "CAE8601001",
            "bid": 1,
            "nid": 1,
            "floor": 4
        },{
            "coorId": 1,
            "status": 1,
            "sn": "CAE8601001",
            "bid": 1,
            "nid": 1,
            "floor": 4
        },{
            "coorId": 1,
            "status": 1,
            "sn": "CAE8601001",
            "bid": 1,
            "nid": 1,
            "floor": 4
        }],
        "sinks": [{
            "sinkId": 1,
            "status": 1,
            "sn": "SAE8601001",
            "bid": 1
        }]
    }
}