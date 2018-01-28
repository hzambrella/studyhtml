//toast_alert插件。坑：中英文夹杂时，会超出框框。
;

    $.extend({
        toast_alert: function (message) {
            var toastTime2

            clearTimeout(toastTime2)

            $(".toast_alert_text").text(message)
            $(".toast_alert").css('opacity', 1)


            toastTime2 = setTimeout(
                function () {
                    $(".toast_alert").css('opacity', 0)
                }, 1000);
        }
    })
