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
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    baths: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pets: {
      type: DataTypes.BOOLEAN,
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
    Dig.hasMany(models.Image, { as: 'images', foreignKey: 'digId' });
  };
  return Dig;
};
