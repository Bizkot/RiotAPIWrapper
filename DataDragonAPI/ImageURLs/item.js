const superagent = require('superagent');

module.exports.run = async (itemFull) => {
	let {item} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/item/${itemFull}.png`;
	await superagent
		.get(url)
		.then(res => {
			item = res.body;
			console.log(url);
			console.log(item);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
