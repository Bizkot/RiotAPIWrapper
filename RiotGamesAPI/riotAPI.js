const apiKey = require('../apiKey.json').apiKey;
const superagent = require('superagent');
const endpoints = require('./endpoints');
const ENDPOINTS = endpoints.ENDPOINTS;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// ***********************************************
// 								SUMMONER_V4
// ***********************************************

function getSummonerByAccount(encryptedAccountId) {
	const endPoint = endpoints.formatEndpoint(ENDPOINTS.SUMMONER_BY_ACCOUNT_V4, {'encryptedAccountId':encryptedAccountId});
	const requestURL = `https://euw1.api.riotgames.com${endPoint}`;
	superagent
		.get(requestURL)
		.set('X-Riot-Token', apiKey)
		.then(res => {
			console.log(res.body);
		});
}

function getSummonerBySummonerName(summonerName) {
	const endPoint = endpoints.formatEndpoint(ENDPOINTS.SUMMONER_BY_NAME_V4, {'summonerName':summonerName});
	const requestURL = `https://euw1.api.riotgames.com${endPoint}`;
	superagent
		.get(requestURL)
		.set('X-Riot-Token', apiKey)
		.then(res => {
			console.log(res.body);
		});
}

function getSummonerByPUUID(encryptedPUUID) {
	const endPoint = endpoints.formatEndpoint(ENDPOINTS.SUMMONER_BY_PUUID_V4, {'encryptedPUUID':encryptedPUUID});
	const requestURL = `https://euw1.api.riotgames.com${endPoint}`;
	superagent
		.get(requestURL)
		.set('X-Riot-Token', apiKey)
		.then(res => {
			console.log(res.body);
		});
}

function getSummonerBySummonerID(encryptedSummonerId) {
	const endPoint = endpoints.formatEndpoint(ENDPOINTS.SUMMONER_BY_ID_v4, {'encryptedSummonerId':encryptedSummonerId});
	const requestURL = `https://euw1.api.riotgames.com${endPoint}`;
	superagent
		.get(requestURL)
		.set('X-Riot-Token', apiKey)
		.then(res => {
			console.log(res.body);
		});
}

getSummonerByAccount('GUN7M24Mbocwi5viGzvfrcJekqyzThFENCI4o8NVsmnYzQ');
getSummonerBySummonerName('42697a6b6f74');
getSummonerByPUUID('Bl_C-uIsOE6ku84zWixoiVZijlttZXnEu8s1wD8Zx4UQLN0jmMc4TvvrcwzJa-l2dWNPhglHCB-brA');
getSummonerBySummonerID('UwImqG3NZPmy2JoN_diVZtM2kcmYZyZC2cE12IvLHT5UW_A');
