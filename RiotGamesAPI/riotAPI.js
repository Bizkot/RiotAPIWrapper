const apiKey = require('../apiKey.json').apiKey;
const superagent = require('superagent');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


function getSummonerBySummonerName(region, version, summonerName) {
	const requestURL = `https://${region}.api.riotgames.com/lol/summoner/${version}/summoners/by-name/${summonerName}`;
	superagent
		.get(requestURL)
		.set('X-Riot-Token', apiKey)
		.then(res => {
			console.log(res.body);
		});

}

getSummonerBySummonerName('euw1', 'v4', '42697a6b6f74');
