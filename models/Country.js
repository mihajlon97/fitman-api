'use strict';
module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('Countries', {
        id        : { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true,},
        name      : { type: DataTypes.STRING(60),   allowNull: true },
        shortcut  : { type: DataTypes.STRING(2),    allowNull: true },
        color     : { type: DataTypes.STRING(10),   allowNull: true },
        flag      : { type: DataTypes.STRING(300),  allowNull: true },
        calling   : { type: DataTypes.STRING(10),   allowNull: true },
        region    : { type: DataTypes.STRING(25),   allowNull: true },
    },{
        timestamps : false
    });

    Model.associate = function(models){
        Model.hasMany(models.Companies);
        Model.hasMany(models.Users);
    };

    Model.prototype.toWeb = function () {
        let json = this.toJSON();
        return json;
    };

    return Model;
};
