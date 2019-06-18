const mongoose               = require('mongoose');
const {GymBranchSchema}      = require('./GymBranch');

let schema = new mongoose.Schema({
	_id             : { type: Number, index: true },
	name            : { type: String },
	phone           : { type: String },
	email           : { type: String },
	logo            : { type: String },
	desc            : { type: String },
	time            : { type: Date,    default: Date.now },

	branches        : { type: [GymBranchSchema] },
}, { _id: false, shardkey: { _id: 1 } });

module.exports.GymSchema = schema;
module.exports.Gyms = mongoose.model('Gyms', schema);
