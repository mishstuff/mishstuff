var express = require('express');
var app = express();
var photos = require('./photos.js');

app.get('/', function(req, res){
    res.sendfile('./view/index.html');
});

app.use('/getPhotos', photos.getPhotos);
app.use(express.static('public'));

app.listen(3000);