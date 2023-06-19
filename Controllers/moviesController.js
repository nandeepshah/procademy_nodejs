const Movie = require('../Models/movieModel');

exports.getAllMovies = async (req, res) => {
	console.log(req.query);
	try {
		//convering the query Object to a string
		let queryString = JSON.stringify(req.query);
		//using regex to replace the operators with a $ in front for Mongoose ODM
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			match => `$${match}`
		);
		//Converting the string back to an object
		queryString = JSON.parse(queryString);
		const movies = await Movie.find(queryString);

		// const movies = await Movie.find()
		// 	.where('duration')
		// 	.gte(req.query.duration)
		// 	.where('ratings')
		// 	.gte(req.query.ratings)
		// 	.where('price')
		// 	.lte(req.query.price);

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
