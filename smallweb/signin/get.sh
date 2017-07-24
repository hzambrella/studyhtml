
#read -p "input ip 4th:"  lasturl
lasturl=117
echo $lasturl
#read -p "input file you want get:"  val
val=login.html
#val=help.html
echo $val
scp haozhao@192.168.0.$lasturl:/home/haozhao/hzstudy/smallweb/signin/src/public/user/$val ./get


