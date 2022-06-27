'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    digId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Dig, { foreignKey: 'digId' });
  };
  return Image;
};
