const PLATFORMS = {
	'br': 'br1',
	'eune': 'eun1',
	'euw': 'euw1',
	'jp': 'jp1',
	'kr': 'kr',
	'lan': 'la1',
	'las': 'la2',
	'na': 'na1',
	'oce': 'oc1',
	'pbe': 'pbe',
	'ru': 'ru',
	'tr': 'tr1'
};

module.exports = function getPlatform(region) {
	return PLATFORMS[region.toLowerCase()];
};

module.exports.REGIONS = Object.keys(PLATFORMS);
module.exports.PLATFORMS = Object.values(PLATFORMS);
