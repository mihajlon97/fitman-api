'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Gym', {
      id              : { type: DataTypes.INTEGER.UNSIGNED,       primaryKey: true, autoIncrement: true,},
      name            : { type: DataTypes.STRING(60),    allowNull: true },
      phone           : { type: DataTypes.STRING(25),    allowNull: true },
      email           : { type: DataTypes.STRING(55),    allowNull: true },
      logo            : { type: DataTypes.STRING(500),   allowNull: true },
      desc            : { type: DataTypes.STRING(300),   allowNull: true },
      time            : { type: DataTypes.DATE,          allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  },{
      timestamps : false
  });

  Model.associate = function(models) {
      Model.hasMany(models.Gym_Branch);
  };

  Model.prototype.toWeb = function () {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
