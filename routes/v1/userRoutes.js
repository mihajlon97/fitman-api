const LoginController 	    = require('../../controllers/login.controller');
const UserController 	    = require('../../controllers/user.controller');


module.exports = function (router, passport) {
    const authUser       = require('../../middleware/authUser')(passport);
    const {check}  = require('../../middleware/custom');

    router.post('/login',                                                     LoginController.login);

    // TODO: Registration - register function
    // router.post('/register',    authUser,    check(['admin', 'trainer']),    UserController.register);  // C
    router.get('/me',    authUser,    check(['admin', 'trainer', 'manager']),    UserController.get);      // R
    router.put('/',      authUser,    check(['admin', 'trainer', 'manager']),    UserController.update);   // U
    router.delete('/',   authUser,    check(['admin', 'trainer', 'manager']),    UserController.remove);   // D

    // TODO: Reset password function
    // router.put('/reset',         authUser,                                 UserController.changePassword);

    return router;
};
