module.exports.ENDPOINTS = {
	'SUMMONER_BY_ACCOUNT_V4': '/lol/summoner/v4/summoners/by-account/{encryptedAccountId}',
	'SUMMONER_BY_NAME_V4':'/lol/summoner/v4/summoners/by-name/{summonerName}',
	'SUMMONER_BY_PUUID_V4':'/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}',
	'SUMMONER_BY_ID_v4':'/lol/summoner/v4/summoners/{encryptedSummonerId}',
	'CHAMPION_MASTERIES_V4': '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}',
	'CHAMPION_MASTERY_V4': '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}',
	'SCORE_V4:': '/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}'
};

module.exports.formatEndpoint = (endPoint, mapObj) => {
	Object.keys(mapObj).forEach(replacement => {
		endPoint = endPoint.replace(new RegExp(`{${replacement}}`, 'gi'), mapObj[replacement]);
	});
	return endPoint;
};
