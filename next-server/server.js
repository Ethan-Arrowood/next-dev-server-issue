const http = require('http');
const next = require('next');
const { parse } = require('url');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: path.join(__dirname, './../next-app') });


app.prepare().then(() => {
	const handle = app.getRequestHandler();
	const upgradeHandler = app.getUpgradeHandler();

	const server = http.createServer((req, res) => {
		handle(req, res, parse(req.url, true));
	});

	server.on('upgrade', (req, socket, head) => {
		upgradeHandler(req, socket, head);
	});

	server.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Ready on http://localhost:3000');
	});
});


