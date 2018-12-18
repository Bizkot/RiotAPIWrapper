const superagent = require('superagent');
const champions = require('./Data/champions.js');

let endPoint = '';
let version = '';

let ssl = true;

function getURLSchema() {
	return ssl ? 'https' : 'http';
}

function getDataDragonURL() {
	return getURLSchema() + '://ddragon.leagueoflegends.com';
}

function getCdnURL() {
	return getDataDragonURL() + '/cdn/';
}

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

		endPoint = getCdnURL();

	});
}


function initByRegion(region) {
	return new Promise(function(resolve, reject) {
		region = region.toLowerCase();
		const regionURL = getDataDragonURL() + `/realms/${region}.json`;
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
	return new Promise(function(resolve, reject) {
		version = initVersion;
		endPoint = getCdnURL();
		resolve({
			version: version,
			endPoint: endPoint
		});
	});
}

function loadStaticData(dataType, key = '', locale = 'fr_FR', fragment = '') {
	const dataFileURL = getCdnURL() + `${version}/data/${locale}/${dataType}${key}.json${fragment}`;
	superagent
		.get(dataFileURL)
		.then(res => {
			console.log(res.body);
		})
		.catch(err => {
			throw new Error(err.message);
		});
}

module.exports.run = function() {
	try  {
		initByVersion('8.24.1')
			.then(params => {
				// console.log(params['version'], params['endPoint']);
				champions.getStaticChampions(loadStaticData);
			})
			.catch(err => {
				throw new Error(err.message);
			});
	} catch(err) {
		console.error(err.message);
	}
};
