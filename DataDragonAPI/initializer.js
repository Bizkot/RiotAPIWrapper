const superagent = require('superagent');
const urlResolver = require('./urlResolver');
const InitializationError = require('./Exceptions/InitializationError');

function initByCdn() {
	return new Promise((resolve, reject) => {
		const versionsURL = 'https://ddragon.leagueoflegends.com/api/versios.json';
		superagent
			.get(versionsURL)
			.then(res => {
				resolve(res.body[0]);
			})
			.catch(err => {
				reject(new InitializationError(err.message, err.status));
			});
	});
}


function initByRegion(region) {
	return new Promise(function(resolve, reject) {
		region = region.toLowerCase();
		const regionURL = urlResolver.getDataDragonURL() + `/realms/${region}.json`;
		superagent
			.get(regionURL)
			.then(res => {
				resolve(res.body['dd']);
			})
			.catch(err => {
				reject(new InitializationError(err.message, err.status));
			});
	});
}

// function initByVersion(initVersion) {
// 	return new Promise(function(resolve) {
// 		resolve(initVersion);
// 	});
// }

module.exports = {
	initByCdn: initByCdn,
	initByRegion: initByRegion,
	// initByVersion: initByVersion
};
