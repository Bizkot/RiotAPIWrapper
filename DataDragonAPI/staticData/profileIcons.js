const superagent = require('superagent');

module.exports.run = async () => {
	let {profileIcons} = {};
	await superagent
		.get('http://ddragon.leagueoflegends.com/cdn/8.24.1/data/fr_FR/profileicon.json')
		.then(res => {
			profileIcons = res.body.data;
			console.log(profileIcons);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
