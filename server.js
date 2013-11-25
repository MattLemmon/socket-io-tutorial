var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('../../../pixi/node/node_modules/socket.io');
 
var server = http.createServer(function(request, response){ 
    console.log('Connection');
    var path = url.parse(request.url).pathname;
 
    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'}); 
            response.write('hello world');
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                }
                else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            break;
    } 
});
server.listen(8001);

var serv_io = io.listen(server);

serv_io.set('log level', 1); 


serv_io.sockets.on('connection', function(socket){
    socket.emit('message', {'message': 'socket connected'});
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 500);

    socket.on('client_data', function(data){
      process.stdout.write(data.letter);
    });


});



//io.listen(server); 
//io.set('log level', 1); 
//io.sockets.on('connection', function(socket){
  //send data to client
//  setInterval(function(){
//    socket.emit('date', {'date': new Date()});
//  }, 1000);
 
  //recieve client data
//  socket.on('client_data', function(data){
//    process.stdout.write(data.letter);
//  });
//});