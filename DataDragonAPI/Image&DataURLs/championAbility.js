const superagent = require('superagent');

module.exports.run = async (abilityFull) => {
	let {championAbility} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/spell/${abilityFull}.png`;
	superagent
		.get(url)
		.then(res => {
			championAbility = res.body;
			console.log(url);
			console.log(championAbility);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
