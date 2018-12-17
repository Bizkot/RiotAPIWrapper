const superagent = require('superagent');

module.exports.run = async (championName, skinNumber) => {
	let {loadingScreenArt} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skinNumber}.jpg`;
	superagent
		.get(url)
		.then(res => {
			loadingScreenArt = res.body;
			console.log(url);
			console.log(loadingScreenArt);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
