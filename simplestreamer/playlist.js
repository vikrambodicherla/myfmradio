var fs = require('fs');
var path = require('path');

module.exports = {
	respondWithPlaylist: function (frequency, config, res) {
		console.log('Playlist: ' + frequency);
		var path = 'raw/' + frequency
		fs.readdir(path, function(err, filenames) {
			if(err) {
				res.status(500).send('Unable to read files for frequency: ' + frequency);
				return;
			}

			if(filenames.length > 0) {
				res.writeHead('Content-Type', 'audio/mpegurl');
				res.write('#EXTM3U\n\n');

				filenames.forEach(function(filename) {
					res.write(buildInfo(path, filename) + '\n');
					res.write(buildUrl(frequency, filename, config) + '\n');
				});

				res.end();
			}
			else {
				res.status(404).send('No stream on frequency: ' + frequency);
			}
		});
	}
}

function buildInfo(p, filename) {
	return '#EXTINF: ' + fs.statSync(path.join(p, filename)).size + ', ' + filename;
}

function buildUrl(frequency, filename, config) {
	return "http://" + config.host + ":" + config.port + "/raw?frequency=" + frequency + "&file=" + filename;
}