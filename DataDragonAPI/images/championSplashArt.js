const superagent = require('superagent');

module.exports.run = async (championName, skinNumber) => {
	let {splashArt} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skinNumber}.jpg`;
	await superagent
		.get(url)
		.then(res => {
			splashArt = res.body;
			console.log(url);
			console.log(splashArt);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
