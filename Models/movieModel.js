const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		trim: true,
	},
	duration: {
		type: Number,
		required: [true, 'Duration is required'],
	},
	ratings: {
		type: Number,
	},
	totalRating: {
		type: Number,
	},
	releaseYear: {
		type: Number,
		required: [true, 'Relese Year is required'],
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
	actors: {
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
