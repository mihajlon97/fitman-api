const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	_id              : { type: Number },
	address          : { type: String },
	city             : { type: String },
	country          : { type: String },

	// Reference on Gym
	gym              : { type: Number, ref: 'Gym' },
}, { _id: false });

module.exports.GymBranchSchema = schema;
module.exports.GymBranches = mongoose.model('GymBranches', schema);
