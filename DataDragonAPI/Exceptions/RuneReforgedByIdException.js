module.exports = class RuneReforgedByIdException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
