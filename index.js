const dataDragonAPI = require('./dataDragonAPI/dataDragonAPI');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

dataDragonAPI.initByCdn()
	.then(() =>
		dataDragonAPI.getStaticChampions())
	.catch(e => {
		console.error(`.catch(${e})`);
	});
