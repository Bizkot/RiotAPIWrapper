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

function getStaticChampions(version, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		const dataFileURL = urlResolver.getStaticDataFileURL('champion', version, locale);
		loadStaticData(dataFileURL)
			.then(champions => {
				resolve(champions);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getStaticIndividualChampion(championName, version, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		const dataFileURL = urlResolver.getStaticDataFileURL('champion', version, locale);
		loadStaticData(dataFileURL)
			.then(individualChampion => {
				resolve(individualChampion);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getStaticChampionById(championId, version, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticChampions(version, locale)
			.then(champions => {
				Object.keys(champions.data).forEach(championName => {
					if (championId === champions.data[championName].key) {
						resolve(champions.data[championName]);
					}
				});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getStaticItems(version, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		const dataFileURL = urlResolver.getStaticDataFileURL('item', version, locale);
		loadStaticData(dataFileURL)
			.then(items => {
				resolve(items);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getStaticItem(itemId, version, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticItems(version, locale)
			.then(items => {
				Object.keys(items.data).forEach(id => {
					if (itemId === id) {
						resolve(items.data[id]);
					}
				});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getStaticMasteries(version = '7.23.1', locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		const dataFileURL = urlResolver.getStaticDataFileURL('mastery', version, locale);
		loadStaticData(dataFileURL)
			.then(masteries => {
				resolve(masteries);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getStaticMastery(masteryId, version = '7.23.1', locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticMasteries(version, locale)
			.then(masteries => {
				Object.keys(masteries.data).forEach(id => {
					if (masteryId === id) {
						resolve(masteries.data[id]);
					}
				});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function run() {
	try {
		initializer.initByVersion('8.24.1')
			.then(init => {
				getStaticMastery('6351')
					.then(data => {
						console.log(data);
					});
			})
			.catch(err => {
				throw new Error(err.message);
			});
	} catch(err) {
		console.error(err.message);
	}
}

module.exports = {
	getStaticChampions: getStaticChampions,
	getStaticIndividualChampion: getStaticIndividualChampion,
	getStaticChampionById: getStaticChampionById,
	getStaticItems: getStaticItems,
	getStaticItem: getStaticItem,
	run: run
};
