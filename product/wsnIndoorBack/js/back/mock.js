function getMockData(type) {
    switch (type) {
        case 'build':
            return getBuildDataMock();
        case 'map':
            return getMapDataMock();
    }
}

function getBuildDataMock() {
    return buildDataMock;
}

function getMapDataMock() {
    return mapDataMock;
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
            "y": 30.447683
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