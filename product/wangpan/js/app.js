$(function () {
    //初始
    $(document).ready(function(){  
        // $("#allFile").trigger("click")
    });


    //左边
    $(".item-list").click(function (event) {
        var $target = $(event.target);
        // console.log($target.prop("id"));
        $(".item-list").find("a").removeClass("select")
        $target.addClass("select");

        //TOOD:change right and data
        var result_data=getMockData($target.prop("id"));
        drawTable(result_data);
    })

    //右边
    //checkbox全选和单选控制
    $("#file-list-table").click(function (event) {
        var $target = $(event.target);
        // console.log($target,$target.is("input#selectAllList"));
        if ($target.is("input#selectAllList")) {
            $(".tbcol-1 .selectFile").prop("checked", $(event.target).prop("checked"));
            showSelectNum();
        } else if ($target.is("input.selectFile")) {
            showSelectNum();
        }
    })


    //表格控制
    function drawTable(resultList){
        $("#file-list-table").find("tr").not(".table-title").remove();
        var table_tpl=document.getElementById("table_tpl").innerHTML;
        var _HTML=template(table_tpl,resultList);
        // console.log(_HTML);
        $("#file-list-table").append(_HTML);
    }

    //操作控制
    //重命名按钮
    $("#renameFile").click(function(event){
        var $target=$("#file-list-table .selectFile:checked").parent()
        var $name_el=$("#file-list-table .selectFile:checked").siblings("span")

        var name=$name_el.html();
        $name_el.remove();
        var table_rename_tpl=document.getElementById("table_rename").innerHTML;
        var _HTML=template(table_rename_tpl,{"name":name});
        $target.append(_HTML)  
    })

    //状态
    //获得选中数量
    function getSelectNum() {
        return $(".selectFile:checked").length
    }
    
    //显示选中的数量
    function showSelectNum() {
        num = getSelectNum();
        $("#selectFileNum").html("(已选中" + num + "个)");
        //隐藏操作栏
        if (num <= 0) {
            $(".operate ul").addClass("hide");
        } else {
            $(".operate ul").removeClass("hide");
        }

        //禁止重命名
        enableRename(num <= 1);
        // if (num<=1){
        //     $("#renameFile").removeClass("disabled");
        // }else{
        //     $("#renameFile").addClass("disabled");
        // }
    }

    //按钮控制
    //是否允许下载文件
    function enableDownload(yes) {
        if (yes) {
            $("#downloadFile").removeClass("disabled");
        } else {
            $("#downloadFile").addClass("disabled");
        }
    }
    //是否允许删除文件
    function enableDelete(yes) {
        if (yes) {
            $("#deleteFile").removeClass("disabled");
        } else {
            $("#deleteFile").addClass("disabled");
        }
    }
    //是否允许重命名文件
    function enableRename(yes) {
        if (yes) {
            $("#renameFile").removeClass("disabled");
        } else {
            $("#renameFile").addClass("disabled");
        }
    }
    //是否允许复制文件
    function enableCopy(yes) {
        if (yes) {
            $("#copyFile").removeClass("disabled");
        } else {
            $("#copyFile").addClass("disabled");
        }
    }
    //是否允许移动文件
    function enableMove(yes) {
        if (yes) {
            $("#moveFile").removeClass("disabled");
        } else {
            $("#moveFile").addClass("disabled");
        }
    }

    //按钮全部禁用
    function disabledAllButton(){
        $("button").attr()
    }
})