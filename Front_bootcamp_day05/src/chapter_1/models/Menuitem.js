'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    static associate(models) {
      this.belongsToMany(models.Order, {
        through: 'OrderMenuItem',
      });
    }
  }
  MenuItem.init(
    {
      title: DataTypes.STRING,
      picture: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      callQuantity: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MenuItem',
    }
  );
  return MenuItem;
};

