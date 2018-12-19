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
			.catch(reject);
	});
}

function getStaticChampions(version, locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('champion', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticIndividualChampion(championName, version, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		const dataFileURL = urlResolver.getStaticDataFileURL('champion', version, locale);
		loadStaticData(dataFileURL)
			.then(individualChampion => {
				resolve(individualChampion);
			})
			.catch(reject);
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
			.catch(reject);
	});
}

function getStaticItems(version, locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('item', version, locale);
	return loadStaticData(dataFileURL);
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
			.catch(reject);
	});
}

function getStaticMasteries(version = '7.23.1', locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('mastery', version, locale);
	return loadStaticData(dataFileURL);
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
			.catch(reject);
	});
}

function getStaticRunes(version = '7.23.1', locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('rune', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticRune(runeId, version = '7.23.1', locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticRunes(version, locale)
			.then(runes => {
				Object.keys(runes.data).forEach(id => {
					if (runeId === id) {
						resolve(runes.data[id]);
					}
				});
			})
			.catch(reject);
	});
}

function getStaticProfileIcons(version, locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('profileicon', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticProfileIcon(iconId, version, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticProfileIcons(version, locale)
			.then(icons => {
				Object.keys(icons.data).forEach(id => {
					if (iconId === id) {
						resolve(icons.data[id]);
					}
				});
			})
			.catch(reject);
	});
}

function run() {
	try {
		initializer.initByVersion('8.24.1')
			.then(init => {
				getStaticProfileIcon('3836', init['version'])
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
	getStaticMasteries: getStaticMasteries,
	getStaticMastery: getStaticMastery,
	getStaticRunes: getStaticRunes,
	getStaticRune: getStaticRune,
	getStaticProfileIcons: getStaticProfileIcons,
	getStaticProfileIcon: getStaticProfileIcon,
	run: run
};
