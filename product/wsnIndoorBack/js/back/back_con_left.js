$(function () {
    var router = {
        "buildInfo": "back_building.html",
        "mapInfo": "back_map.html",
        "netInfo": "",
        "monitorInfo": "",
    }

    $("#leftNav").on('click', function (event) {
        var $target = $(event.target);
        var h=router[$target.prop("id")];
        if (h&&h!=''){
            location.href=h
        }
    })
})