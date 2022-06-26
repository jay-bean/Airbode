'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dig = sequelize.define('Dig', {
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Dig.associate = function(models) {
    Dig.belongsTo(models.User, { foreignKey: 'userId' });
    Dig.hasMany(models.Review, { foreignKey: 'digId' });
    Dig.hasMany(models.Booking, { foreignKey: 'digId' });
    Dig.hasMany(models.Image, { foreignKey: 'digId' });
  };
  return Dig;
};
