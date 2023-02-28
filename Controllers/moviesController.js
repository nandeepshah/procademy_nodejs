const fs = require('fs');
const Movie = require('../Models/movieModel');

const data = fs.readFileSync('./data/movies.json');
const movies = JSON.parse(data);

exports.checkId = (req, res, next, value) => {
	const selectedMovie = movies.find(m => m.id === Number(value));
	if (!selectedMovie) {
		return res
			.status(404)
			.json({ status: 'failed', message: `No movies with id:${value} found!` });
	}
	next();
};

exports.validateBody = (req, res, next) => {
	if (!req.body.name || !req.body.releaseYear) {
		return res.status(400).json({
			status: 'fail',
			message: 'Invalid movie data',
		});
	}
	next();
};

exports.getAllMovies = (req, res) => {
	res.status(200).json({
		status: 'success',
		requestedAt: req.requestedAt,
		count: movies.length,
		data: { movies },
	});
};

exports.getMovie = (req, res) => {
	const { id } = req.params;
	// const selectedMovie = movies.find(m => m.id === Number(id));
	// if (!selectedMovie) {
	// 	return res
	// 		.status(404)
	// 		.json({ status: 'failed', message: `No movies with id:${id} found!` });
	// }
	return res
		.status(200)
		.json({ status: 'success', data: { movie: selectedMovie } });
};

exports.addMovie = (req, res) => {
	if (Object.keys(req.body).length === 0) {
		res.status(404).json({ status: 'error', message: 'No Data' });
		return;
	}
	const newId = movies[movies.length - 1]?.id + 1;
	const newMovie = { id: newId, ...req.body };
	movies.push(newMovie);
	fs.writeFile('./data/movies.json', JSON.stringify(movies), (err, data) => {
		res.send('File Updated');
	});
};

exports.updateMovie = (req, res) => {
	const id = Number(req.params.id);

	const movieToUpdate = movies.find(m => m.id === id);

	// if (!movieToUpdate) {
	// 	return res
	// 		.status(404)
	// 		.json({ status: 'failed', message: `No movies with id:${id} found!` });
	// }
	const indexOfMovie = movies.indexOf(movieToUpdate);
	const updatedMovie = { ...movieToUpdate, ...req.body };
	movies[indexOfMovie] = updatedMovie;
	fs.writeFile('./data/movies.json', JSON.stringify(movies), (err, data) => {
		return res.status(201).json({
			status: 'success',
			message: 'Movie successfully updated!',
			data: { movie: updatedMovie },
		});
	});
};

exports.deleteMovie = (req, res) => {
	const id = Number(req.params.id);

	const movieToDelete = movies.find(m => m.id === id);

	// if (!movieToDelete) {
	// 	return res
	// 		.status(404)
	// 		.json({ status: 'failed', message: `No movies with id:${id} found!` });
	// }
	const indexOfMovie = movies.indexOf(movieToDelete);
	movies.splice(indexOfMovie, 1);
	fs.writeFile('./data/movies.json', JSON.stringify(movies), (err, data) => {
		return res.status(204).json({
			status: 'success',
			message: 'Movie successfully deleted!',
			data: { movie: null },
		});
	});
};
