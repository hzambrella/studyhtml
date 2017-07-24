lasturl=117
val=register.html
#val=help.html
#read -p "input ip 4th:"  lasturl
echo $lasturl
#read -p "input file you want send:"  val
echo $val
scp $val haozhao@192.168.0.$lasturl:/home/haozhao/hzstudy/smallweb/signin/src/public/user/



