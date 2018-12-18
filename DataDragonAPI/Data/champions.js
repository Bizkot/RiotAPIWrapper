module.exports.getStaticChampions = async (loadStaticData, locale = 'fr_FR') => {
	return loadStaticData('champion');
};
