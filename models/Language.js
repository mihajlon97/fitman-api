'use strict';
module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Languages', {
        id        : { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true,},
        name      : { type: DataTypes.STRING(60),   allowNull: true },
        flag      : { type: DataTypes.STRING(300),  allowNull: true },
        shortcut  : { type: DataTypes.STRING(2),    allowNull: true },
    },{
        timestamps : false
    });

    Model.associate = function(models){
        Model.hasOne(models.Companies);
        Model.hasMany(models.Users);
    };

    Model.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
