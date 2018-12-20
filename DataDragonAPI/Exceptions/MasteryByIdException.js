module.exports = class MasteryByIdException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
