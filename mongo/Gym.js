let mongoose = require('mongoose');
const {GymBranchSchema}      = require('./GymBranch');

let schema = new mongoose.Schema({
	name            : { type: String },
	phone           : { type: String },
	email           : { type: String },
	logo            : { type: String },
	desc            : { type: String },
	time            : { type: Date,    default: Date.now },

	branches        : { type: [GymBranchSchema] },
});

module.exports.GymSchema = schema;
module.exports.Gyms = mongoose.model('Gyms', schema);
