const path      =       require('path');

module.exports = function (express, passport) {
    const router = express.Router();

		// ----------- User Routes -------------
    const user = require('./userRoutes')(express.Router(), passport);
    router.use('/user', user);

    return router;
};
