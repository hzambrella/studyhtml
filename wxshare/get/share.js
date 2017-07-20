$(document).ready(function () {
    var appId = $("#appId").val();
    var tag = $("#tag").val();
    var id = $("#id").val();

    var share_title = $("#share_title").val();
    var share_content = $("#share_content").val();
    var share_img_url = $("#share_img_url").val();
    var share_click_url = $("#share_click_url").val();
    var uid = $("#uid").val();

    initPage();
    //alert(location.href.split('#')[0])
    $("#btnjssdk1").click(function () {
        alert("hahaha");
        wx.ready(
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    alert(JSON.stringify(res));
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            })
        )
    });

    wx.ready(function () {
        alert("准备分享");
        wx.onMenuShareTimeline({
            title: share_title, // 分享标题
            link: share_click_url, // 分享链接
            imgUrl: share_img_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                alert("分享朋友圈成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert("分享朋友圈取消");
            }
        });

        wx.onMenuShareAppMessage({
            title: share_title, // 分享标题
            desc: share_content, // 分享描述
            link: share_click_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share_img_url, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                alert("分享朋友成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert("分享朋友取消");
            }
        });

        wx.onMenuShareQQ({
            title: share_title, // 分享标题
            desc: share_content, // 分享描述
            link: share_click_url, // 分享链接
            imgUrl: share_img_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                alert("分享QQ成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert("分享QQ取消");
            }
        });

    }) //wx.ready end

    wx.error(function (res) {
        alert("出错了！");
        var resObj = res
        console.log(resObj);
    }); //wx.error end

    function initPage() {
        $.ajax({
            type: "GET",
            url: "/ndcwx/jssdk/api/",
            dataType: "json",
            data: {
                appid: appId
            },
            success: function (data) {
                wx.config({
                    debug: true,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline', //分享朋友圈
                        'hideOptionMenu',
                        'onMenuShareAppMessage', //分享给朋友
                        'onMenuShareQQ', //分享到QQ
                    ]
                });

            },
            error: function (result) {
                alert(result.responseText);
            }
        });
    } //function initPage end
});