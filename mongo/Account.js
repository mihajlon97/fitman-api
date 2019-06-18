const bcrypt                 = require('bcryptjs');
const jwt                    = require('jsonwebtoken');
const CONFIG                 = require('../config/config');
const {TE, to}               = require('../services/UtilService');
const {GymBranchSchema}      = require('./GymBranch');
const mongoose               = require('mongoose');

let schema = new mongoose.Schema({
	_id           : { type: Number },
	name          : { type: String },
	gender        : { type: String, enum: ['male', 'female', 'unknown'],  default: 'unknown' },
	role          : { type: String, enum: ['user', 'trainer', 'manager'], default: 'user' },
	username      : { type: String, index: { unique: false } },
	password      : { type: String },
	photo_url     : { type: String,  default: 'https://cdn.werbifi.com/werbifi/user.png' },
	hash          : { type: String },
	is_verified   : { type: Boolean, default: false },

	// Manager
	desc          : { type: String },
	permissions   : { type: Object },

	// Trainer
	rate          : { type: Number },

	// User role
	interest      : { type: String },
	favorite      : { type: String },

	time          : { type: Date, default: Date.now },

	GymBranch     : { type: GymBranchSchema },

	// Follow Model pre-joined
	following     : { type: [this] },
	followers     : { type: [this] },
}, { _id: false });

/**
 * Before save middleware
 */
schema.pre('save', async function(next) {
	let account = this;
	// only hash the password if it has been modified (or is new)
	if (!account.isModified('password')) return next();

	let salt, hash, err;
	[err, salt] = await to(bcrypt.genSalt(10));
	if(err) TE(err.message, true);

	[err, hash] = await to(bcrypt.hash(account.password, salt));
	if(err) TE(err.message, true);
	account.password = hash;
	next();
});

schema.methods.getJWT = function (expiresIn = parseInt(CONFIG.jwt_expiration)) {
	return jwt.sign({ id:this.id, role:this.role }, CONFIG.jwt_encryption, {expiresIn});
};

schema.methods.comparePassword = async function (pw) {
	if(!this.password) TE('Password not set!');
	let [err, pass] = await to(bcrypt.compare(pw, this.password));
	if(err) TE(err);
	if(!pass) TE('Invalid password!');
	return this;
};

module.exports.AccountSchema = schema;
module.exports.Accounts = mongoose.model('Accounts', schema);
