var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.sendfile('./view/index.html');
});

app.use(express.static('public'));

app.listen(3000);