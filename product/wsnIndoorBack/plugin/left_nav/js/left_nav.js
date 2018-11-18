$(function () {
    // nav收缩展开
    $('#aat').on('click', '.nav-item>a', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            } else {
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    // 标志点击样式
    $('#aat').on('click', '.nav-item>ul>li', function () {
        $('.nav-item>ul>li').css('background', 'none')
        $(this).css('background', 'yellow')
        //  	$(this).siblings().css('background','none')
    })
    //nav-mini切换
    $('#mini').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
        } else {
            $('.nav').removeClass('nav-mini');
        }
    });
});

function leftNavinit(navList) {
    var navData = '';
    for (let i = 0; i < navList.length; i++) {
        navData += "<li class='nav-item'><a href='javascript:;'><i class='my-icon nav-icon icon_1'></i><span>" + navList[i].p + "</span><i class='my-icon nav-more'></i></a><ul>"
        for (let w = 0; w < navList[i].c.length; w++) {
            navData += "<li><a href='javascript:;'><span>" + navList[i].c[w] + "</span></a></li>"
        }
        navData += "</ul></li>"
    }
    console.log(navData)
    $('#aat').html(navData)
}

function testNavInit() {
    leftNavinit(testNavList)
}

var testNavList = [{
        "p": "银川市",
        "c": ["兴庆区", "金凤区", "西夏区", "中宁县", "灵武市", "贺兰县"]
    },
    {
        "p": "石嘴山市",
        "c": ["大武口区", "惠农区", "平罗县"]
    },
    {
        "p": "吴忠市",
        "c": ["利通区", "红寺堡区", "盐池县", "同心县", "青铜峡市"]
    },
    {
        "p": "中卫市",
        "c": ["沙坡头区", "中宁县", "海原县"]
    },
    {
        "p": "固原市",
        "c": ["原州区", "泾源县", "西吉县", "隆德县", "彭阳县"]
    }
]