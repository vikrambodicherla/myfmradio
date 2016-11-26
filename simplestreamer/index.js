var express = require('express');
var filestreamer = require('./filestreamer.js');
var playlistBuilder = require('./playlist.js');

var config = require('./config.json');

var app = express();

app.get('/raw', function (req, res) {
	filestreamer.stream(req.query.frequency, req.query.file, req, res);
});

app.get('/radio', function(req, res) {
	playlistBuilder.respondWithPlaylist(req.query.frequency, config, res);
});

app.listen(config.port, function () {
  console.log('m3ustreamer listening on port: ' + config.port);
});