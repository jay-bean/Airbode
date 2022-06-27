'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Digs', [
      { address:'555 West Road',city:'Tuscon',state:'Arizona', country:'United States', name:'West World', price: 134, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { address:'222 Arvada Drive',city:'Steamboat Springs',state:'Colorado', country:'United States', name:'Mountain Retreat', price: 200, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'1456 Airondale Way',city:'Miami',state:'Florida', country:'United States', name:`1950's Themed`, price: 320, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'234 Hundimiento',city:'Limon',state:'Limon', country:'Costa Rica', name:'Paradise Place', price: 175, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'3423 Rue Petit',city:'Paris',state:'Île-de-France region', country:'France', name:'Villa Hedone', price: 215, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'52 Melbourne Street',city:'Queenstown',state:'South Island', country:'New Zealand', name:'NZ Getaway', price: 140, userId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Digs', null, {});
  }
};
