const superagent = require('superagent');

module.exports.run = async (spriteFull) => {
	let {sprite} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/sprite/${spriteFull}.png`;
	superagent
		.get(url)
		.then(res => {
			sprite = res.body;
			console.log(url);
			console.log(sprite);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
