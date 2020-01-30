'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const admin = [
    {
      first_name : "Jhon",
      last_name : 'Doe',
      username : "JD123",
      password : 'JD321',
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ]
  return queryInterface.bulkInsert('Admins', admin, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Admins', null, {});
  }
};
