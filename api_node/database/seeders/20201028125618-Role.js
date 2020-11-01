'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Top Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Employee',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};