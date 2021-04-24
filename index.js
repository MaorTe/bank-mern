const express = require('express');
const path = require('path');
require('./db/mongoose');
const app = express();
// @ts-ignore
const router = new express.Router();
const accountRouter = require('./routers/account');

//express uses
app.use(express.json());
app.use(router);
app.use(accountRouter);

//deploy to heroku
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log('listening...');
});
