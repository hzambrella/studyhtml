var Status = {}
$(function () {
    var anchorStatus = {};
    anchorStatus.Close = 0;
    anchorStatus.Open = 1;
    anchorStatus.Break = 2;
    anchorStatus.Stop = 3;
    Status.anchorStatus = anchorStatus

    var anchorStatusMap = {
        0: '关闭',
        1: '打开',
        2: '故障',
        3: '停用',
    }
    Status.anchorStatusMap = anchorStatusMap

    // 0.新建网络（已存在时不可新建。添加楼层的同时，在数据库的buid_network表中添加一行数据）=>
    // 1.布设硬件（填写协调器的coor_id）=》
    // 2.组网(com_status设置为1)-》
    // 3.标定关键锚节点(anchor表中，输入部分锚节点的坐标)=》
    // 4.洪范（向该网络发起洪范请求，返回关键锚节点间的跳距）=》
    // 5.训练（普通的锚节点发送跳距，得到坐标）=》
    // 6.完成构建（此时才能进行定位监控）
    var networkAnchorStatus = {};
    networkAnchorStatus.newNet = 0;
    networkAnchorStatus.hardware = 1;
    networkAnchorStatus.networking = 2;
    networkAnchorStatus.noteHigherAnchor = 3;
    networkAnchorStatus.broadcast = 4;
    networkAnchorStatus.training = 5;
    networkAnchorStatus.complete = 6;
    Status.networkAnchorStatus = networkAnchorStatus

    var anchorDeploySteps = {
        0: '新键网络',
        1: '布设硬件',
        2: '组网',
        3: '标定关键锚节点',
        4: '洪范',
        5: '训练',
        6: '完成构建',
    }
    Status.anchorDeploySteps = anchorDeploySteps

    var taskStatus = {};
    taskStatus.todo = 0;
    taskStatus.doing = 1;
    taskStatus.fail = 2;
    Status.taskStatus = taskStatus

    var taskStatusMap = {
        0: '--待进行',
        1: '中',
        2: '失败',
    }
    Status.taskStatusMap = taskStatusMap

    var anchorType = {};
    anchorType.higher = 1;
    anchorType.normal = 0;
    Status.anchorType = anchorType


    var anchorTypeName = {
        0: '普通锚节点',
        1: '关键锚节点',
    }
    Status.anchorTypeName = anchorTypeName
})

console.log(Status)