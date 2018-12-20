module.exports = class ProfileIconByIdException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
