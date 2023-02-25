const express = require('express');
const { requestedAt } = require('./middleware');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(requestedAt);

app.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: '<h1>Hello from Express!</h1>', status: 200 });
});

app.use('/api/v1/movies', moviesRouter);

module.exports = app;
