var commonTool = {
    //图片旋转一定角度。angle是角度 如30度就是30.若为空，就清除掉旋转。
    rotateImg: function rotateImg($imgel, angle) {
        var degree;
        angle == null ? degree = '' : degree = "rotate(" + angle + "deg" + ")";
        $imgel.css("transform", degree);
        $imgel.css("-ms-transform", degree);
        $imgel.css("-webkit-transform", degree);
    }
}