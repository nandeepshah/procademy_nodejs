const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: String,
	duration: {
		type: Number,
		required: true,
	},
	ratings: {
		type: Number,
		default: 1.0,
	},
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
