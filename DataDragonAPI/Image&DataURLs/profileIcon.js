const superagent = require('superagent');

module.exports.run = async (profileIconID) => {
	let {profileIcon} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/profileicon/${profileIconID}.png`;
	superagent
		.get(url)
		.then(res => {
			profileIcon = res.body;
			console.log(url);
			console.log(profileIcon);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
