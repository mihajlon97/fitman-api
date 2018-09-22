'use strict';
const { TE }          = require('../services/UtilService');

module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Companies', {
      id              : { type: DataTypes.INTEGER.UNSIGNED,       primaryKey: true, autoIncrement: true,},
      name            : { type: DataTypes.STRING(60),    allowNull: true },
      address         : { type: DataTypes.STRING(50),    allowNull: true },
      zip             : { type: DataTypes.STRING(10),    allowNull: true },
      city            : { type: DataTypes.STRING(25),    allowNull: true },
      phone           : { type: DataTypes.STRING(25),    allowNull: true },
      email           : { type: DataTypes.STRING(25),    allowNull: true },
      type            : { type: DataTypes.STRING(25),    allowNull: true },
      logo            : { type: DataTypes.STRING(500),   allowNull: true },
      bg              : { type: DataTypes.STRING(500),   allowNull: true },
      short_desc      : { type: DataTypes.STRING(300),   allowNull: true },
      long_desc       : { type: DataTypes.STRING(1000),  allowNull: true },
      links           : { type: DataTypes.JSON,          allowNull: true },
      latitude        : { type: DataTypes.FLOAT(10),     allowNull: true },
      longitude       : { type: DataTypes.FLOAT(10),     allowNull: true },
      time            : { type: DataTypes.DATE,          allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  },{
      timestamps : false
  });

  Model.associate = function(models) {
      this.Users = this.belongsToMany(models.Users, {through: models.Relationships, timestamps:false});
      Model.belongsTo(models.Languages);
      Model.belongsTo(models.Countries);
  };


  Model.prototype.toWeb = function () {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
