const mongoose                 = require('mongoose');
const { AccountSchema }        = require('./Account');
const { GymBranchSchema }      = require('./GymBranch');
const { RequestSchema }        = require('./Request');

let schema = new mongoose.Schema({
	_id              : { type: Number },
	type             : { type: String },
	title            : { type: String,     default: 'Training' },
	className        : { type: String,     default: 'event-green' },
	is_free          : { type: Boolean,    default: false },
	start            : { type: String },
	end              : { type: String },
	trainer          : { type: AccountSchema },
	manager          : { type: AccountSchema },
	place            : { type: GymBranchSchema },
	requests         : { type: [RequestSchema] },
}, { _id: false });

module.exports.TrainingSchema = schema;
module.exports.Trainings = mongoose.model('Trainings', schema);
