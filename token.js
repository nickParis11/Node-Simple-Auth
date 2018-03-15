const log = console.log;
log('in token.js');
let token, verifyToken;

// Global app parameters
const secret = '___FbRcExDis*"HsEdRfE__'; // in production i would put the secret in an external file on the server and read it using node, i would not push that file on github

// external modules
const jwt = require('jsonwebtoken');


getToken = function (username,email) {

	const finalToken = jwt.sign({ data: username }, secret, { expiresIn: '10h' });

	return finalToken;

};

verifyToken = function (token,cb)  {
	
	let verify = jwt.verify(token, secret,function(err, decoded) {
	  if (err) {
	  	log('token did not match');
	  	cb(err);
	  	return;
	  };
	  cb(null,true); 
	});
	log('verify = ',verify);
	return verify;
}

module.exports.verifyToken = verifyToken;
module.exports.getToken = getToken;

