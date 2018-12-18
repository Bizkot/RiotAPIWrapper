const superagent = require('superagent');

module.exports.run = async () => {
	let {masteries} = {};
	await superagent
		.get('http://ddragon.leagueoflegends.com/cdn/7.23.1/data/fr_FR/mastery.json')
		.then(res => {
			masteries = res.body.data;
			console.log(masteries);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
