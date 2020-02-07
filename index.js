//index.js

var express = require('express');
app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public')); //used to get files from public

app.get('/', function(req, res){
  res.render("index.ejs");
});

io.on('connection', function(socket){
  	console.log('a user connected');
  	socket.on('disconnect', function(){
    	console.log('user disconnected');
	})
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	var rNum = Math.random() * 100;

  	var totalChance = 0;
  	for(var i = 0; i <= msg.inputs; i++){
  		totalChance = Number(msg.chances[i]) + Number(totalChance);
  		if (rNum <= Number(totalChance)){
  			io.emit('chat message', msg.items[i]);
  			break;
  		}
  	};

  	


  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
