$(function () {
    var $scanimg = $("#scanimg1").scanimg({speed_time:1000})
    $(".operate1").click(function (event) {
        var $target = $(event.target);
        // console.log($target)
        if ($target.is("button#test_scan")) {
            $("#test_scan").disabledButton()
            getResult()
        } else if ($target.is("button#stop")) {
            $scanimg.scanimg("stop")
            $("#test_scan").enableButton()
        }
    })

    function getResult() {
        // $.toast("test_scan")
        $scanimg.scanimg("scanning")
    }
})