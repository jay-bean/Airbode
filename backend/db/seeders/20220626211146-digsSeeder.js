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
      { address:'555 West Road',city:'Tuscon',state:'Arizona', country:'United States', title:'West World', price: 200, description: 'Welcome to West World in Arizona! Bringing you the futuristic and rustic elements of you favorite tv show. We hope you enjoy your stay. ', guests: 6, bedrooms: 5, beds: 7, baths: 3, pets: false, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { address:'222 Arvada Drive',city:'Steamboat Springs',state:'Colorado', country:'United States', title:'Mountain Retreat', price: 230, description: 'Anytime of the year is the best time of the year to visit Steamboat Springs! Enjoy this', guests: 3, bedrooms: 2, beds: 2, baths: 2, pets: false, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'1456 Airondale Way',city:'Miami',state:'Florida', country:'United States', title:`1950's Themed`, price: 400, description: `Take Miami back to the 50's with this gorgeous home! 2 miles from the beach and 5 minutes from downtown Miami.`, guests: 4, bedrooms: 3, beds: 3, baths: 2, pets: true, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'234 Hundimiento',city:'Limon',state:'Limon', country:'Costa Rica', title:'Paradise Place', price: 300, description: 'Enjoy your stay at Paradise Place! Minutes from the beach with access to our boat. Take a tour of our local jungles, or venture inland to visit one of the many Volcanoes here in Costa Rica. Six bedroom home with terrace and salt water pool located in the back surround by beautiful local trees and flowers. This is a must stay while in Costa Rica! ', guests: 6, bedrooms: 5, beds: 7, baths: 3, pets: false, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'3423 Rue Petit',city:'Paris',state:'Île-de-France region', country:'France', title:'Villa Hedone', price: 1100, description: 'This home is right in the heart of Paris. The atmosphere! The food! The home boasts vaulted ceilings with marble floors. A bulter and chef will be included with your stay.', guests: 4, bedrooms: 3, beds: 3, baths: 3, pets: true, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { address:'52 Melbourne Street',city:'Queenstown',state:'South Island', country:'New Zealand', title:'NZ Getaway', price: 230, description: 'Come visit New Zealand in style! This tiny home is just under 600 sqft. with tons of character. The home features a full kitchen and a deck around the back with chairs/hammocks and a grill!', guests: 2, bedrooms: 1, beds: 1, baths: 1, pets: true, userId: 2, createdAt: new Date(), updatedAt: new Date() },
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
