const { Training }             = require('../models')
const { ReE, ReS, to }         = require('../services/UtilService');

/**
 *  Create Training
 */
const create = async function(req, res){
	let [err, ap] = await to(Training.create(req.body));
	if(err) return ReE(res, err);
	return ReS(res, { ap });
};
module.exports.create = create;

/**
 *  Update Training using url parameter TrainingId
 */
const update = async function(req, res){
	let [err, ap] = await to(Training.update(req.body, { where:{ id: req.params.TrainingId }}));
	if(err) return ReE(res, err);
	return ReS(res, {message :'Updated Training: ' + req.params.ApId});
};
module.exports.update = update;

/**
 *  Remove Ap using url parameter ApId
 */
const remove = async function(req, res){
	let [err] = await to(Training.destroy({ where:{ id: req.params.TrainingId }}));
	if(err) return ReE(res, 'Error occurred trying to delete Training');
	return ReS(res, {message:'Deleted Training'});
};
module.exports.remove = remove;

/**
 *  Get all Trainings from GymBranchId
 */
const getAll = async function(req, res){
	let where = (req.query.GymBranchId !== undefined) ? { where: { GymBranchId: req.query.GymBranchId } } : {};
	let [err, trainings] = await to(Training.findAll({ where: where, raw: true }));
	if(err) return ReE(res, err);
	return ReS(res, {trainings});
};
module.exports.getAll = getAll;

/**
 *  Get all Trainings from manager
 */
const getByManagerId = async function(req, res){
	let [err, trainings] = await to(Training.findAll({ where: { ManagerId: req.params.ManagerId }, raw: true}));
	if(err) return ReE(res, err);
	return ReS(res, {trainings});
};
module.exports.getByManagerId = getByManagerId;

/**
 *  Get all Trainings from trainer
 */
const getByTrainerId = async function(req, res){
	let [err, trainings] = await to(Training.findAll({ where: { TrainerId: req.params.TrainerId }, raw: true}));
	if(err) return ReE(res, err);
	return ReS(res, {trainings});
};
module.exports.getByTrainerId = getByTrainerId;
