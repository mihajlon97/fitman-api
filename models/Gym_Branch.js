'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Gym_Branch', {
      id              : { type: DataTypes.INTEGER.UNSIGNED,       primaryKey: true, autoIncrement: true,},
      address         : { type: DataTypes.STRING(60),             allowNull: true },
      city            : { type: DataTypes.STRING(60),             allowNull: true },
      country         : { type: DataTypes.STRING(60),             allowNull: true },
  },{
      timestamps : false
  });

  Model.associate = function(models) {
      Model.belongsTo(models.Gym);
  };

  Model.prototype.toWeb = function () {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
