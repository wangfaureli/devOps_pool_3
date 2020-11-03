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
          reason: 'dental surgery',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          start: '2020-11-09',
          end: '2020-11-27',
          reason: 'vacations',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          start: '2020-11-08',
          end: '2020-11-08',
          reason: "I'm tired...",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          start: '2020-12-24',
          end: '2020-12-26',
          reason: "Noel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          start: '2020-12-30',
          end: '2020-12-03',
          reason: "New Year, it's the fiesta !",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          start: '2020-09-25',
          end: '2020-11-24',
          reason: "Work accident",
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
