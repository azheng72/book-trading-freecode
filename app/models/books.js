'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = new Schema({

	title: String,
	image: String,
    traded:String
});

module.exports = mongoose.model('Books', Books);
