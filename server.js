const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = process.env.PORT || 3300;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
	console.log('Server Started');
});

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
