'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Teams',
      [
        {
          name: 'Aze',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rity',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Utopy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Zolannia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sijal',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  },
};
