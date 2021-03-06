const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { Account }  = require('../models');
const { ReE, to }  = require('../services/UtilService');
const CONFIG       = require('../config/config');
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = CONFIG.jwt_encryption;

module.exports = function (passport) {

    passport.use('user', new JwtStrategy(opts, async function(jwt_payload, done){
        let err, user;
        [err, user] = await to(Account.findById(jwt_payload.id));
        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));


    return function (req, res, next) {
        // Do not require authentication for login and register routes
        if(req.url !== "/login" && req.url !== "/register"){
            passport.authenticate('user', (err, user) => {
                if (err) {
                	console.log(err);
                	return ReE(res, 'ACCESS_DENIED');
                }
                else {
                    req.companyId = user.companyId;
                    req.user = user;
                    if(user) req.role = user.role;
                    next();
                }
            })(req, res, next)
        } else {
            next()
        }
    }
};
