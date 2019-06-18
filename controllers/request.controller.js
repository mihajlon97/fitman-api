const { Request, Gym, Gym_Branch, Account, Training }
																						   = require('../models');
const { ReE, ReS, to, asyncForEach }         = require('../services/UtilService');
const { Gyms }                               = require('../mongo/Gym');
const { Accounts }                           = require('../mongo/Account');
const { Trainings }                          = require('../mongo/Training');

const getAll = async function(req, res){
    let [err,requests] = await to(Request.findAll());
    if (err) return ReE(res, err);
    return ReS(res, {requests});
};
module.exports.getAll = getAll;


const migrate = async function(req, res){
  // Format Gym
	// Fetch gym branch and change _id accordingly
	let [err, gyms] = await to(Gym.findAll({raw: true}));
	if (err) return ReE(res, err);

	await asyncForEach(gyms, async function (gym) {
		let [err1, result] = await to(Gym_Branch.findAll({ raw: true, where: { GymId: gym.id } }));
		if (err1) return ReE(res, err);

		result.map(gb => gb.gym = gym.id);
		gym._id = gym.id;
		gym.branches = result;
	});


	// Format Accounts
	let [errAccount, accounts] = await to(Account.findAll({raw: true, include:[Gym_Branch]}));
	if (errAccount) return ReE(res, errAccount);
	await asyncForEach(accounts, async function (account) {
		account.GymBranch = {
			address:  account['Gym_Branch.address'],
			city:     account['Gym_Branch.city'],
			country:  account['Gym_Branch.country'],
			gym:      account['Gym_Branch.GymId'],
			_id:      account['Gym_Branch.id'],
		};
		account._id = account.id;
		account.following = [];
		account.followers = [];
	});

	// Format Accounts
	let [errTraining, trainings] = await to(Training.findAll({
		raw: true,
		include: [
			{ model: Gym_Branch },
			{ model: Account, as: 'trainer', association: 'Trainer' },
			{ model: Account, as: 'manager', association: 'Manager' }
		]
	}));
	if(errTraining) return ReE(res, errTraining);
	console.log(trainings);
	await asyncForEach(trainings, async function (training) {
		training.place = {
			_id:      training['Gym_Branch.id'],
			address:  training['Gym_Branch.address'],
			city:     training['Gym_Branch.city'],
			country:  training['Gym_Branch.country'],
			gym:      training['Gym_Branch.GymId'],
		};

		console.log('Place', training.place);
		training._id = training.id;
		training.end = training.end;
		if (training.ManagerId)
			training.manager = {
				_id:        training.ManagerId,
				name:       training['Manager.name'],
				gender:     training['Manager.gender'] || 'unknown',
				role:       training['Manager.role'] || 'manager',
				password:   training['Manager.password'],
				username:   training['Manager.username'],
				photo_url:  training['Manager.photo_url'],
				hash:       training['Manager.hash'],
				is_verified:training['Manager.is_verified'],
				desc:       training['Manager.desc'],
				permissions:training['Manager.permissions'],
				rate:       training['Manager.rate'],
				interest:   training['Manager.interest'],
				favorite:   training['Manager.favorite'],
				time:       training['Manager.time'],
			};

		if(training.TrainerId)
			training.trainer = {
				_id:        training.TrainerId,
				name:       training['Trainer.name'],
				gender:     training['Trainer.gender'] || 'unknown',
				role:       training['Trainer.role']   || 'trainer',
				password:   training['Trainer.password'],
				username:   training['Trainer.username'],
				photo_url:  training['Trainer.photo_url'],
				hash:       training['Trainer.hash'],
				is_verified:training['Trainer.is_verified'],
				desc:       training['Trainer.desc'],
				permissions:training['Trainer.permissions'],
				rate:       training['Trainer.rate'],
				interest:   training['Trainer.interest'],
				favorite:   training['Trainer.favorite'],
				time:       training['Trainer.time'],
			};
	});

	// console.log(gyms);

	// Insert Gyms
	let [errGym, gymsMongo] = await to(Gyms.insertMany(gyms));
	if (errGym) return ReE(res, errGym);

	// Insert Accounts
	let [errAccounts, accountsMongo] = await to(Accounts.insertMany(accounts));
	if (errAccounts) return ReE(res, errAccounts);

	// Insert Trainings
	let [errMongo, trainingsMongo] = await to(Trainings.insertMany(trainings));
	if (errMongo) return ReE(res, errMongo);

	return ReS(res, {message: "Successfully migrated data", gymsMongo, gyms, accountsMongo, accounts, trainings, trainingsMongo});
};
module.exports.migrate = migrate;
