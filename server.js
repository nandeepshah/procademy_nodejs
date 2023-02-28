const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
	.connect(process.env.CONN_STR, {
		useNewUrlParser: true,
	})
	.then(conn => {
		console.log('DB Connection Success');
	})
	.catch(err => {
		console.log('Something went wrong');
	});

const movieSchema = new mongoose.Schema({
	name: {
		type: Number,
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

const PORT = process.env.PORT || 3300;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
	console.log('Server Started');
});
