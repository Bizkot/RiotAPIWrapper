module.exports = class LoadingStaticDataException extends require('./AppError') {
	constructor(message, status) {
		super(message, status);
	}
};
