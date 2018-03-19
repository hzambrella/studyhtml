$(function () {
    var titleMap = {
        "allFile": "全部文件",
        "imageFile": "图片",
        "textFile": "文档",
        "recycleFile": "回收站",
    }

    mockDirData = getDirData()
    console.log(mockDirData)
    var disabledButtonFlag = false;
    //初始化模态modal (蒙版)
    //弹框

    var $modal = $("#modal").modal()
    //文件树

    function initModalDirTree() {
        //TODO:based on data
        var __dirTreeButtonHTML = $("#mock_dir_tree_button").html()
        //TODO:based on data
        var _dirTreeHTML = $("#mock_dir_tree").html()

        var $modalDirTree = $("#modalDirTree").modal()
        $modalDirTree.boxContainer({
            closeFunc: function () {
                $modalDirTree.hide();
                $(".box_container").hide();
            }
        }, _dirTreeHTML, __dirTreeButtonHTML);
        jqueryTreeScroll()
        $modalDirTree.changeTitle("移动到")
        $(".box_container .box_container_con").addClass("border_grey_solid")
        $(".box_container .box_container_button").addClass("box_container_button_dirTree")
        $("#dirTreeNewFolder").bind("click", function () {
            //TODO：new folder
            alert("新建文件夹")
        })

        $("#dirTreeConfirm").bind("click", function () {
            //TODO ajax
            $modalDirTree.hide();
            $(".box_container").hide();
        })

        $("#dirTreeCancel").bind("click", function () {
            $modalDirTree.hide();
        })

        return $modalDirTree
    }

    var $modalDirTree = initModalDirTree();


    //初始化化容量条
    var $sizeBar = $("#size_progress_bar").progressbar({
        text_default: "0G/100G",
    });
    $sizeBar.setProgress(0.5, "50G/100G")
    // scrollsXY("#file-list-table")
    //...初始...
    $(document).ready(function () {
        $("#allFile").trigger("click")
    });

    //...状态管理...
    //获得左边选中的按钮的id
    function getItemId() {
        return $(".con-left .item-list").find(".select").prop("id")
    }

    //获得右边表格checkbox选中数量
    function getSelectNum() {
        return $(".selectFile:checked").length
    }

    //显示右边表格checkbox选中的数量,并且管理一些部件。 action 特定的操作。
    function showSelectNum(action) {
        num = getSelectNum();
        $("#selectFileNum").html("(已选中" + num + "个)");
        if (num <= 0) {
            $("#selectAllList").prop("checked", false)
        }
        //默认的
        // console.log(action)
        if (action == null) {
            //隐藏操作栏
            if (num <= 0) {
                showOrHideOperateBar(false)
            } else {
                showOrHideOperateBar(true)
            }
            //禁止重命名按钮
            enableRename(num <= 1);
        } else {
            action(num);
        }
        // if (num<=1){
        //     $("#renameFile").removeClass("disabled");
        // }else{
        //     $("#renameFile").addClass("disabled");
        // }

        if (getItemId() != "recycleFile") {
            $(".operate #doRecycle").remove();
        }
        return num;
    }

    //更新右边表格的 item title
    function changeItemTitle() {
        var itemTitle = titleMap[getItemId()];
        $("#itemTitle").html(itemTitle)
    }

    //...左边...
    $(".item-list").click(function (event) {
        var $target = $(event.target);
        // console.log($target.prop("id"));
        console.log($target)
        if (!disabledButtonFlag) {
            $(".item-list").find("a").removeClass("select")
            $target.addClass("select");

            //TOOD:change right and data
            var result_data = getMockData($target.prop("id"));
            drawTable(result_data);
            changeItemTitle()

            //移除全选按钮的状态，已选中归零
            $("input#selectAllList").prop("checked", false)
            showSelectNum();

            //回收站隐藏掉新建和上传按钮
            if ($target.is("#recycleFile")) {
                $("#uploadFile,#newFolder").hide()
            } else {
                $("#uploadFile,#newFolder").show()
            }

        }
    })

    //...右边...
    //checkbox控制
    //checkbox全选和单选控制
    $("#file-list-table").click(function (event) {
        var $target = $(event.target);
        // console.log($target,$target.is("input#selectAllList"));

        //选中时触发的事件
        var checkboxAction = null

        //回收站选中checkbox时触发的事假不一样
        if (getItemId() == "recycleFile") {
            checkboxAction = function (num) {
                if (num <= 0) {
                    $(".operate #doRecycle").remove();
                } else {
                    console.log($(".operate .operate-file #doRecycle"))
                    if ($(".operate #doRecycle").length == 0) {
                        $(".operate").append("<a id='doRecycle' class='operate-common' href='javascript:void(0)'><i class='fa fa-recycle'></i>还原</a>")
                        $(".operate #doRecycle").bind("click", doRecycle)
                    }
                }
            }
        }

        if ($target.is("input#selectAllList")) {
            $(".tbcol-1 .selectFile").prop("checked", $(event.target).prop("checked"));
            showSelectNum(checkboxAction);
        } else if ($target.is("input.selectFile")) {
            showSelectNum(checkboxAction);
        }
    })


    //..表格控制..
    // 添加一行
    function drawTable(resultList) {
        $("#file-list-table").find("tr").not(".table-title").remove();
        var table_tpl = document.getElementById("table_tpl").innerHTML;
        var _HTML = template(table_tpl, resultList);
        // console.log(_HTML);
        $("#file-list-table").append(_HTML);
    }
    // 重名控制TODO
    function dealDupName(name) {
        // var name=name;
        // $target = $("#file-list-table .tbcol-1 span")
        // $.each($target, function () {
        //     if ($(this).html() == name) {
        //         reg = /\b\([\s\S]*\)$/;
        //         var st = reg.exec(name)
        //          console.log(st,name)
        //         if (st!=null&&st.length != 0) {
        //             var st1 = st[0];
        //             var st2 = st1.substring(1, st1.length).substring(0, st1.length - 1)
        //             i=parseInt(st2) + 1;
        //             name = dealDupName(name.replace(reg,"("+i+")"));
        //         }else{
        //             console.log(22)
        //             name=dealDupName(name+"("+1+")");
        //         }
        //     }
        // })
        return name;
    }

    //..操作控制..
    //操作栏隐藏和显示。true为显示
    function showOrHideOperateBar(show) {
        if (show) {
            $(".operate ul").removeClass("hide");
        } else {
            $(".operate ul").addClass("hide");
        }
    }

    //新建文件夹按钮
    $("#newFolder").click(function (event) {
        // prepend
        var date = new Date();
        dateStr = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        resultList = {
            resultList: [{
                name: dealDupName("新建文件夹"),
                size: "0KB",
                modifiedTime: dateStr,
            }]
        }

        var table_tpl = document.getElementById("table_tpl").innerHTML;
        var _HTML = template(table_tpl, resultList);
        $("#file-list-table .table-title").after(_HTML);
        $target = $("#file-list-table .table-title").next().find(".tbcol-1")

        rename($target, $target.find("span"),
            //confirm_callback
            function () {
                //do ajax  if fail,cancel。后端将文件名字发送回来。
            },
            //cancel_callback
            function () {
                cancel()
            })

        function cancel() {
            $("#file-list-table .table-title").next().remove();
        }
    })


    //下载按钮
    $("#downloadFile").click(function (event) {

        var $checked_el = $("#file-list-table .selectFile:checked");
        var names = [];
        $checked_el.each(function () {
            var name = $(this).siblings("span").html()
            names.push(name)
        })
        //TODO：confirm
        //TODO：download
        alert("下载" + names + "完毕！");
    })

    //删除按钮
    $("#deleteFile").click(function (event) {
        var $checked_el = $("#file-list-table .selectFile:checked");
        var tbcolToDelete = [];
        var names = [];
        $checked_el.each(function () {
            tbcolToDelete.push($(this).parent().parent().parent())
            var name = $(this).siblings("span").html()
            names.push(name)
        })

        //确认
        var modalOpt = {
            'title': '确认删除',
            'content': "确认要把所选的" + getSelectNum() + "个文件放入回收站吗?<br/> 删除的文件可在10天内通过回收站还原",
            'confirmFunc': function () {
                for (i = 0; i < tbcolToDelete.length; i++) {
                    tbcolToDelete[i].remove();
                }

                //$modal.children().remove()
                $modal.hideModal();
                showSelectNum();
                showOrHideOperateBar(false);
            },
            'cancelFunc': function () {
                //$modal.children().remove()
                $modal.hideModal();
            }
        }
        $modal.boxAlert(modalOpt);
        $modal.show();
        //TODO：ajax
    })

    //重命名按钮
    $("#renameFile").click(function (event) {
        var $target = $("#file-list-table .selectFile:checked").parent() //<div class="tbcol-1">
        var $name_el = $("#file-list-table .selectFile:checked").siblings("span")

        rename($target, $name_el)
    })

    function rename($target, $name_el, confirm_callback, cancel_callback) {
        var name = $name_el.html();
        $name_el.remove();
        var table_rename_tpl = document.getElementById("table_rename").innerHTML;
        var _HTML = template(table_rename_tpl, {
            "name": name,
        });
        disabledAllButton()
        $target.append(_HTML);
        //让input 选中状态
        $target.find("input").select().focus();
        //TODO:给按钮绑定监听
        $target.find(".rename_cancel").bind("click", function () {
            dorename(name)
            cancel_callback == null ? function () {} : cancel_callback();
        });

        $target.find(".rename_confirm").bind("click", function () {
            var new_name = $target.find(".rename_input").val();
            //TODO: ajax成功后调用
            dorename(new_name)
            confirm_callback == null ? function () {} : confirm_callback();
        });

        function dorename(new_name) {
            $target.find("div.rename").remove();
            $target.append("<span>" + new_name + "</span>");
            enableAllButton();
        }
    }
    //复制到按钮
    $("#copyFile").click(function (event) {
        $modalDirTree.changeTitle("复制到")
        $modalDirTree.show()
    })
    //移动到按钮
    $("#moveFile").click(function (event) {
        $modalDirTree.changeTitle("移动到")
        $modalDirTree.show()
    })

    //还原按钮
    function doRecycle() {
        var $checked_el = $("#file-list-table .selectFile:checked");
        var tbcolToDelete = [];
        var names = [];
        $checked_el.each(function () {
            tbcolToDelete.push($(this).parent().parent().parent())
            var name = $(this).siblings("span").html()
            names.push(name)
        })

        //确认
        var modalOpt = {
            'title': '确认还原',
            'content': "确认要把所选的" + getSelectNum() + "个文件还原吗?",
            'confirmFunc': function () {
                //TODO：ajax
                for (i = 0; i < tbcolToDelete.length; i++) {
                    tbcolToDelete[i].remove();
                }

                //$modal.children().remove()
                $modal.hideModal();
                showSelectNum();
                $("#doRecycle").remove();
            },
            'cancelFunc': function () {
                //$modal.children().remove()
                $modal.hideModal();
            }
        }
        $modal.boxAlert(modalOpt);
        $modal.show();

    }

    //..按钮控制..
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
    function disabledAllButton() {
        // $("button").attr()
        $("a").addClass("disabled")
        $("button").attr("disabled", true)
        $("input").attr("disabled", true)
        disabledButtonFlag = true
    }

    //按钮全部启用
    function enableAllButton() {
        // $("button").attr()
        $("a").removeClass("disabled")
        $("button").attr("disabled", false)
        $("input").attr("disabled", false)
        disabledButtonFlag = false
    }
})