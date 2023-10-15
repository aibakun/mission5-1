// データ
var result = "";
// =で計算したかどうか
var equ_flag = false;

// 初期表示
window.onload = function () {
  result = document.getElementById('result');
};

// Cキー押下
function buttonClick_c(){
  result.value = "0";
  //計算していない状態にする
  equ_flag = false;
}
// Dキー押下
function buttonClick_d(){
  // 表示が0で0が押された時
  if (result.value.length === 1) {
  result.value = "0";
  } else {
  result.value = result.value.slice(0, -1);
  }

}
function buttonClick_kaijo(){
  var j = 1;
  for(var i = 1; i <= result.value; i++){
    j *= i;
  }
  result.value=j;
}

// 数字キー押下
function buttonClick_num(val){
  if(equ_flag)  result.value = "0";
  equ_flag = false;  

switch (val) {
    case "0":
    case "00":
      // 表示が0で0が押された時
      if (result.value == "0") {
        result.value = "0";
      } else {
        result.value += val;
      }
      break;

    case ".":
      //数字に.が含まれている確認
      if (result.value.indexOf(".") === -1) {
        result.value += val;
      }
      break;

    default:
      // 1文字目
      if (result.value == "0") {
        result.value = val;
      } else {
        result.value += val;
      }
      break;
  }
}

// 演算子キー押下
function buttonClick_ope(val){
  if(equ_flag)equ_flag = false;
  
  if(check_ope_last()){
    //演算子入れ替え
    result.value = result.value.slice(0, -1) + val;
  } else {
    //演算子追加
    result.value += val;
  }
}

// =キークリック
function buttonClick_equ(){
  //最後に演算子がある場合削除
  if(check_ope_last())  result.value = result.value.slice(0, -1);
  //演算子置き換え
  result.value=result.value.replaceAll("×", "*").replaceAll("÷", "/")

  var calclationResult = eval(result.value);
  //無限大か計算不能のときにエラー表示
  if(calclationResult == Infinity || Number.isNaN(calclationResult)){
    result.value = "Error";
  }else{
    result.value = calclationResult;
    equ_flag = true;
  }
}

// 入力されている値が演算子かどうか
function check_ope_last(){
  //表示窓の最後の文字を取得し演算子のが判断
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));
}
