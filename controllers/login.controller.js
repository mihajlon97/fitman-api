const { Account }               = require('../models');
const {ReE, ReS, to}            = require('../services/UtilService');
const validator                 = require('validator');

const login = async function(req, res){
    let err, user, body = req.body, where;
    if(typeof body.username !== 'undefined') {
        where = {username: req.body.username};
    }else if(typeof body.email !== 'undefined' && validator.isEmail(body.email)){
        where = {username: req.body.email};
    }else {
        return ReE(res, 'Please enter an username, email or phone number to login.');
    }

    if(!body.password) return ReE('Please enter a password to login');

    [err, user] = await to(Account.findOne({where: where}));
    if(err) {
    	console.log(err);
    	return ReE(res, 'Find user error');
    }
    else if(!user) return ReE(res, 'User not registered');

    [err] = await to(user.comparePassword(body.password));
    if(err) return ReE(res, err.message);

    // Hide some data
    user.password = null;

    return ReS(res, {
        token:         user.getJWT(),
        data:          user.toWeb()
    });
};
module.exports.login = login;
