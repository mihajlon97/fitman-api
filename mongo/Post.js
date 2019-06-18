const mongoose             = require('mongoose');
const { AccountSchema }    = require('./Account');

let schema = new mongoose.Schema({
	_id              : { type: Number },
	title            : { type: String },
	text             : { type: String },
	media_url        : { type: String },
	type             : { type: String },
	field            : { type: String },
	time             : { type: Date,    default: Date.now },
	account          : { type: AccountSchema },
}, { _id: false });

module.exports.PostSchema = schema;
module.exports.Posts = mongoose.model('Posts', schema);
