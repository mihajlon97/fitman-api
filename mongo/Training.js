const mongoose                 = require('mongoose');
const { AccountSchema }        = require('./Account');
const { GymBranchSchema }      = require('./GymBranch');
const { RequestSchema }        = require('./Request');

let schema = new mongoose.Schema({
	type             : { type: String },
	title            : { type: String,     default: 'Training' },
	className        : { type: String,     default: 'event-green' },
	is_free          : { type: Boolean,    default: false },
	time             : { type: Date,       default: Date.now },
	trainer          : { type: AccountSchema },
	manager          : { type: AccountSchema },
	place            : { type: GymBranchSchema },
	requests         : { type: [RequestSchema] },
});

module.exports.TrainingSchema = schema;
module.exports.Trainings = mongoose.model('Trainings', schema);
