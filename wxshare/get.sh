
#read -p "input ip 4th:"  lasturl
lasturl=111
echo $lasturl
#read -p "input file you want get:"  val
val=index.html
#val=help.html
echo $val
scp haozhao@192.168.0.$lasturl:/home/haozhao/ws/jtw/src/wechat/ndcwx/public/jssdk/tpl/$val ./get


