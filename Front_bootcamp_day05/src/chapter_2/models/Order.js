'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
      this.belongsToMany(models.MenuItem, {
        through: 'OrderMenuItem',
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      items: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
