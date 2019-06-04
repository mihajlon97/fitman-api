'use strict';
module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('Post', {
      id              : { type: DataTypes.INTEGER.UNSIGNED,       primaryKey: true, autoIncrement: true,},
      title           : { type: DataTypes.STRING(560),    allowNull: true },
      text            : { type: DataTypes.STRING(560),    allowNull: true },
      media_url       : { type: DataTypes.STRING(560),    allowNull: true },
      type            : { type: DataTypes.STRING(60),     allowNull: true },
      field           : { type: DataTypes.STRING(60),     allowNull: true },
      time            : { type: DataTypes.DATE,           allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
  },{
      timestamps : false
  });

  Model.associate = function(models) {
	    Model.belongsTo(models.Account);
  };

  Model.prototype.toWeb = function () {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
