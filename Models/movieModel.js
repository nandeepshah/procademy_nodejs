const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	description: String,
	duration: {
		type: Number,
		required: true,
	},
	ratings: {
		type: Number,
	},
	totalRating: {
		type: Number,
	},
	releaseYear: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	genres: {
		type: [String],
		required: [true, 'Genres is required'],
	},
	directors: {
		type: [String],
		required: [true, 'Directors is required'],
	},
	coverImage: {
		type: String,
		requried: [true, 'Cover Image is needed'],
	},
	price: {
		type: Number,
		requried: true,
	},
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
