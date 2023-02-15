const requestedAt = (req, res, next) => {
	req.requestedAt = new Date().toISOString();
	next();
};

module.exports = { requestedAt };
