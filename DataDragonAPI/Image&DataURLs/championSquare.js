const superagent = require('superagent');

module.exports.run = async (championName) => {
	let {square} = {};
	const url = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/${championName}.png `;
	superagent
		.get(url)
		.then(res => {
			square = res.body;
			console.log(url);
			console.log(square);
		})
		.catch(err => {
			console.log('Err', err.message);
		});
};
