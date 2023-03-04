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

exports.getAllMovies = async (req, res) => {
	try {
		const movies = await Movie.find();
		res.status(200).json({
			status: 'success',
			length: movies.length,
			data: {
				movies,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.getMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		res.status(200).json({
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

exports.updateMovie = async (req, res) => {
	try {
		const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

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

exports.deleteMovie = async (req, res) => {
	try {
		const movie = await Movie.findByIdAndDelete(req.params.id);

		res.status(201).json({
			status: 'Movie deleted',
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
