const superagent = require('superagent');

module.exports.run = async (miniMapFull) => {
	let {miniMap} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/map/${miniMapFull}.png`;
	superagent
		.get(url)
		.then(res => {
			miniMap = res.body;
			console.log(url);
			console.log(miniMap);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
