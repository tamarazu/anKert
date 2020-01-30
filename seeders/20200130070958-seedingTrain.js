'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const trains = [
      {
        name : 'Argo Dwipangga',
        DestinationId : 1,
        derparture : 'Malam',
        price : 280000,
        seats : 5,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Bengawan',
        DestinationId : 1,
        derparture : 'Pagi',
        price : 74000,
        seats : 10,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]
    return queryInterface.bulkInsert('Trains', trains, {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Trains', null, {});
  }
};
