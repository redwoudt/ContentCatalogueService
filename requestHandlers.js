var querystring = require("querystring");
var fs = require("fs");
var formidable  = require("formidable");
var url = require("url");

 
function ondemand(response){
	console.log("Request handler 'ondemand' was called");

	var query = "Channel150001";
	var fileName = "catalognode/"+query+".json";
	fs.exists(fileName, function(exists) {
		console.log("file " + fileName + " exists: " + exists);
  		if (exists) {
  			fs.readFile(fileName, "utf8", function(error, file){
				if (error){
					response.writeHead(500, {"Content-Type":"text/plain"});
					response.write(error+"\n");
					response.end();
				}
				else {
					response.writeHead(200, {"Content-Type":"application/json"});
					response.write(file, "utf8");
					response.end();
				}	
			});
  		}
  		else {
  			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write("Hello from ondemand: root does not exist. " );
			response.end();
  		}
  	});	
}

function cataloguenode(response, request){
	console.log("Request handler 'cataloguenode' was called");
	var bookmark = querystring.parse(url.parse(request.url).query)["bookmark"];
	console.log("bookmark:" + bookmark + ", request: " + request, ", length: " + Object.keys(request).length);
	var node = querystring.parse(url.parse(request.url).query)["nodeid"];
  	var query;
	if (bookmark == 'HPCATCHUP' ||  node == undefined){
		query = "Channel150001";
	}
	else {
		query = node;
	}
	var fileName = "catalognode/"+query+".json";
	fs.exists(fileName, function(exists) {
		console.log("file " + fileName + " exists: " + exists);
  		if (exists) {
  			fs.readFile(fileName, "utf8", function(error, file){
				if (error){
					response.writeHead(500, {"Content-Type":"text/plain"});
					response.write(error+"\n");
					response.end();
				}
				else {
					response.writeHead(200, {"Content-Type":"application/json"});
					response.write(file, "utf8");
					response.end();
				}	
			});
  		}
  		else {
  			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write("Hello from cataloguenode: " + query + " does not exist. " );
			response.end();
  		}
  	});	
}

function contentdetails(response, request){
	console.log("Request handler 'contentdetails' was called.");

	var query2 = querystring.parse(url.parse(request.url).query)["programmeid"];
	var fileName2 = "contentdetails/"+query2+".json";
	fs.exists(fileName2, function(exists) {
		console.log("file " + fileName2 + " exists: " + exists);
  		if (exists) {
  			fs.readFile(fileName2, "utf8", function(error, file){
				if (error){
					response.writeHead(500, {"Content-Type":"text/plain"});
					response.write(error+"\n");
					response.end();
				}
				else {
					response.writeHead(200, {"Content-Type":"application/json"});
					response.write(file, "utf8");
					response.end();
				}	
			});
  		}
  		else {
  			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write("Hello from contentdetails: " + query2 + " does not exist. " );
			response.end();
  		}
  	});	
}

exports.ondemand = ondemand;
exports.cataloguenode = cataloguenode;
exports.contentdetails = contentdetails;

