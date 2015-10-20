var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/asset/:name', function(req, res, next){
	var options = {
	    root: __dirname + '/public/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
  	};
	
	res.sendFile(req.params.name, options);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/editor', function(req, res){
  res.sendFile(__dirname + '/public/editor.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});