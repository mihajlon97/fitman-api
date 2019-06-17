let mongoose = require('mongoose');

let schema = new mongoose.Schema({
	address          : { type: String },
	city             : { type: String },
	country          : { type: String },

	// Reference on Gym
	gym              : { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
});

module.exports.GymBranchSchema = schema;
module.exports.GymBranches = mongoose.model('GymBranches', schema);
