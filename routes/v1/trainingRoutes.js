const TrainingController 	          = require('../../controllers/training.controller');

module.exports = function (router, passport) {
	const auth                 = require('../../middleware/authUser')(passport);
	const { check }            = require('../../middleware/custom');

	router.post('/',                  auth,    /*check(['manager']),*/                 TrainingController.create);
	router.get('/',                   auth,    /*check(['manager','trainer']),*/       TrainingController.getAll);
	router.get('/manager/:ManagerId', auth,    /*check(['manager']),*/                 TrainingController.getByManagerId);
	router.get('/trainer/:TrainerId', auth,    /*check(['trainer']),*/                 TrainingController.getByTrainerId);
	router.put('/:TrainingId',        auth,    /*check(['manager']),*/                 TrainingController.update);
	router.delete('/:TrainingId',     auth,    /*check(['manager']),*/                 TrainingController.remove);

	return router;
};
