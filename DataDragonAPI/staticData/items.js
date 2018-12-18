const superagent = require('superagent');

module.exports.run = async () => {
	let {items} = {};
	await superagent
		.get('http://ddragon.leagueoflegends.com/cdn/8.24.1/data/fr_FR/item.json')
		.then(res => {
			items = res.body.data;
			console.log(items);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
