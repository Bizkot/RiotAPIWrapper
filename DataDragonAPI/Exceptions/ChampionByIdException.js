module.exports = class ChampionByIdException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
