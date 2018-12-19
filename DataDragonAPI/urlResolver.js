let ssl = true;

function getURLSchema() {
	return ssl ? 'https' : 'http';
}

function getDataDragonURL() {
	return getURLSchema() + '://ddragon.leagueoflegends.com';
}

function getCdnURL() {
	return getDataDragonURL() + '/cdn/';
}

module.exports = {
	getDataDragonURL: getDataDragonURL,
	getCdnURL: getCdnURL
};
