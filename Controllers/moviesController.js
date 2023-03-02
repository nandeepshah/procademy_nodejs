const Movie = require('../Models/movieModel');

exports.validateBody = (req, res, next) => {
	if (!req.body.name || !req.body.ratings) {
		return res.status(400).json({
			status: 'fail',
			message: 'Invalid movie data',
		});
	}
	next();
};

exports.getAllMovies = (req, res) => {};

exports.getMovie = (req, res) => {};

exports.addMovie = async (req, res) => {
	try {
		const movie = await Movie.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				movie,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.updateMovie = (req, res) => {};

exports.deleteMovie = (req, res) => {};
