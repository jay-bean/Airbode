'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/E9B3D187-EDC5-478E-B788-3F353296A598.png', digId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/B765D8D7-509C-4355-B117-061DF05347A2.png', digId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/9532934E-C880-4294-93B4-F852A0DE997C.png', digId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/675D1D7D-5F51-442A-A709-E1C04A69A0EA.png', digId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2170543E-46A3-46D4-A9DD-3F6EA2A896D7.png', digId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.534Z-steamboat3.jpeg', digId: 2, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.586Z-steamboat4.jpeg', digId: 2, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.343Z-steamboat2.jpeg', digId: 2, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.595Z-steamboat5.jpeg', digId: 2, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A36%3A36.221Z-miami.jpeg', digId: 3, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T06%3A57%3A17.032Z-miami2.jpeg', digId: 3, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T06%3A57%3A17.032Z-miami3.jpeg', digId: 3, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.841Z-costarica.jpeg', digId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.899Z-costarica2.jpeg', digId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.914Z-costarica3.jpeg', digId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.919Z-costarica4.jpeg', digId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.924Z-costarica6.jpeg', digId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A37.518Z-paris3.jpeg', digId: 5, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A37.519Z-paris2.jpeg', digId: 5, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A39.112Z-paris4.jpeg', digId: 5, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A39.118Z-paris.jpeg', digId: 5, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A39.119Z-paris6.jpeg', digId: 5, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A14%3A57.293Z-newz.jpeg', digId: 6, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A14%3A57.516Z-new3.jpeg', digId: 6, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A14%3A57.532Z-newz2.jpeg', digId: 6, createdAt: new Date(), updatedAt: new Date() },

      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/E9B3D187-EDC5-478E-B788-3F353296A598.png', digId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/B765D8D7-509C-4355-B117-061DF05347A2.png', digId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/9532934E-C880-4294-93B4-F852A0DE997C.png', digId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/675D1D7D-5F51-442A-A709-E1C04A69A0EA.png', digId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2170543E-46A3-46D4-A9DD-3F6EA2A896D7.png', digId: 7, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.534Z-steamboat3.jpeg', digId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.586Z-steamboat4.jpeg', digId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.343Z-steamboat2.jpeg', digId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-08-11T17%3A14%3A11.595Z-steamboat5.jpeg', digId: 8, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A36%3A36.221Z-miami.jpeg', digId: 9, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T06%3A57%3A17.032Z-miami2.jpeg', digId: 9, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T06%3A57%3A17.032Z-miami3.jpeg', digId: 9, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.841Z-costarica.jpeg', digId: 10, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.899Z-costarica2.jpeg', digId: 10, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.914Z-costarica3.jpeg', digId: 10, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.919Z-costarica4.jpeg', digId: 10, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A27%3A05.924Z-costarica6.jpeg', digId: 10, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A37.518Z-paris3.jpeg', digId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A37.519Z-paris2.jpeg', digId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A39.112Z-paris4.jpeg', digId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A39.118Z-paris.jpeg', digId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A21%3A39.119Z-paris6.jpeg', digId: 11, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A14%3A57.293Z-newz.jpeg', digId: 12, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A14%3A57.516Z-new3.jpeg', digId: 12, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://airbodes-bucket.s3.us-west-1.amazonaws.com/2022-07-05T05%3A14%3A57.532Z-newz2.jpeg', digId: 12, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
