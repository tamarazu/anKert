'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const destinations = [
      {
        name : 'Yogyakarta',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'Bandung',
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ] 
   return queryInterface.bulkInsert('Destinations', destinations, {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Destinations', null, {});
  }
};
