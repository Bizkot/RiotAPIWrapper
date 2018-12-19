const superagent = require('superagent');
const urlResolver = require('./urlResolver');

let endPoint = '';
let version = '';

function initByCdn() {
	return new Promise((resolve, reject) => {
		const versionsURL = 'https://ddragon.leagueoflegends.com/api/versions.json';
		superagent
			.get(versionsURL)
			.then(res => {
				version = res.body[0];
				resolve(version);
			})
			.catch(err => {
				reject(err);
			});

		endPoint = urlResolver.getCdnURL();

	});
}


function initByRegion(region) {
	return new Promise(function(resolve, reject) {
		region = region.toLowerCase();
		const regionURL = urlResolver.getDataDragonURL() + `/realms/${region}.json`;
		superagent
			.get(regionURL)
			.then(res => {
				version = res.body['dd'];
				endPoint = res.body['cdn'] + '/';
				resolve({
					version: version,
					endPoint: endPoint
				});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function initByVersion(initVersion) {
	return new Promise(function(resolve) {
		version = initVersion;
		endPoint = urlResolver.getCdnURL();
		resolve({
			version: version,
			endPoint: endPoint
		});
	});
}

module.exports = {
	initByCdn: initByCdn,
	initByRegion: initByRegion,
	initByVersion: initByVersion
};
