function route(handle, pathname, para, response) {
    console.log("About to route a request for " + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](para, response);
    }else{
        console.log("No request handler found for "+ pathname)
        var service = require("../service/requestHandlers");
        service.notfound(response);
    }
}
exports.route = route;