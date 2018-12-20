module.exports = class ItemByIdException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
