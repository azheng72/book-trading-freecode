//Design Schema for Mongoose model


'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	user: {
		username: String,
		password: String,
		name:String,
		city:String,
		state:String
	},
	books:[
		{
			title:String,
			image:String
		}
	]
});

module.exports = mongoose.model('User', User);
