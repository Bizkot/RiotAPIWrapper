module.exports = class SummonerSpellByIdException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
