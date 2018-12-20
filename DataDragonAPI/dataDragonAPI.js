const superagent = require('superagent');
const initializer = require('./initializer');
const urlResolver = require('./urlResolver');

const LoadingStaticDataException = require('./Exceptions/LoadingStaticDataException');
const ChampionByIdException = require('./Exceptions/ChampionByIdException');
const ItemByIdException = require('./Exceptions/ItemByIdException');
const MasteryByIdException = require('./Exceptions/MasteryByIdException');

let version = '';

function loadStaticData(dataFileURL) {
	return new Promise(function(resolve, reject) {
		superagent
			.get(dataFileURL)
			.then(res => {
				resolve(res.body);
			})
			.catch(err => {
				reject(new LoadingStaticDataException(`Failed to load static data for URL : ${dataFileURL}`, err.status));
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
		getStaticChampions(locale)
			.then(champions => {
				let champion;
				Object.keys(champions.data).forEach(championName => {
					if (championId === champions.data[championName].key) {
						champion = champions.data[championName];
					}
				});
				if (champion) {
					resolve(champion);
				} else {
					throw new ChampionByIdException(`Champion with ID ${championId} not found`, 404);
				}
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
		getStaticItems(locale)
			.then(items => {
				let item;
				Object.keys(items.data).forEach(id => {
					if (itemId === id) {
						item = items.data[id];
					}
				});
				if (item) {
					resolve(item);
				} else {
					throw new ItemByIdException(`Item with ID ${itemId} not found`, 404);
				}
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
				let mastery;
				Object.keys(masteries.data).forEach(id => {
					if (masteryId === id) {
						mastery = masteries.data[id];
					}
				});
				if (mastery) {
					resolve(mastery);
				} else {
					throw new MasteryByIdException(`Mastery with ID ${masteryId} not found`, 404);
				}
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
		getStaticProfileIcons(locale)
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
		getStaticRunesReforged(locale)
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
		getStaticSummonerSpells(locale)
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
