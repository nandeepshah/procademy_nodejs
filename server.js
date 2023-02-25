const app = require('./app');

// console.log(app.get('env'));

const [PORT, HOST] = [3300, '127.0.0.1'];
console.log(process.env.NODE_ENV);
app.listen(PORT, HOST, () => {
	console.log('Server Started');
});
