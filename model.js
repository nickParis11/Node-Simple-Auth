
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');


console.log('in model.js');


const schema = new mongoose.Schema({ 
	username: {
		type : String,
		lowercase : true,
		required : true,
		unique : true
	}, 
	password: {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true,
		lowercase : true,
		unique : true
	}
});

schema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
  user.password = hash;
  next();
	});
});


const User = mongoose.model('User', schema);

module.exports = User;