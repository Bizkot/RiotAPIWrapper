const superagent = require('superagent');
const initializer = require('./initializer');
const urlResolver = require('./urlResolver');

function loadStaticData(dataFileURL) {
	return new Promise(function(resolve, reject) {
		superagent
			.get(dataFileURL)
			.then(res => {
				resolve(res.body);
			})
			.catch(err => {
				reject(err);
			});
	});
}

async function getStaticChampions(version, locale = 'fr_FR') {
	const dataFileURL = urlResolver.getCdnURL() + `${version}/data/${locale}/champion.json`;
	loadStaticData(dataFileURL)
		.then(data => {
			console.log(data);
		});
}

module.exports.run = function() {
	try {
		initializer.initByVersion('8.24.1')
			.then(init => {
				getStaticChampions(init['version']);
			})
			.catch(err => {
				throw new Error(err.message);
			});
	} catch(err) {
		console.error(err.message);
	}
};
