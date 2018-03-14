const log = console.log;

// external modules
const express = require('express');
const body = require('body-parser');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');


// internal modules
	const User = require('./model');
	log('User = ',User)

// db connection ( to be put in another module)

	// optional callback that gets fired when initial connection completed
	var uri = 'mongodb://localhost:27017/test';
	mongoose.connect(uri, function(error) {
	  // if error is truthy, the initial connection failed.
	  if ( error === null ) {
	  	log('connected to db');
		} else {
			log('error = ',error);
		}
	})

// declare app
const app = express();

const port = 7500;

// middleware
app.use(body.json());

// routes
app.post('/api/adduser',function(req,res){

	const user = new User ( {
		username : req.body.username,
		email : req.body.email,
		password : req.body.password
	})

	log('B4 save');

	user.save(function (err) {
		log('in save');
	if (err) return err;
		log('successfully saved user : ',user);
		res.status(200).send('good to go, inserted : '+JSON.stringify(user));
	})

	setTimeout(function () {
		res.status(500).send('something went wrong when inserting : '+JSON.stringify(user));
	},4000)

})


// instanciate server
app.listen(port,function() {
	log('servers listens on ',port);
})





