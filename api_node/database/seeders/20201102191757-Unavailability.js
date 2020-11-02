'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Unavailabilities',
      [
        {
          userId: 1,
          start: '2020-11-11',
          end: '2020-11-14',
          reason: 'vacations',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Unavailabilities', null, {});
  }
};
