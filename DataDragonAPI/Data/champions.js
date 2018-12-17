const superagent = require('superagent');

module.exports.run = async () => {
	let {champions} = {};
	await superagent
		.get('http://ddragon.leagueoflegends.com/cdn/8.24.1/data/fr_FR/champion.json')
		.then(res => {
			champions = res.body.data;
			console.log(champions);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
