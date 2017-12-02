var str = "";
var error = 0;
var nlb = 0;
var nrb = 0;
var len;
var precision_need;
var result;

function Stack() {
    this.dataStore = [];
    this.pos = -1;
}

Stack.prototype = {
    /*入栈*/
    push: function (value) {
        this.dataStore[++this.pos] = value;
    },
    /*出栈*/
    pop: function () {
        if (this.pos >= 0) {
            return this.dataStore[this.pos--]
        }
        else {
            throw "堆栈运行错误";
        }
    },
    /*栈中已经存储的数据数量*/
    length: function () {
        return this.pos + 1;
    },
    /*判断是否为空*/
    empty: function () {
        return (this.pos === -1)
    },
    /*获取栈顶项*/
    top: function () {
        if (this.pos >= 0) {
            return this.dataStore[this.pos]
        }
        else {
            throw "堆栈运行错误"
        }
    }
};
var stack = new Stack();

/*建立堆栈*/


function showError(message) {
    alert(message);
}

function getInput(value) {
    precision_need = false;

    len = str.length - 1;
    /*避免符号重复使用*/
    if ((str[len] === "(" || str[len] === "+" || str[len] === "-" ||
            str[len] === "*" || str[len] === "/" || str[len] === ".") &&
        (value === "+" || value === "*" || value === "/" || value === "." ||
            value === ")")) {
        error++;
    }
    /*减号特殊，同时可以作为负数符号*/
    if (( str[len] === "+" || str[len] === "-" || str[len] === "*" ||
            str[len] === "/" || str[len] === ".") && value === '-') {
        error++;
    }
    /*小数点后也不能有'('*/
    if (str[len] === "." && value === "(") {
        error++;
    }
    /*括号外不能直接跟数字*/
    if (str[len] === ")" && (value >= 0 && value <= 9) ||
        (str[len] >= 0 && str[len] <= 9) && value === "(") {
        error++;
    }
    /*计算括号数量，准确匹配*/
    if (value == "(") {
        nlb++;
    }
    if (value == ")") {
        nrb++;
    }

    str += value;
    document.getElementById("screen").value = str;
}

function Result() {
    /*判断是否存在错误的输入*/
    if (error != 0 || nlb != nrb) {
        showError("计算表达式错了哦，请重新输入");
        return;
    }
    /*计算表达式的值,并判断其他错误*/
    try {
        /*保留答案副本*/
        result = calcExp(str);
    } catch (err) {
        showError(err);
        return;
    }

    var select = document.getElementById("mySelect");
    var index = select.selectedIndex;
    var precision = select.options[index].value;

    str = parseFloat(result).toFixed(precision);
    document.getElementById("screen").value = str;
    document.getElementById("error").textContent = "恭喜您，结果已经出来了";
    precision_need = true;
}

function Clear() {
    str = "";
    result = "";
    error = "";
    nlb = 0;
    nrb = 0;
    precision_need = false;
    document.getElementById("screen").value = str;
    document.getElementById("error").textContent = "用的开心哦";
}

function Cancel() {
    /*修改错误*/
    len = str.length - 1;
    if ((str[len - 1] === "(" || str[len - 1] === "+" || str[len - 1] === "-" ||
            str[len - 1] === "*" || str[len - 1] === "/" || str[len - 1] === ".") &&
        (str[len] === "+" || str[len] === "*" || str[len] === "/" ||
            str[len] === ")")) {
        error--;
    }
    if (( str[len - 1] === "+" || str[len - 1] === "-" || str[len - 1] === "*" ||
            str[len - 1] === "/" || str[len - 1] === ".") && str[len] === '-') {
        error--;
    }
    if (str[len - 1] === "." && str[len] === "(") {
        error--;
    }

    if (str[len - 1] === ")" && (str[len] >= "0" && str[len] <= "9") ||
        (str[len - 1] >= "0" && str[len - 1] <= "9") && str[len] === "(") {
        error--;
    }

    if (str[len] == "(") {
        nlb--;
    }
    if (str[len] == ")") {
        nrb--;
    }

    precision_need = false;
    /*删除输入的一个字符*/
    str = str.substr(0, len);
    document.getElementById("screen").value = str;
    document.getElementById("error").textContent = "用的开心哦";
}

/*监听精度值*/
function defPrecision(){
    if(precision_need === true){
        var select = document.getElementById("mySelect");
        var index = select.selectedIndex;
        var precision = select.options[index].value;

        str = parseFloat(result).toFixed(precision);
        document.getElementById("screen").value = str;
    }
}

/*后缀表达式实现字符串计算*/
function tranfExp(exp) {
    var tmpStr = [], num, i, j, k = 0;
    var ch, dotctr;

    while (!stack.empty()) {
        stack.pop();
    }

    for (i = 0; i < exp.length; i++) {

        /*如果为数字，则加入后缀表达式字符串*/
        if (exp[i] >= '0' && exp[i] <= '9') {
            num = '';
            num += exp[i];
            dotctr = 0;

            if (exp[i] === '0' && (exp[i + 1] >= '0' && exp[i + 1] <= '9') && i < exp.length - 1){
                throw "输入数字不规范，请重新输入";
            }
            for (j = i + 1; j < exp.length; j++) {
                if(dotctr > 1){
                    throw "计算表达式错了哦，请重新输入";
                }

                if (exp[j] >= '0' && exp[j] <= '9') {
                    num += exp[j];
                    continue;
                }
                if (exp[j] === '.' && dotctr <= 1) {
                    num += exp[j];
                    dotctr++;
                    continue;
                }
                break;
            }
            tmpStr[k++] = num;
            i = j - 1;
        }

        /*如果为左括号，则加入后缀表达式字符串*/
        else if (exp[i] === '(') {
            stack.push(exp[i])
        }

        /*如果为右括号，则左括号之前的内容全部出栈，加入后缀表达式字符串*/
        else if (exp[i] === ')') {
            while (!stack.empty()) {
                if (stack.top() === '(') {
                    stack.pop();
                    break;
                }
                else {
                    tmpStr[k++] = stack.top();
                    stack.pop()
                }
            }
        }
        /*如果为+ -,则所有高于或等于它们的运算符出栈，加入后缀表达式*/
        else if (exp[i] === '+' || exp[i] === '-') {
            /*输入为负数*/
            if (i == 0 || ( i > 0 && exp[i - 1] === '(' )) {
                num = '';
                num += exp[i];
                dotctr = 0;

                if (exp[i] === '0' && (exp[i + 1] >= '0' && exp[i + 1] <= '0') && i < exp.length - 1){
                    throw "输入数字不规范，请重新输入";
                }
                for (j = i + 1; j < exp.length; j++) {
                    if(dotctr > 1){
                        throw "计算表达式错了哦，请重新输入";
                    }

                    if (exp[j] >= '0' && exp[j] <= '9') {
                        num += exp[j];
                        continue;
                    }
                    if (exp[j] === '.' && dotctr <= 1) {
                        num += exp[j];
                        dotctr++;
                        continue;
                    }
                    break;
                }
                tmpStr[k++] = num;
                i = j - 1;
                continue;
            }
            while (!stack.empty()) {
                ch = stack.top();
                if (ch === '+' || ch === '-' || ch === '/' || ch === '+') {
                    tmpStr[k++] = stack.top();
                    stack.pop();
                }
                else {
                    break;
                }
            }
            stack.push(exp[i]);
        }

        /*如果为* /, 同上*/
        else if (exp[i] === '*' || exp[i] === '/') {
            while (!stack.empty()) {
                ch = stack.top();
                if (ch === '*' || ch === '/') {
                    tmpStr[k++] = stack.top();
                    stack.pop();
                }
                else {
                    break;
                }
            }
            stack.push(exp[i]);
        }
    }

    /*最后，栈中所有剩余项出栈*/
    while (!stack.empty()) {
        tmpStr[k++] = stack.top();
        stack.pop();
    }
    return tmpStr;
}

/*计算后缀表达式
* 后缀表达式错误类型：
* 1.运算符数目和数字数量不匹配
* 2.被0除错误
* 3.*/
function calcExp(str) {
    var i, m, n, exp;
    var len = str.length - 1;
    if (str[0] === '+' || str[0] === '/' ||
        str[0] === '*' || str[len] === '/' ||
        str[len] === '+' || str[len] === '-' ||
        str[len] === '*') {
        throw "计算表达式错了哦，请重新输入";
    }

    try {
        exp = tranfExp(str);
    } catch (err) {
        throw err;
    }

    while (!stack.empty()) {
        stack.pop();
    }
    for (i = 0; i < exp.length; i++) {
        if (exp[i] === '+' || exp[i] === '-' || exp[i] === '*' || exp[i] === '/') {
            m = stack.top();
            stack.pop();
            n = stack.top();
            stack.pop();
            switch (exp[i]) {
                case '+':
                    stack.push(n + m);
                    break;
                case '-':
                    stack.push(n - m);
                    break;
                case '*':
                    stack.push(n * m);
                    break;
                case '/':
                    if (m === 0) {
                        throw "错了哦，表达式中存在除数为零的情况";
                    }
                    stack.push(n / m);
                    break;
                default:
                    break;
            }
        }
        else {
            stack.push(parseFloat(exp[i]));
        }
    }
    // noinspection JSAnnotator
    return stack.top();
}
