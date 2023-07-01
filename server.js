// Mongoose is an ODM driver for MongoDB
const mongoose = require('mongoose');
// dotenv is an package for reading enviorenment variables in node
const dotenv = require('dotenv');
// provide the path to dotenv where the config file is stored.
dotenv.config({ path: './config.env' });
// get all the configurations for the server
const app = require('./app');

// define port and host variables
const PORT = process.env.PORT || 3300;
const HOST = process.env.HOST;

// start the server
app.listen(PORT, HOST, () => {
	console.log('Server Started');
});

// connect to MongoDB
mongoose
	.connect(process.env.CONN_STR, {
		useNewUrlParser: true,
	})
	.then(conn => {
		console.log('DB Connection Success');
	})
	.catch(err => {
		console.log('Something went wrong in DB connecton');
	});
