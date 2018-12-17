const superagent = require('superagent');

module.exports.run = async (iconFull) => {
	let {icon} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/ui/${iconFull}.png`;
	superagent
		.get(url)
		.then(res => {
			icon = res.body;
			console.log(url);
			console.log(icon);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
