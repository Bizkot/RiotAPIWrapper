const superagent = require('superagent');

module.exports.run = async () => {
	let {summonerSpells} = {};
	await superagent
		.get('http://ddragon.leagueoflegends.com/cdn/8.24.1/data/fr_FR/summoner.json')
		.then(res => {
			summonerSpells = res.body.data;
			console.log(summonerSpells);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
