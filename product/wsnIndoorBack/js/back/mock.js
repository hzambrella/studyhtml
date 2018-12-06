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

function getBaseMapDataMock() {
    return baseMapMock;
}

function getMapDetailMock() {
    return mapDetailMock;
}

function getNetDevComMock() {
    return netComDevMock;
}

function getBuildMapRelMock() {
    return buildMapRelMock;
}

function getNetworkMock() {
    return networkMock;
}

function getNetworksMock() {
    return networksMock;
}


function getAnchorMock() {
    return anchorMock;
}

function getSensorMock() {
    return sensorMock;
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
        }],
        "sinks": [{
            "sinkId": 1,
            "status": 1,
            "sn": "SAE8601001",
            "bid": 1
        }]
    }
}

var buildMapRelMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": [{
        "bid": 1,
        "floor": 4,
        "mapId": 1
    }]
}

var networkMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": {
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "coorId": 1,
        "comStatus": 1,
        "anchorStatus": 6,
        "anchorTaskStatus": 0,
        "coordinator": null
    }
}

var networksMock = {
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
            "nid": 1,
            "bid": 1,
            "floor": 4,
            "coorId": 1,
            "comStatus": 1,
            "anchorStatus": 4,
            "anchorTaskStatus": 0,
            "coordinator": {
                "coorId": 1,
                "status": 1,
                "sn": "CAE8601001",
                "bid": 1,
                "nid": 1,
                "floor": 4,
                "panId": null
            }
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

var anchorMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": [{
        "anchorId": 1009,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": 2.8466132,
        "y": 6.6170993,
        "sn": "AAE861009",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1010,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": 2.8465893,
        "y": 60.6171,
        "sn": "AAE861010",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1011,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": -0.15338664,
        "y": 63.60655,
        "sn": "AAE861011",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1021,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": -0.15358947,
        "y": 3.6065476,
        "sn": "AAE861021",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1033,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": 74.84659,
        "y": 60.6171,
        "sn": "AAE861033",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1034,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": 77.84661,
        "y": 63.6171,
        "sn": "AAE861034",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1058,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": 74.84661,
        "y": 6.5964355,
        "sn": "AAE861058",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1071,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 1,
        "status": 1,
        "x": 77.84659,
        "y": 3.595996,
        "sn": "AAE861071",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1001,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.846592,
        "y": 54.6171,
        "sn": "AAE861001",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1002,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.8465946,
        "y": 48.6171,
        "sn": "AAE861002",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1003,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.8465972,
        "y": 42.6171,
        "sn": "AAE861003",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1004,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.8466,
        "y": 36.6171,
        "sn": "AAE861004",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1005,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.8466027,
        "y": 30.6171,
        "sn": "AAE861005",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1006,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.8466053,
        "y": 24.6171,
        "sn": "AAE861006",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1007,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.846608,
        "y": 18.6171,
        "sn": "AAE861007",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1008,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 2.8466105,
        "y": 12.6171,
        "sn": "AAE861008",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1012,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15340692,
        "y": 57.60655,
        "sn": "AAE861012",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1013,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.1534272,
        "y": 51.60655,
        "sn": "AAE861013",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1014,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15344748,
        "y": 45.60655,
        "sn": "AAE861014",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1015,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15346777,
        "y": 39.60655,
        "sn": "AAE861015",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1016,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15348805,
        "y": 33.60655,
        "sn": "AAE861016",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1017,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15350834,
        "y": 27.606548,
        "sn": "AAE861017",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1018,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15352862,
        "y": 21.606548,
        "sn": "AAE861018",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1019,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15354891,
        "y": 15.606547,
        "sn": "AAE861019",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1020,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": -0.15356919,
        "y": 9.606547,
        "sn": "AAE861020",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1022,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 8.846589,
        "y": 60.6171,
        "sn": "AAE861022",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1023,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 14.846589,
        "y": 60.6171,
        "sn": "AAE861023",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1024,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 20.84659,
        "y": 60.6171,
        "sn": "AAE861024",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1025,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 26.84659,
        "y": 60.6171,
        "sn": "AAE861025",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1026,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 32.84659,
        "y": 60.6171,
        "sn": "AAE861026",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1027,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 38.84659,
        "y": 60.6171,
        "sn": "AAE861027",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1028,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 44.84659,
        "y": 60.6171,
        "sn": "AAE861028",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1029,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 50.84659,
        "y": 60.6171,
        "sn": "AAE861029",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1030,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 56.84659,
        "y": 60.6171,
        "sn": "AAE861030",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1031,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 62.84659,
        "y": 60.6171,
        "sn": "AAE861031",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1032,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 68.84659,
        "y": 60.6171,
        "sn": "AAE861032",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1035,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 71.84661,
        "y": 63.616287,
        "sn": "AAE861035",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1036,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 65.84661,
        "y": 63.615475,
        "sn": "AAE861036",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1037,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 59.84661,
        "y": 63.614666,
        "sn": "AAE861037",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1038,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 53.84661,
        "y": 63.613853,
        "sn": "AAE861038",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1039,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 47.84661,
        "y": 63.61304,
        "sn": "AAE861039",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1040,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 41.846615,
        "y": 63.61223,
        "sn": "AAE861040",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1041,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 35.846615,
        "y": 63.611416,
        "sn": "AAE861041",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1042,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 29.846613,
        "y": 63.610607,
        "sn": "AAE861042",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1043,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 23.846613,
        "y": 63.609795,
        "sn": "AAE861043",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1044,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 17.846613,
        "y": 63.608982,
        "sn": "AAE861044",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1045,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 11.846613,
        "y": 63.60817,
        "sn": "AAE861045",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1046,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 5.8466134,
        "y": 63.60736,
        "sn": "AAE861046",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1047,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 8.846613,
        "y": 6.6061077,
        "sn": "AAE861047",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1048,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 14.846613,
        "y": 6.6052284,
        "sn": "AAE861048",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1049,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 20.846613,
        "y": 6.604349,
        "sn": "AAE861049",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1050,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 26.846613,
        "y": 6.60347,
        "sn": "AAE861050",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1051,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 32.84661,
        "y": 6.6025906,
        "sn": "AAE861051",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1052,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 38.84661,
        "y": 6.6017113,
        "sn": "AAE861052",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1053,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 44.84661,
        "y": 6.600832,
        "sn": "AAE861053",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1054,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 50.84661,
        "y": 6.5999527,
        "sn": "AAE861054",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1055,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 56.84661,
        "y": 6.5990734,
        "sn": "AAE861055",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1056,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 62.84661,
        "y": 6.598194,
        "sn": "AAE861056",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1057,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 68.84661,
        "y": 6.597315,
        "sn": "AAE861057",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1059,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 5.84659,
        "y": 3.6057358,
        "sn": "AAE861059",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1060,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 11.84659,
        "y": 3.6049242,
        "sn": "AAE861060",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1061,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 17.84659,
        "y": 3.6041126,
        "sn": "AAE861061",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1062,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 23.84659,
        "y": 3.6033008,
        "sn": "AAE861062",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1063,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 29.84659,
        "y": 3.6024892,
        "sn": "AAE861063",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1064,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 35.84659,
        "y": 3.6016774,
        "sn": "AAE861064",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1065,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 41.84659,
        "y": 3.6008658,
        "sn": "AAE861065",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1066,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 47.84659,
        "y": 3.6000543,
        "sn": "AAE861066",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1067,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 53.84659,
        "y": 3.5992424,
        "sn": "AAE861067",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1068,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 59.84659,
        "y": 3.5984309,
        "sn": "AAE861068",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1069,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 65.84659,
        "y": 3.597619,
        "sn": "AAE861069",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }, {
        "anchorId": 1070,
        "nid": 1,
        "bid": 1,
        "floor": 4,
        "anchorType": 0,
        "status": 1,
        "x": 71.84659,
        "y": 3.5968075,
        "sn": "AAE861070",
        "energy": 90,
        "createTime": "2018年12月04日 02:39",
        "updateTime": "2018年12月04日 02:39"
    }]
}

var sensorMock = {
    "code": 0,
    "message": "操作成功",
    "success": true,
    "map": {},
    "obj": [{
        "sid": 1001,
        "sn": "SNAE861001",
        "nid": 1,
        "status": 1,
        "energy": 23,
        "sensorType": 0,
        "hasLocation": true,
        "x": 2.611216,
        "y": 59.61605,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 77,
            "sid": 1001,
            "temperature": 6.0,
            "humidity": 49,
            "lux": 5,
            "flame": true,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1002,
        "sn": "SNAE861002",
        "nid": 1,
        "status": 1,
        "energy": 83,
        "sensorType": 0,
        "hasLocation": true,
        "x": 18.396372,
        "y": 62.28504,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 80,
            "sid": 1002,
            "temperature": 6.0,
            "humidity": 47,
            "lux": 9,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1003,
        "sn": "SNAE861003",
        "nid": 1,
        "status": 1,
        "energy": 19,
        "sensorType": 0,
        "hasLocation": true,
        "x": 40.52669,
        "y": 62.17276,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 83,
            "sid": 1003,
            "temperature": 9.0,
            "humidity": 46,
            "lux": 13,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1004,
        "sn": "SNAE861004",
        "nid": 1,
        "status": 1,
        "energy": 36,
        "sensorType": 0,
        "hasLocation": true,
        "x": 59.1094,
        "y": 62.17276,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 86,
            "sid": 1004,
            "temperature": 9.0,
            "humidity": 46,
            "lux": 10,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1005,
        "sn": "SNAE861005",
        "nid": 1,
        "status": 1,
        "energy": 55,
        "sensorType": 0,
        "hasLocation": true,
        "x": 74.69863,
        "y": 62.04899,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 89,
            "sid": 1005,
            "temperature": 6.0,
            "humidity": 46,
            "lux": 5,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1006,
        "sn": "SNAE861006",
        "nid": 1,
        "status": 1,
        "energy": 73,
        "sensorType": 0,
        "hasLocation": true,
        "x": 1.5299971,
        "y": 43.298817,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 92,
            "sid": 1006,
            "temperature": 6.0,
            "humidity": 48,
            "lux": 8,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1007,
        "sn": "SNAE861007",
        "nid": 1,
        "status": 1,
        "energy": 97,
        "sensorType": 0,
        "hasLocation": true,
        "x": 1.2418463,
        "y": 24.52682,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 95,
            "sid": 1007,
            "temperature": 8.0,
            "humidity": 46,
            "lux": 12,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1008,
        "sn": "SNAE861008",
        "nid": 1,
        "status": 1,
        "energy": 17,
        "sensorType": 0,
        "hasLocation": true,
        "x": 1.771363,
        "y": 5.918016,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 98,
            "sid": 1008,
            "temperature": 5.0,
            "humidity": 46,
            "lux": 12,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1009,
        "sn": "SNAE861009",
        "nid": 1,
        "status": 1,
        "energy": 88,
        "sensorType": 0,
        "hasLocation": true,
        "x": 15.168113,
        "y": 5.115444,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 101,
            "sid": 1009,
            "temperature": 6.0,
            "humidity": 46,
            "lux": 9,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1010,
        "sn": "SNAE861010",
        "nid": 1,
        "status": 1,
        "energy": 73,
        "sensorType": 0,
        "hasLocation": true,
        "x": 33.10019,
        "y": 5.255845,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 104,
            "sid": 1010,
            "temperature": 5.0,
            "humidity": 48,
            "lux": 7,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1011,
        "sn": "SNAE861011",
        "nid": 1,
        "status": 1,
        "energy": 32,
        "sensorType": 0,
        "hasLocation": true,
        "x": 51.642525,
        "y": 5.3026457,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 107,
            "sid": 1011,
            "temperature": 6.0,
            "humidity": 45,
            "lux": 6,
            "flame": false,
            "smog": true,
            "poison": true,
            "createTime": "2018年12月05日 18:04"
        }
    }, {
        "sid": 1012,
        "sn": "SNAE861012",
        "nid": 1,
        "status": 1,
        "energy": 39,
        "sensorType": 0,
        "hasLocation": true,
        "x": 72.67281,
        "y": 5.1622443,
        "createTime": "2018年12月05日 18:04",
        "updateTime": "2018年12月05日 18:04",
        "latestData": {
            "id": 110,
            "sid": 1012,
            "temperature": 6.0,
            "humidity": 48,
            "lux": 9,
            "flame": false,
            "smog": false,
            "poison": false,
            "createTime": "2018年12月05日 18:04"
        }
    }]
}