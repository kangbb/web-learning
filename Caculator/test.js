/*仅仅用来测试*/
function  showError(message){
    alert(message);
}

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
    pop:function () {
        if(this.pos >= 0){
            return this.dataStore[this.pos--]
        }
        else{
            throw "堆栈运行错误";
        }
    },
    /*栈中已经存储的数据数量*/
    length: function(){
        return this.pos + 1;
    },
    /*判断是否为空*/
    empty: function () {
        return (this.pos === -1)
    },
    /*获取栈顶项*/
    top: function () {
        if(this.pos >= 0){
            return this.dataStore[this.pos]
        }
        else{
            throw "堆栈运行错误";
        }
    }
};
var stack = new Stack();   /*建立堆栈*/
function tranfExp(exp) {
    var tmpStr = [], num, i, j, k = 0;
    var ch, dotctr;
    for(i = 0; i < exp.length; i++) {

        /*如果为数字，则加入后缀表达式字符串*/
        if(exp[i] >= '0' && exp[i] <= '9'){
            num = '';
            num += exp[i];
            dotctr = 0;
            for(j = i+1; j < exp.length; j++){
                if(dotctr > 1){
                    throw "计算表达式错了哦，请重新输入";
                }
                if(exp[j] >= '0' && exp[j] <= '9'){
                    num += exp[j];
                    continue;
                }
                if(exp[j] === '.' && dotctr <= 1){
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
        else if(exp[i] === '(') {
            stack.push(exp[i])
        }

        /*如果为右括号，则左括号之前的内容全部出栈，加入后缀表达式字符串*/
        else if(exp[i] === ')'){
            while(!stack.empty()){
                if(stack.top() === '('){
                    stack.pop();
                    break;
                }
                else{
                    tmpStr[k++] = stack.top();
                    stack.pop()
                }
            }
        }
        /*如果为+ -,则所有高于或等于它们的运算符出栈，加入后缀表达式*/
        else if(exp[i] === '+' || exp[i] === '-'){
            /*输入为负数*/
            if(i == 0 || ( i > 0 && exp[i-1] === '(' )){
                num = '';
                num += exp[i];
                dotctr = 0;
                for(j = i+1; j < exp.length; j++){
                    if(dotctr > 1){
                        throw "计算表达式错了哦，请重新输入";
                    }

                    if(exp[j] >= '0' && exp[j] <= '9'){
                        num += exp[j];
                        continue;
                    }
                    if(exp[j] === '.' && dotctr <= 1){
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
            while(!stack.empty()){
                ch = stack.top();
                if(ch === '+' || ch === '-' || ch === '/' || ch === '+'){
                    tmpStr[k++]= stack.top();
                    stack.pop();
                }
                else{
                    break;
                }
            }
            stack.push(exp[i]);
        }

        /*如果为* /, 同上*/
        else if(exp[i] === '*' || exp[i] === '/' ){
            while(!stack.empty()){
                ch = stack.top();
                if(ch === '*' || ch === '/'){
                    tmpStr[k++] = stack.top();
                    stack.pop();
                }
                else{
                    break;
                }
            }
            stack.push(exp[i]);
        }
    }

    /*最后，栈中所有剩余项出栈*/
    while(!stack.empty()){
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
function calcExp(str){
    var i, m, n ,exp;
    var len = str.length - 1;
    if(str[0] === '+' || str[0] === '/' ||
        str[0] === '*' || str[len] === '/'  ||
        str[len] === '+' || str[len] === '-'||
        str[len] === '*'){
        throw "计算表达式错了哦，请重新输入"
    }

    try{
        exp = tranfExp(str);
    }catch(err){
        console.log(err);
        throw err;
    }

    console.log(exp);
    while(!stack.empty()){
        stack.pop();
    }
    for(i = 0; i < exp.length; i++){
        if(exp[i] === '+' || exp[i] === '-' || exp[i] === '*' || exp[i] === '/'){
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
                    stack.push(n / m);
                    break;
                default:
                    break;
            }
        }
        else{
            stack.push(parseFloat(exp[i]));
        }
    }
    // noinspection JSAnnotator
    return stack.top();
}

console.log(calcExp("2.3.3"));