'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Administrator',
          level: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Top Manager',
          level: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Manager',
          level: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Employee',
          level: 3,
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
