const superagent = require('superagent');

module.exports.run = async () => {
	let {runesReforged} = {};
	await superagent
		.get('http://ddragon.leagueoflegends.com/cdn/8.24.1/data/fr_FR/runesReforged.json')
		.then(res => {
			runesReforged = res.body;
			console.log(runesReforged);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
