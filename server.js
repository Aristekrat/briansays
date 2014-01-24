'use strict';

// Module dependencies.
var express = require('express'),  
    path = require('path'),
    fs = require('fs');

var app = express();

// Express Configuration
require('./lib/config/express')(app);

// Controllers
//var index = require('./lib/controllers');

// Angular Routes
app.get('*', function(req, res) {
    res.sendfile('./index.html');
});

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;