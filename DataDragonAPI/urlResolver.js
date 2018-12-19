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

function getStaticDataFileURL(dataType, version, locale = 'fr_FR', key = '') {
	return getCdnURL() + `${version}/data/${locale}/${dataType}${key}.json`;
}

module.exports = {
	getDataDragonURL: getDataDragonURL,
	getCdnURL: getCdnURL,
	getStaticDataFileURL: getStaticDataFileURL
};
