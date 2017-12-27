# 关于项目
　　这是一个简单的关于javascript异步编程的项目实例。可以通过Promise, async/await,
callback等方法是实现javascript异步编程。当然，callback方式是最原始的方式，如果你
愿意，前两种方法则更加好用。
# S1
　　实现从服务端获取随机数并计算结果。可以通过jquery的removeClass()、
addClass()、bind()、unbind()方法实现按钮状态的转换；通过ajax方式获取
随机数，这里使用callback方式足够实现。
# S2
　　实现模拟顺序获取随机数并计算的过程，使用Promise的异步方式解决方式
来解决问题。当然，也可以使用async/await方式。在各个异步函数中实现重置按钮的功能。
# S3
   实现同时获取随机数并计算的过程。由于获取随机数的过程异步。<br/>
   注意，$.get().then()本身是一个对象，即使设置then调用的函数返回一个Promise。
所以，如果需要使用catch处理then()函数中的错误，那么需要先使用一个then捕获到
$.get().then()返回的Promise.例如：
```
$.get('/random').then(aRandomHandle).then(function (value) { value.catch(function (err) {console.log(err);})});
$.get('/random').then(bRandomHandle).then(function (value) { value.catch(function (err) {console.log(err);})});
$.get('/random').then(cRandomHandle).then(function (value) { value.catch(function (err) {console.log(err);})});
$.get('/random').then(dRandomHandle).then(function (value) { value.catch(function (err) {console.log(err);})});
$.get('/random').then(eRandomHandle).then(function (value) { value.catch(function (err) {console.log(err);})});

function aRandomHandle(data){
    return Handle($('#mask'),data) ? Promise.resolve() : Promise.reject('end');
}
function bRandomHandle(data){
    return Handle($('#hist'), data) ? Promise.resolve() : Promise.reject('end');
}
function cRandomHandle(data){
    return Handle($('#message'), data) ? Promise.resolve() : Promise.reject('end');
}
function dRandomHandle(data){
    return Handle($('#setting'), data) ? Promise.resolve() : Promise.reject('end');
}
function eRandomHandle(data){
    return Handle($('#sign'), data) ? Promise.resolve() : Promise.reject('end');
}
```

　　但是，如果使用return返回，则会有所不同。return返回的是$.get().then()中then调用的函数的返回值。
# S4
　　和S2类似，对S2做出简单修改即可。