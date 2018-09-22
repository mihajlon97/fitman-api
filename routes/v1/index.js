const path      =       require('path');

module.exports = function (express, passport) {
    const router = express.Router();

// ----------- Default route with Pending status  -----------
    router.get('/', function (req, res, next) {
        res.json({status: "success", message: "Pending API", data: {"version_number": "v1.0.0"}})
    });

// ----------- User Routes -------------
    const user = require('./userRoutes')(express.Router(), passport);
    router.use('/user', user);

// ----------- API DOCUMENTATION -----------
    router.use('/docs/api.json', express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
    router.use('/docs', express.static(path.join(__dirname, '/../public/v1/documentation/dist')));

    return router;
};
