var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.ondemand;
handle["/ondemand"] = requestHandlers.ondemand;
handle["/ondemand/"] = requestHandlers.ondemand;

handle["/ondemand/catalogenode"] = requestHandlers.cataloguenode;
handle["/ondemand/cataloguenode"] = requestHandlers.cataloguenode;
handle["/ondemand/contentdetails"] = requestHandlers.contentdetails;

server.start(router.route, handle);