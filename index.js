var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/enklima', { useNewUrlParser: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use("", require('./controller/index.js'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


