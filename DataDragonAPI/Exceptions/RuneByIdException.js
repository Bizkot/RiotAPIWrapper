module.exports = class RuneByIdException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
