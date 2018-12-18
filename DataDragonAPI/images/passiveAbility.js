const superagent = require('superagent');

module.exports.run = async (passiveFull) => {
	let {passiveAbility} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/passive/${passiveFull}.png`;
	await superagent
		.get(url)
		.then(res => {
			passiveAbility = res.body;
			console.log(url);
			console.log(passiveAbility);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
