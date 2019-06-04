'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Follow', {
      time            : { type: DataTypes.DATE,          allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  },{
      timestamps : false
  });

  Model.associate = function(models) {
      Model.belongsTo(models.Account);
      Model.belongsTo(models.Account, { as: 'Follower' });
  };

  Model.prototype.toWeb = function () {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
