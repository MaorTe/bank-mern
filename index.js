const express = require('express');
require('./db/mongoose');
const app = express();
// @ts-ignore
const router = new express.Router();
const accountRouter = require('./routers/account');

//express uses
app.use(express.json());
app.use(router);
app.use(accountRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('listening...');
});
