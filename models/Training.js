'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Training', {
      id              : { type: DataTypes.INTEGER.UNSIGNED,       primaryKey: true, autoIncrement: true,},
      title           : { type: DataTypes.STRING(260),            allowNull: true, defaultValue: 'Training' },
      type            : { type: DataTypes.STRING(60),             allowNull: true },
      className       : { type: DataTypes.STRING(60),             allowNull: true, defaultValue: 'event-green' },
      is_free         : { type: DataTypes.BOOLEAN,                allowNull: true },
      start           : { type: DataTypes.STRING(60),             allowNull: true },
      end             : { type: DataTypes.STRING(60),             allowNull: true }
  },{
      timestamps : false
  });

  Model.associate = function(models) {
      Model.belongsTo(models.Gym_Branch);
	    Model.belongsTo(models.Account, { as: 'Trainer' });
	    Model.belongsTo(models.Account, { as: 'Manager' });
      Model.hasMany(models.Request);
  };

  Model.prototype.toWeb = function () {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
