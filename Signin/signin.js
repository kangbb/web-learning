var server = require("./service/server");
var router = require("./routes/router");
var requestHandlers = require("./service/requestHandlers")

var handle = {}
handle["/"] = requestHandlers.start;
handle["/public"] = requestHandlers.filehandler;
handle["/detail"] = requestHandlers.posthandler;
server.start(router.route, handle);