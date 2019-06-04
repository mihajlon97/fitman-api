'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Request', {
      id              : { type: DataTypes.INTEGER.UNSIGNED,       primaryKey: true, autoIncrement: true,},
      message         : { type: DataTypes.STRING(360),    allowNull: true },
      is_accepted     : { type: DataTypes.BOOLEAN,       allowNull: true },
      time            : { type: DataTypes.DATE,          allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  },{
      timestamps : false
  });

  Model.associate = function(models) {
      Model.belongsTo(models.Account, { as: 'Trainer' });
      Model.belongsTo(models.Account, { as: 'Manager' });
      Model.belongsTo(models.Training);
  };

  Model.prototype.toWeb = function () {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
