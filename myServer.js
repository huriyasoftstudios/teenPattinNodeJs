var express = require("express");
var app = express();

var server = require('http').createServer(app);
var io = require("socket.io").listen(server);

app.set('port',process.env.PORT || 3000);


var clients = [];

io.on("connection",function(socket){

    var currentClient;

    socket.on("On_Connect",function(data){
        currentClient = {
            name : data.Name,
            money: data.Money
        };
        console.log("Client connected with name "+currentClient.name+" and money = "+currentClient.money);
		clients.push(currentClient);
		console.log("Client count:: "+ clients.length);
		socket.emit("On_Connect_Result",{message:"You are now connected to server"});

    });
	
	socket.on("disconnect", function(){								//THIS is also pre defined method in io classs
		socket.emit("On_Disconnect_Result",{message:"You have disconnected to server"});
		for(var i=0; i<clients.length; i++)
		{
			if(clients[i].name == currentClient.name){
				console.log("User "+clients[i].name+" disconnected.");
				clients.splice(i,1);
			}
		}	
	});
});
server.listen(app.get('port'),function(){
	console.log("--------SERVER IS RUNNING--------");
});