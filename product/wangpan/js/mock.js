function getMockData(type) {
    switch (type) {
        case "allFile":
            return getAllFileData();
        case "textFile":
            return getTextFileData();
        case "imageFile":
            return getImgFileData();
        case "recycleFile":
            return getRecycleFileData();
    }

    function getAllFileData() {
        var device_data = {
            resultList: [{
                name: "row 1, cell 1123133333333333333333333333333333333",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "row 1, cell 1123133333333333333333333333333333333",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "1232131",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "1232131",
                size: "100KB",
                modified_time: "2018-03-14",
            }, ]
        };
        return device_data;
    }

    function getImgFileData() {
        var device_data = {
            resultList: [{
                name: "img",
                size: "100M",
                modified_time: "2018-03-14",
            }]
        };
        return device_data;
    }

    function getTextFileData() {
        var device_data = {
            resultList: [{
                name: "text1",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "text2",
                size: "100KB",
                modified_time: "2018-03-14",
            }]
        };
        return device_data;
    }

    function getRecycleFileData() {
        var device_data = {
            resultList: [{
                name: "recy1",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "recy1 row 1, cell 1123133333333333333333333333333333333",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "1232131",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "1232131",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "recy1 row 1, cell 1123133333333333333333333333333333333",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "recy1 row 1, cell 1123133333333333333333333333333333333",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "1232131",
                size: "100KB",
                modified_time: "2018-03-14",
            }, {
                name: "1232131",
                size: "100KB",
                modified_time: "2018-03-14",
            }]
        };
        return device_data;
    }
}