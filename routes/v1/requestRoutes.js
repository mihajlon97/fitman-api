const RequestController 	          = require('../../controllers/request.controller');

module.exports = function (router, passport) {
	const auth                 = require('../../middleware/authUser')(passport);
	const { check }            = require('../../middleware/custom');

	router.get('/',                  auth,    /*check(['manager']),*/                 RequestController.getAll);
	router.post('/migrate',           auth,    /*check(['manager','trainer']),*/      RequestController.migrate);

	return router;
};
