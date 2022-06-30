'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Digs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      guests: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      beds: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      baths: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pets: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Digs');
  }
};
