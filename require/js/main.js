
require.config({
    // for cache reload
	urlArgs: 'v=2017033107',	
	// default to vendor 默认路径，注意配置正确
    baseUrl: '../js/vendor',
	// timeout
	waitSeconds: 0,
    paths:{
        app:"../app",
        lib:"../lib",
        //别名
        hello:"helloWorld",
        //不符合amd的
        hello2:"helloWorld_unAMD",
        //百度地图
        'BMap': ['http://api.map.baidu.com/api?v=2.0&ak=7a6QKaIilZftIMmKGAFLG7QT1GLfIncg'],
    },
    shim:{
        // notie非amd
		'notie': {
			// notie中export的值
			exports: 'notie',
		},
		'hello2': {
			// hello2中export的值,不返回函数，直接在js中用hello_unAMD()
			exports: 'hello_unAMD',
		},
        'BMap': {
               exports: 'BMap',
        }
        //"test":["jquery"]
    }
});