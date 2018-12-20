const superagent = require('superagent');
const initializer = require('./initializer');
const urlResolver = require('./urlResolver');
const LoadingStaticDataException = require('./Exceptions/LoadingStaticDataException');

let version = '';

function loadStaticData(dataFileURL) {
	return new Promise(function(resolve, reject) {
		superagent
			.get(dataFileURL)
			.then(res => {
				resolve(res.body);
			})
			.catch(err => {
				reject(new LoadingStaticDataException(err.message, err.status));
			});
	});
}

function getStaticChampions(locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('champion', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticIndividualChampion(championName, locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('champion/', version, locale, championName);
	return loadStaticData(dataFileURL);
}

function getStaticChampionById(championId, locale = 'fr_FR') {
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

function getStaticItems(locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('item', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticItem(itemId, locale = 'fr_FR') {
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
						return resolve(runes.data[id]);
					}
				});
			})
			.catch(reject);
	});
}

function getStaticProfileIcons(locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('profileicon', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticProfileIcon(iconId, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticProfileIcons(version, locale)
			.then(icons => {
				Object.keys(icons.data).forEach(id => {
					if (iconId === id) {
						return resolve(icons.data[id]);
					}
				});
			})
			.catch(reject);
	});
}

function getStaticRunesReforged(locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('runesReforged', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticRuneReforged(runeReforgedId, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticRunesReforged(version, locale)
			.then(runesReforged => {
				runesReforged.forEach(rune => {
					if (runeReforgedId === rune.id) {
						return resolve(rune);
					}
					rune.slots.forEach(slot => {
						slot.runes.forEach(rune => {
							if (runeReforgedId === rune.id) {
								return resolve(rune);
							}
						});
					});
				});
			})
			.catch(reject);
	});
}

function getStaticSummonerSpells(locale = 'fr_FR') {
	const dataFileURL = urlResolver.getStaticDataFileURL('summoner', version, locale);
	return loadStaticData(dataFileURL);
}

function getStaticSummonerSpell(summonerSpellId, locale = 'fr_FR') {
	return new Promise(function(resolve, reject) {
		getStaticSummonerSpells(version, locale)
			.then(summonerSpells => {
				Object.keys(summonerSpells.data).forEach(sumonnerSpellName => {
					if (summonerSpellId === summonerSpells.data[sumonnerSpellName].key) {
						resolve(summonerSpells.data[sumonnerSpellName]);
					}
				});
			})
			.catch(reject);
	});
}

function initByCdn() {
	return initializer.initByCdn()
		.then(v => {
			version = v;
		});
}

function initByRegion(region) {
	return initializer.initByRegion(region)
		.then(v => {
			version = v;
		});
}

function initByVersion(initVersion) {
	version = initVersion;
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
	getStaticRunesReforged: getStaticRunesReforged,
	getStaticRuneReforged: getStaticRuneReforged,
	getStaticSummonerSpells: getStaticSummonerSpells,
	getStaticSummonerSpell: getStaticSummonerSpell,
	initByCdn: initByCdn,
	initByRegion: initByRegion,
	initByVersion: initByVersion
};
