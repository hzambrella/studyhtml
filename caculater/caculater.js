

var result_1;
//�ӷ�
function add() {
  var a = getFirstNumber();
  var b = getTwiceNumber();
  var re =Number( a) +Number( b);
  sendResult(re);
}

//����
function subtract() {
  var a = getFirstNumber();
  var b = getTwiceNumber();
  var re = a - b;
  sendResult(re);
}

//�˷�
function ride() {
  var a = getFirstNumber();
  var b = getTwiceNumber();
  var re = a * b;
  sendResult(re);
}

//����
function devide() {
  var a = getFirstNumber();
  var b = getTwiceNumber();
  var re = a / b;
  sendResult(re);
}

//��p��ǩ��ֵ
function sendResult(result_1) {
  var num = document.getElementById("result")
  num.innerHTML = result_1;
}

//��ȡ��һλ����
function getFirstNumber() {
  var firstNumber = document.getElementById("first").value;
  return firstNumber;
}

//��ȡ�ڶ�λ����
function getTwiceNumber() {
  var twiceNumber = document.getElementById("twice").value;
  return twiceNumber;
}