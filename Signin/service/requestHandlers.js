var fs = require("fs");
var reg;
/*主页/注册页面*/
function start(para, response) {
    /*没有查询参数，转到注册页面*/
    if(JSON.stringify(para) == "{}"){
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(get_file_content('views/signup.html'));
        return;
    }
    var content = query(para);
    /*查询结果为空，返回404 not found
    * 否则，返回详情信息页面*/
    if(content == null){
        notFound(response);
    }else{
        fs.readFile("views/signin.html", function (err ,data) {
            if(err){
                notFound(response);
                throw err.toString();
            }else{
                fillhtml(data, content, response);
            }
        });
    }
}

/*静态文件处理*/
function filehandler(para, response){
    para = para.slice(1,para.length);
    if(fs.existsSync(para)){
        reg = /.*\/\w+?\.(\w+)/;
        switch (para.match(reg)){
            case "css":
                response.writeHead(200, {'Content-Type': 'text/css'});
                break;
            case "png":
            case "jpg":
            case "gif":
                response.writeHead(200, {'Content-Type': 'image/gif'});
                break;
            case "html":
                response.writeHead(200, {'Content-Type': 'text/html'});
                break;
            case "js":
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                break;
            case "json":
                response.end(get_file_content(para));
                return;
        }
        response.end(get_file_content(para));
    }else{
        notFound(response);
    }
}

function posthandler(para, response) {
    var path = "public/data/data.json";
    var content;
    //由post跳转，输出post内容
    //否则，输出文件的最后一个数据
    //当然，这样有bug,后续再改进
    if(JSON.stringify(para) != "{}"){
        fs.readFile("views/signin.html", function (err, data) {
            if(err){
                notFound(response);
                throw err.toString();
            }else{
                fillhtml(data, para, response);
            }
        })

        if(!fs.existsSync(path)){
            fs.openSync(path, 'w');
            fs.closeSync();
        }
        content = fs.readFileSync(path);
        if(content != ""){
            content = JSON.parse(content);
        }else{
            content = [];
        }
        content.push(para);
        fs.writeFileSync(path, JSON.stringify(content));
    }else{
        var content = fs.readFileSync(path);
        if(content == "") {
            notFound(response);
        }else {
            content = JSON.parse(content);
            para = content[content.length - 1];
            fs.readFile("views/signin.html", function (err, data) {
                if(err){
                    notFound(response);
                    throw err.toString();
                }else{
                    fillhtml(data, para, response);
                }
            })
        }
    }

}
/*----------------辅助函数----------------------------*/
function query(para){
    var is_equal;
    var filename = "public/data/data.json";
    var data = get_file_content(filename);
    if(data == ""){
        return null;
    }else{
        data = JSON.parse(data);
    }

    for(var item in data) {
        for (var key in para) {
            is_equal = false;
            switch (key) {
                case 'username':
                    if (data[item]["username"] == para["username"]) {
                        is_equal = true;
                    }
                    break;
                case 'id':
                    if (data[item]["id"] == para["id"]) {
                        is_equal = true;
                    }
                    break;
                case 'phone':
                    if (data[item]["phone"] == para["phone"]) {
                        is_equal = true;
                    }
                    break;
                case 'email':
                    if (data[item]["email"] == para["email"]) {
                        is_equal = true;
                    }
                    break;
                default:
                    return null;
            }
            if (!is_equal) {
                return null;
            }
        }
        return data[item];
    }
}

function get_file_content(filePath) {
    return fs.readFileSync(filePath);
}

function notFound(response){
    response.writeHead(404, {"Content-Type": "text/html"});
    response.end(get_file_content("views/404.html"));
}

function fillhtml(data, para, response){
    var arr = ["username", "id", "phone", "email"];
    var dataStr = data.toString();
    for(var i = 0; i < arr.length; i++){
        //全局替换
        var re = new RegExp('{'+arr[i]+'}', 'g');
        dataStr = dataStr.replace(re, para[arr[i]]);
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(dataStr);
}

exports.start = start;
exports.filehandler = filehandler;
exports.notfound = notFound;
exports.posthandler = posthandler;