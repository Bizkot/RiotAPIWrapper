const superagent = require('superagent');

module.exports.run = async (championName) => {
	let {champion} = {};
	await superagent
		.get(`http://ddragon.leagueoflegends.com/cdn/8.24.1/data/fr_FR/champion/${championName}.json`)
		.then(res => {
			champion = res.body.data[championName];
			console.log(champion);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
