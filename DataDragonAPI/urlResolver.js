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

function getImageURL(imageType, version, key) {
	return getCdnURL() + `${version}/img/${imageType}/${key}`;
}

module.exports = {
	getDataDragonURL: getDataDragonURL,
	getCdnURL: getCdnURL,
	getStaticDataFileURL: getStaticDataFileURL,
	getImageURL: getImageURL
};
