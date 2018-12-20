module.exports = class InitializationError extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
