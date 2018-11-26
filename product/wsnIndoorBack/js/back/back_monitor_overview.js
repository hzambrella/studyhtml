$(function () {
    var svgDrawParam = {
        startX: 100,
        startY: 100,
        spaceCSX: 100, //sink和coor在x的间距,注意sink可能换行
        spaceCSY: 110, //sink和coor在y的间距
        spaceX: 100,
        spaceY: 180,
        sinkConNum: 10,
        coorXNum: 8, //X方向有多少个coor
        sinkImageUrl: '../fonts/iconfont/gateway.png',
        coorImageUrl: '../fonts/iconfont/coordinator.png',
        imgWidth: 60,
        imgHeight: 60,
    }

    var sinkLocInSVG = [];
    var coorLocInSVG = [];
    var lineOfSink = [];
    var lineOfCoor = [];

    var vdata = {
        finishLoading: true, //异步请求的数据是否加载完毕
        title: getTitle(),
        data: {
            "code": 0,
            "message": "操作成功",
            "success": true,
            "map": {},
            "obj": {
                "coordinators": [],
                "sinks": []
            }
        },
        svgDrawParam: svgDrawParam,
        sinkLocInSVG: sinkLocInSVG,
        coorLocInSVG: coorLocInSVG,
        lineOfSink: lineOfSink,
        lineOfCoor: lineOfCoor,
    }

    var getData = function () {
        vdata.finishLoading = false;
        //TODO:ajax
        setTimeout(function () {
            vdata.data = getNetDevComMock()
            cacuSVGPostionForDev(vdata.data.obj)
            console.log(JSON.stringify(sinkLocInSVG), JSON.stringify(coorLocInSVG));
            vdata.finishLoading = true;
        }, 200)
    }

    var app = new Vue({
        el: "#mainbox",
        data: vdata,
        mounted: function () {
            getData();
        },
        methods: {
            refresh: getData
        }
    })

    //将mock的数据JSON.stringfy
    //TODO::验证正确性,很多节点时。汇聚节点暂时只有一个。
    // 横着是X
    function cacuSVGPostionForDev(netComDev) {
        var startX = svgDrawParam.startX,
            startY = svgDrawParam.startY,
            spaceCSX = svgDrawParam.spaceCSX,
            spaceCSY = svgDrawParam.spaceCSY,
            spaceX = svgDrawParam.spaceX,
            spaceY = svgDrawParam.spaceY,
            sinkConNum = svgDrawParam.sinkConNum,
            coorXNum = svgDrawParam.coorXNum,
            imgHeight = svgDrawParam.imgHeight,
            imgWidth = svgDrawParam.imgWidth;

        var sinkList = netComDev.sinks;
        var coorList = netComDev.coordinators;

        //sink节点的位置是竖着的。
        //for (var index in sinkList) {
        var sindex = 0; //TODO:汇聚节点暂时只有一个。
        sink = sinkList[sindex]
        sinkLocInSVG.push({
            x: startX + parseInt(sindex / sinkConNum) * spaceX,
            y: startY + sindex % sinkConNum * spaceY * 2,
        });
        // }

        //coor节点的位置
        for (var index in coorList) {
            coor = coorList[index]
            coorLocInSVG.push({
                x: startX+(parseInt(sinkList.length / sinkConNum) + 1) * spaceCSX + parseInt(index % coorXNum) * spaceX,
                y: startY+spaceCSY + parseInt(index / coorXNum) * spaceY,
            })
        }

        //sink的线
        //for (var index in sinkLocInSVG){
        var pathD = '';
        var coorYNum = parseInt(coorLocInSVG.length / coorXNum) + 1;
        var startPX = startX + imgWidth + 10; //图片过一点
        var startPY = startY + imgWidth / 2; //图片一半位置
        var YSpace = spaceCSX + imgHeight + 20; //sink到coor的距离加上图片高度加40,是行距
        //var XStart = spaceCSY + imgWidth * 1.5;
        var pathD = pathD + String.format('M{0} {1} V{2}', startPX, startPY, startPY + YSpace * (coorYNum - 1));
        for (var i = 0; i < coorYNum; i++) {
            coorXNumNow=coorXNum;//当前第i行拥有多少个coor
            if (i==coorYNum-1){
               coorXNumNow=coorLocInSVG.length%coorXNum;
            }
            pathD = pathD + String.format(' M{0} {1} L{2} {3} ', startPX, startPY + i * YSpace, startPX + coorXNumNow * spaceX, startPY + i * YSpace);
            
        }
        //  }
        lineOfSink.push(pathD)

        //coor的线
        for (var i = 0; i < coorLocInSVG.length; i++) {
            cpathD = String.format(' M{0} {1} L{2} {3} ', coorLocInSVG[i].x + imgWidth / 2,
                startPY + parseInt(i / coorXNum) * YSpace,
                coorLocInSVG[i].x + imgWidth / 2, coorLocInSVG[i].y - imgHeight / 2)
            lineOfCoor.push(cpathD);
        }
    }
})