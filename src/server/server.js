var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();
var fs = require('fs');
var port = 8081;

app.use('/api', proxy({target: 'http://localhost:8080', changeOrigin: true}));
app.use('/', express.static(__dirname + '/../../public'));

app.listen(port, '0.0.0.0', function(){
    console.log('Server is running on port ' + port);
});

app.get('/', function(req, res){
    fs.readFile('index.html', function(err, data){
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});
