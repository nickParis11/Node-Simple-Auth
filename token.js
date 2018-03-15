const log = console.log;
log('in token.js');
let token, verifyToken;

// Global app parameters
const secret = '___FbRcExDis*"HsEdRfE__';

// external modules
const jwt = require('jsonwebtoken');


getToken = function (username,email) {

	const finalToken = jwt.sign({ data: username }, secret, { expiresIn: '10h' });

	return finalToken;

};

verifyToken = function (token)  {
	
	let verify = jwt.verify(token, secret,function(err, decoded) {
	  
	  if (err) log('token did not match');
	  log ('succesfully retrieved token');
	});

	return verify;

}

module.exports.verifyToken = verifyToken;
module.exports.getToken = getToken;

