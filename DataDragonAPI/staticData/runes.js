const superagent = require('superagent');

module.exports.run = async () => {
	let {runes} = {};
	await superagent
		.get('http://ddragon.leagueoflegends.com/cdn/7.23.1/data/fr_FR/rune.json')
		.then(res => {
			runes = res.body.data;
			console.log(runes);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
