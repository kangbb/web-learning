window.onload = function () {
    var secs = 5; //倒计时的秒数
    for(var i=secs;i>=0;i--){  
        window.setTimeout("doUpdate(" + i + ")", (secs-i) * 1000);
    }
}
function doUpdate(num){
    document.getElementById("setTime").innerHTML = num;
    if (num == 0){
        window.location='http://localhost:8000/';
    }
}
