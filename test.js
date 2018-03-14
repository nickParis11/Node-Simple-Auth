const log = console.log;

const express = require('express');

const app = express();

const port = 7500;

app.listen(port,function() {
	log('servers listens on ',port);
})

