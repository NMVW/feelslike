var express = require('express');
var app = express();

// PostGRES (sequelize)
var db = require('./db/mongoController');

var port = process.env.PORT || 4555;

require('db/initialize')(app);
require('config/middleware')(app);
require('config/routes')(app);

app.use(express.static(__dirname + 'src'));

app.listen(port);
