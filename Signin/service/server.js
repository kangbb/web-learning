var http = require("http");
var url = require("url");
var querystring = require('querystring');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        var para = url.parse(request.url, true).query;

        //获取post数据
        // 定义了一个post变量，用于暂存请求体的信息
        if(request.method == "POST"){
            var post = '';
            // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
            request.on('data', function(chunk){
                post += chunk;
            });
            // 在end事件触发后，调用函数
            request.on('end', function(){
                post = querystring.parse(post);
                if(JSON.stringify(post) != "{}"){
                    para = post;
                    route(handle, "/detail", para, response)
                    return;
                }
            });
        }else{
            if(pathname.match(/.*public.*/) != null){
                para = pathname;
                route(handle, "/public", para, response);
                return;
            }
            route(handle, pathname, para, response);
        }
    }
    http.createServer(onRequest).listen(8080);
    console.log("Server has started.");
}

exports.start = start;