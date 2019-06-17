const { Request, Gym }           = require('../models');
const { ReE, ReS, to }           = require('../services/UtilService');

const { Gyms } = require('../mongo/Gym');

const getAll = async function(req, res){
    let [err,requests] = await to(Request.findAll());
    if (err) return ReE(res, err);
    return ReS(res, {requests});
};
module.exports.getAll = getAll;


const migrate = async function(req, res){
	let [err, gyms] = await to(Gym.findAll({raw: true}));
	if (err) return ReE(res, err);
	console.log("Migrate function called!!!");

	let [errMongo, result] = await to(Gyms.insertMany(gyms));
	if (errMongo) return ReE(res, err);

	return ReS(res, {message: "Successfully migrated data", result});
};
module.exports.migrate = migrate;
