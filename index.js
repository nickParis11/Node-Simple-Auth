const log = console.log;

/*******************************
the block code preceded by //=> xxxx.js
indicate teh blocks that i would externalize in a dedicated js file in real production

***********************************/

// external modules
const express = require('express');
const body = require('body-parser');
const mongoose = require('mongoose');

// internal modules
	const User = require('./model');
	const token = require('./token');

//=> dbConn.js

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

//=> router.js

// pre -routing : allow adding user and getting a token back for that user for a specific period of time
app.post('/api/adduser',function(req,res){

	const user = new User ( {
		username : req.body.username,
		email : req.body.email,
		password : req.body.password
	})

	let didTimeOut = true;


	user.save(function (err) {
		if (err) {
			return err;
		}
		const userToken = token.getToken(user.username,user.email); // would use a callback pattern here as in routing securization section below.

		res.status(200).send('good to go, inserted : '+JSON.stringify(userToken));

		didTimeOut = false;
	})

	setTimeout(function () 
		{
			if ( didTimeOut ) {
				res.status(500).send('something went wrong when inserting : '+JSON.stringify(user));
			}
		}, 4000 );
})


//  routing securization step using custom middleware
app.use(function (req,res,next){

	const providedToken = req.body.token || req.headers['x-access-token'];
	// if token
	if ( providedToken ) {

		token.verifyToken( providedToken, (err,result) => {

			if (err) {
				res.send('invalid token provided');
			}
			next();

		}) 
		/*
	 //if decode token
	 if ( token.verifyToken( providedToken ) ) {
	 	 next();
	 } else { 	// else token didnt match
		res.send('invalid token provided');
	 } 

	 */
	} else { // else no token found
		res.send('no token provided');
	}
})

//=> router.js

// main routing : anything once securization step is over
app.post('*',function(req,res){
	res.send('in main route after a POST');
})
app.get('*', function (req,res) {
	res.send('in main route after a GET');
})

// instanciate server
app.listen(port,function() {
	log('servers listens on ',port);
})



