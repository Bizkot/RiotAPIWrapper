const superagent = require('superagent');

module.exports.run = async (summonerSpellFull) => {
	let {summonerSpell} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/spell/${summonerSpellFull}.png`;
	await superagent
		.get(url)
		.then(res => {
			summonerSpell = res.body;
			console.log(url);
			console.log(summonerSpell);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
