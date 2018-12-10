$("#login").on('click', function () {
    doLogin()
})

function doLogin() {
    // var formData = new FormData($("#loginForm"));
    // alert(formData)
    var d = {};
    var t = $('#loginForm').serializeArray();
    $.each(t, function () {
        d[this.name] = this.value;
    });

    d["remember"] = $("#remember").prop("checked"); //checkbox是否被选中
    //  ($("#remember"))

    //$.error_message(JSON.stringify(d));
    // $("#loginForm #account").addClass("red");
    //TODO: ajax
    location.href = "back_buildingByBMap.html";
}

function doRegister() {
    var d = {};
    var t = $('#registerForm').serializeArray();
    $.each(t, function () {
        d[this.name] = this.value;
    });
    //  ($("#remember"))

    //TODO ajax
    $.error_message(JSON.stringify(d));
    //  $(".input.red").removeClass("red");
}

$.extend({
    error_message: function (mess) {
        $("#error_message").html(mess);
    }
})