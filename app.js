var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://yeah-boy.com:30000/test');
app.set('view engine', 'pug');

http.createServer(app).listen(app.get(8080), function(){
    console.log('Server listening on port 8080');
});