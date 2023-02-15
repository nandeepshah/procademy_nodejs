const app = require('./app');

const [PORT, HOST] = [3300, '127.0.0.1'];

app.listen(PORT, HOST, () => {
	console.log('Server Started');
});
