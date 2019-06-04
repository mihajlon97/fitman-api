'use strict';
const bcrypt         = require('bcryptjs');
const jwt            = require('jsonwebtoken');
const CONFIG         = require('../config/config');
const {TE, to}       = require('../services/UtilService');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Account', {
        id            : { type: DataTypes.INTEGER.UNSIGNED,      primaryKey: true, autoIncrement: true,},
        name          : { type: DataTypes.STRING(25),   allowNull: false },
        gender        : { type: DataTypes.ENUM('male', 'female', 'unknown'),    allowNull: false,  defaultValue: 'unknown' },
	      role          : { type: DataTypes.ENUM('user', 'trainer', 'manager'),   allowNull: true,   defaultValue: 'user' },
        username      : { type: DataTypes.STRING(25),   allowNull: false, unique: true },
        password      : { type: DataTypes.STRING(255),  allowNull: false },
        photo_url     : { type: DataTypes.STRING(300),  allowNull: true, defaultValue: 'https://cdn.werbifi.com/werbifi/user.png' },
        hash          : { type: DataTypes.STRING(25),   allowNull: true },
        is_verified   : { type: DataTypes.BOOLEAN,      allowNull: true, defaultValue: false },
        time          : { type: DataTypes.DATE,         allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
    },{
        timestamps : false
    });

    Model.associate = function(models){};

    Model.beforeSave(async (account, options) => {
        let err;
        if (account.changed('password')){
            let salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(account.password, salt));
            if(err) TE(err.message, true);
            account.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass;
        if(!this.password) TE('Password not set!');

        [err, pass] = await to(bcrypt.compare(pw, this.password));
        if(err) {
        	console.log(err);
        	TE(err);
        }

        if(!pass) TE('Invalid password!');

        return this;
    };

		Model.prototype.getJWT = function (expiresIn = parseInt(CONFIG.account_jwt_expiration)) {
			return jwt.sign({ accountId:this.id }, CONFIG.jwt_encryption, {expiresIn});
		};

    Model.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };

    Model.prototype.getByEmail = async function (email) {
        return sequelize.findOne({
            include: [{model: models.Users, where: {email:email}}]
        });
    };

    Model.prototype.getByUsername = async function (username) {
        return sequelize.findOne({
            where: { username: username }
        });
    };

    Model.moreThanOneAccountWithUserId = async function (userId) {
        return sequelize.query(`SELECT count(*) as number_of_users FROM Accounts AS Accounts WHERE :userId IS NOT NULL AND Accounts.UserId = :userId`, { model: this,replacements: {userId:userId}, type: sequelize.QueryTypes.SELECT})
            .then(result => {
                return parseInt(result[0].dataValues.number_of_users) >= 1;
            })
            .catch(err => {
                console.log(err);
                TE(err)
            })
    };

    return Model;
};
