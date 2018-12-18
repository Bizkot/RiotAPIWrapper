module.exports.getStaticChampions = async (loadStaticData, key, locale, fragment) => {
	return loadStaticData('champion', key, locale, fragment);
};
