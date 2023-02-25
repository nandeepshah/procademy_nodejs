const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const PORT = process.env.PORT || 3300;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
	console.log('Server Started');
});
