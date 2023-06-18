const express = require('express');
const { requestedAt } = require('./middleware');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static('./public'));
app.use(requestedAt);

app.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: '<h1>Hello from Express!</h1>', status: 200 });
});

app.use('/api/v1/movies', moviesRouter);
app.use('/users', userRouter);

module.exports = app;
