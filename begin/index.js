var server = require("./server");
var router = require("./router");
var requesthandlers = require("./requesthandlers");


var handle = {};
handle["/"] = requesthandlers.start;
handle["/start"] = requesthandlers.start;
handle["/upload"] = requesthandlers.upload;
handle["/show"] = requesthandlers.show;
handle["/findAll"] = requesthandlers.findAll;




server.start(router.route,handle);