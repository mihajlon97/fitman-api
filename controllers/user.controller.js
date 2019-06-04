const { Users }             = require('../models');
const { ReE, ReS, to }      = require('../services/UtilService');
const bcrypt                = require('bcryptjs');

const get = async function(req, res){
    let user = req.user;
    // Hide some data
    user.password = null;
    user.verify = null;
    return ReS(res, {user:user.toWeb()});
};
module.exports.get = get;


const update = async function(req, res){
    let err, user, data;
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if(err){
        if(err.message === 'Validation error') err = 'The email address or phone number is already in use';
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated User: ' + user.username});
};
module.exports.update = update;


const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE(res, 'Error occurred trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
};
module.exports.remove = remove;


const changePassword = async function(req, res){
    let user = req.user;
    let salt, hash;
    [err, salt] = await to(bcrypt.genSalt(10));
    if(err) return ReE(res, err);
    [err, hash] = await to(bcrypt.hash(req.body.password, salt));
    if(err) return ReE(res, err);

    [err, account] = await to(Users.update({password: hash}, {where: {id: user.id}}));
    if(err) return ReE(res, err);

    return ReS(res, {message:'Password successfully changed!'}, 200);
};
module.exports.changePassword = changePassword;
