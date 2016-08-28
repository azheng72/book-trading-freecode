'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Traded = new Schema({

	title: String,
	image: String,
    username:String,  //who request to trade
    origin_id:String //record the _id when in the Books collection
});

module.exports = mongoose.model('Traded', Traded);
