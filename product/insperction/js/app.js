$(function () {

    var device_array = [];

    $(".operate-container").on("click", function (event) {
        var $target = $(event.target);

        if ($target.is("button#my_position")) {
            my_position()
        } else if ($target.is("button#get_device")) {
            get_device()
        } else if ($target.is("button#get_route")) {
            get_route()
        } else if ($target.is("button#clear_layout")) {
            clear_layout()
        }
    })

    //这里是自动移动回武科大青山校区。原本应该是自己的位置。
    function my_position() {
        map.panTo($start_end_point);
        map.setZoom($default_zoom);
        addStartEndMarker();
    }

    function get_device() {
        $("button").disabledButton();
        //前端mock的数据
        //TODO：有兴趣的话，将这里改为ajax获取后端持久化的数据。
        device_array.splice(0)

        device_array.push({
            lat: $default_cen_lat,
            lng: $default_cen_lng,
            point: $start_end_point,
            title: "起点/终点",
            desc: "起点/终点",
        })

        var deviceDatas = getDeviceData();
        for (i = 0; i < deviceDatas.length; i++) {
            var deviceData = deviceDatas[i]
            var point = new BMap.Point(deviceData.lng, deviceData.lat)
            addMarker(point, deviceData.title, deviceData.desc)
            deviceData.point = point
            device_array.push(deviceData)
        }

        map.setZoom(11.1);
        $.toast("获取设备信息成功")
        $("button").enableButton();
    }

    function get_route() {
        $("button").disabledButton();
        if (device_array.length == 0) {
            $.toast("请先点击获取设备信息")
            $("button").enableButton();
            return
        }
        console.log(device_array)

        //计算邻接矩阵，由驾驶车辆的路程所组成，单位米。
        var adjacency = new Array(); //声明一维数组        
        for (var x = 0; x < device_array.length; x++) {
            adjacency[x] = new Array(); //声明二维数组
            for (var y = 0; y < device_array.length; y++) {
                adjacency[x][y] = 0; //数组初始化为0
            }
        }
        // console.log(adjacency)

        var cacu = getAdjacency(device_array.length, device_array.length);
        var searchComplete = function (results) {
            if (transit.getStatus() != BMAP_STATUS_SUCCESS) {
                console.log("计算路线失败")
                return;
            }

            var plan = results.getPlan(0);
            var distance = plan.getDistance(false);
            // console.log(distance); //获取距离
            cacu(distance)
        }

        var transit = new BMap.DrivingRoute(map, {
            renderOptions: {
                // map: map,
            },
            onSearchComplete: searchComplete,
        })
        //策略：最短距离
        transit.setPolicy(BMAP_DRIVING_POLICY_LEAST_DISTANCE);

        transit.search(device_array[0].point, device_array[1].point);
        // transit.search(device_array[1].point, device_array[1].point);
        // transit.search(device_array[2].point, device_array[1].point);
        // transit.search(device_array[3].point, device_array[1].point);
        // transit.search(device_array[4].point, device_array[1].point);

        // 计算邻接矩阵，由驾驶车辆的路程所组成，单位米。
        //TODO:速度有点慢，transit.search本身是异步的，但是为了填写邻接矩阵改成闭包了,想法改进。
        function getAdjacency(length) {
            var x = 0,
                y = 0,
                length = length;
            var mess_cacu_distance="计算距离中:"

            return function (distance) {
                adjacency[x][y] = distance

                // console.log(x, y)
                y++;
                if (y >= length) {
                    x++;
                    y = 0;
                    if (x >= length) {
                        $.toast("get_route")
                        $("button").enableButton();
                        for (i = 0; i < length; i++) {
                            adjacency[i][i] = 0;
                        }
                        console.log(adjacency)
                         $("#message").html("");   
                        return
                    }
                } 

                // console.log("now:", x, y)
                transit.search(device_array[x].point, device_array[y].point);  
                $("#message").html("计算距离中..(已完成:"+(x*10+y)/length*length+"%)");   
            }
        }
    }

    function clear_layout() {
        map.clearOverlays();
        device_array.splice(0)
        $.toast("清除完毕")
    }
});