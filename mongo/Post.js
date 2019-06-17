const mongoose             = require('mongoose');
const { AccountSchema }    = require('./Account');

let schema = new mongoose.Schema({
	title            : { type: String },
	text             : { type: String },
	media_url        : { type: String },
	type             : { type: String },
	field            : { type: String },
	time             : { type: Date,    default: Date.now },
	account          : { type: AccountSchema },
});

module.exports.PostSchema = schema;
module.exports.Posts = mongoose.model('Posts', schema);
