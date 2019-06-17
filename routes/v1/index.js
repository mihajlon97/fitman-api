module.exports = function (express, passport) {
	const router = express.Router();

	// ----------- User Routes -------------
	const user = require('./userRoutes')(express.Router(), passport);
	router.use('/user', user);

	// ----------- Training Routes -------------
	const training = require('./trainingRoutes')(express.Router(), passport);
	router.use('/training', training);

	// ----------- Training Routes -------------
	const request = require('./requestRoutes')(express.Router(), passport);
	router.use('/request', request);

	return router;
};
