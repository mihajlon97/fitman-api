'use strict';
const bcrypt         = require('bcrypt');
const bcrypt_p       = require('bcrypt-promise');
const jwt            = require('jsonwebtoken');
const CONFIG         = require('../config/config');
const {TE, to}       = require('../services/UtilService');

module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Users', {
        id        : { type: DataTypes.INTEGER.UNSIGNED,  primaryKey: true, autoIncrement: true,},
        name      : { type: DataTypes.STRING,       allowNull: true },
        email     : { type: DataTypes.STRING,       allowNull: true,  unique: true },
        phone     : { type: DataTypes.STRING,       allowNull: true,  unique: true },
        gender    : { type: DataTypes.CHAR,         allowNull: true,  defaultValue: 'U' },
        birthday  : { type: DataTypes.DATEONLY,     allowNull: true},
        username  : { type: DataTypes.STRING(25),   allowNull: false, unique: true },
        password  : { type: DataTypes.STRING(255),  allowNull: false },
        role      : { type: DataTypes.STRING(25),   allowNull: true },
        photo     : { type: DataTypes.STRING(300),  allowNull: true },
        reset     : { type: DataTypes.STRING(25),   allowNull: true },
        verify    : { type: DataTypes.JSON,         allowNull: true },
        social    : { type: DataTypes.JSON,         allowNull: true }
    },{
        timestamps : false
    });

    Model.associate = function(models){
        this.Companies = this.belongsToMany(models.Companies, {through: models.Relationships, timestamps:false});
        Model.belongsTo(models.Languages);
        Model.belongsTo(models.Countries);
    };

    Model.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);
            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass;
        if(!this.password) TE('Password not set!');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('Invalid password!');

        return this;
    };

    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return jwt.sign({userId:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    Model.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
