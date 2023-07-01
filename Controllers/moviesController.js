const Movie = require('../Models/movieModel');

exports.getAllMovies = async (req, res) => {
	try {
		//converting the query Object to a string
		let queryString = JSON.stringify(req.query);
		//using regex to replace the operators with a $ in front for Mongoose ODM
		//this is only for mongoose ODM where the properties h
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			match => `$${match}`
		);
		//Converting the string back to an object
		const queryObj = JSON.parse(queryString);
		//removing the sort field from the filter since model does not have a sort field
		if (queryObj.hasOwnProperty('sort')) {
			delete queryObj['sort'];
		}

		let movies = await Movie.find(queryObj).sort(req.query.sort);

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
