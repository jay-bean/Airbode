'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    startDate: {
      tyep: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      tyep: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    digId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Dig, { foreignKey: 'digId' });
  };
  return Booking;
};
