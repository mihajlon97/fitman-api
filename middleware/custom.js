const { ReE } = require('../services/UtilService');

// Check req.role if in roles parameters
// If not -> Access denied
function checkPermission(roles) {
    return function(req, res, next) {
        if (!roles.includes(req.role))
            return ReE(res, 'Access denied');
        else next();
    }
}
module.exports.check = checkPermission;
